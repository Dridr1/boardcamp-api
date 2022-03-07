import db from "../database.js";
import dayjs from "dayjs";

export const getCustomerById = async (req, res) => {
    const id = req.params.id
    try {
        const result = await db.query("SELECT * FROM customers WHERE id=$1", [id]);

        if (result.rowCount === 0) return res.sendStatus(404);

        return res.send(result.rows).status(200);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export const getCustomers = async (req, res) => {
    try {
        if (!req.query.cpf) {
            const customers = await db.query('SELECT * FROM customers')
            for (let i = 0; i < customers.rows.length; i++) {
                customers.rows[i].birthday = dayjs(customers.rows[i].birthday).format('YYYY-MM-DD')
            }
            return res.status(200).send(customers.rows);
        }

        const customer = await db.query(`
			SELECT * 
			FROM customers 
			WHERE cpf 
			LIKE $1`, [`${req.query.cpf}%`]);

        if (customer.rowCount == 0) return res.sendStatus(404);

        customer.rows[0].birthday = dayjs(customer.rows[0].birthday).format('YYYY-MM-DD');

        return res.status(200).send(customer.rows);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export const insertCustomer = async (req, res) => {
    const { name, phone, cpf, birthday } = req.body;
    try {
        const result = await db.query('SELECT * FROM customers WHERE cpf=$1', [cpf]);
        if (result.rowCount > 0) return res.sendStatus(409);

        await db.query(`INSERT INTO customers (name, phone, cpf, birthday)
                        VALUES ($1, $2, $3, $4)`,
            [name, phone, cpf, birthday]);

        return res.sendStatus(201);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export const updateCustomer = async (req, res) => {
    try {
        const customer = await db.query('SELECT * FROM customers WHERE cpf=$1;', [req.body.cpf]);
        if (customer.rowCount > 0) return res.sendStatus(409)
        
        await db.query(`UPDATE customers
                        SET name=$1, phone=$2, cpf=$3, birthday=$4
                        WHERE id=$5`, 
                        [req.body.name, req.body.phone, req.body.cpf, req.body.birthday, req.params.id]);
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}