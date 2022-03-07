import db from "../database.js";

export const getGames = async (req, res) => {
    const { name } = req.query;
    try {
        if (typeof (name) === 'string') {
            const result = await db.query(`
                SELECT games.*, categories.name AS "categoryName"
                FROM games 
                JOIN categories ON games."categoryId"=categories.id 
                WHERE LOWER(games.name) 
                LIKE LOWER($1);
            `, [`${name}%`]);

            return res.send(result.rows).status(200);
        }

        const result = await db.query(`
            SELECT games.*, categories.name AS "categoryName"
            FROM games 
            JOIN categories ON games."categoryId"=categories.id;
        `);

        return res.send(result.rows);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export const insertGame = async (req, res) => {
    const game = req.body;

    try {
        const checkCategoryExistence = await db.query(`
            SELECT id FROM categories WHERE categories.id=$1;
        `, [game.categoryId]);

        if (checkCategoryExistence.rows.length === 0) return res.sendStatus(400);

        const checkGameExistence = await db.query(`
            SELECT id FROM games WHERE games.name=$1;
        `, [game.name])

        if (checkGameExistence.rows.length > 0) return res.sendStatus(409)

        await db.query(`
            INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay")
            VALUES ($1, $2, $3, $4, $5);
        `, [game.name, game.image, game.stockTotal, game.categoryId, game.pricePerDay]
        );

        res.sendStatus(201);
        
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}