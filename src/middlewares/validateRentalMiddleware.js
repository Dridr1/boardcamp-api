import db from "../database.js";
import rentalSchema from "../schemas/rentalSchema.js";

export const validateRentalMiddleware = async (req, res, next) => {
    const validation = rentalSchema.validate(req.body);
    const { customerId, gameId, daysRented } = req.body;

    if (validation.error) return res.sendStatus(422);
    if (parseInt(daysRented) <= 0) return res.sendStatus(400);

    try {
        const game = await db.query(`
            SELECT games."stockTotal" FROM games WHERE id=$1
        `, [gameId]);
        
        if (game.rowCount === 0 || customer.rowCount === 0) return res.sendStatus(400);

        const customer = await db.query(`
        SELECT * FROM customers WHERE id=$1
        `, [customerId]);


        const isAvailable = await db.query(`
            SELECT * FROM rentals WHERE "gameId"=$1 AND "returnDate" is null
        `, [gameId]);

        const stockTotal = game.rows[0].stockTotal;

        if (stockTotal - isAvailable.rowCount === 0) return res.sendStatus(400);
        

        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export const validateRentalIdMiddleware = async (req, res, next) => {
    const { id } = req.params;

    try {
        const exist = await db.query(`
        SELECT * FROM rentals 
        WHERE id=$1
    `, [id]);

        if (exist.rows.length === 0) res.sendStatus(404);

        if (exist.rows[0].returnDate !== null) res.sendStatus(400);

        next();

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}