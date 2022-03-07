import db from "../database.js";

export const getCategories = async (req, res) => {
    try {
        const { rows } = await db.query("SELECT * FROM categories;");

        res.send(rows).status(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export const insertCategorie = async (req, res) => {
    const { body } = req;
    try {
        const result = await db.query("SELECT * FROM categories WHERE name=$1", [body.name]);

        if (result.rows.length > 0) return res.sendStatus(409);

        await db.query(`
            INSERT INTO categories (name)
            VALUES ($1)
        `, [body.name]);

        return res.sendStatus(201);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}