import { stripHtml } from "string-strip-html";

export const validateNewCustumerMiddleware = (schema) => {
    return (req, res, next) => {
        const {name, phone, cpf, birthday} = req.body;

        const customer = {
            name: stripHtml(name).result.trim(),
            phone: stripHtml(phone).result.trim(),
            cpf: stripHtml(cpf).result.trim(),
            birthday: stripHtml(birthday).result.trim()
        }
        const validation = schema.validate(customer);

        if (validation.error) return res.sendStatus(400);
        
        next();
    }
} 
