import { stripHtml } from "string-strip-html";

export const validateNewGameMiddleware = (schema) => {
    return (req, res, next) => {
        const { name, image, stockTotal, categoryId, pricePerDay } = req.body;
        const game = {
            name: stripHtml(name).result.trim(),
            image: stripHtml(image).result.trim(),
            stockTotal: stockTotal,
            categoryId: categoryId,
            pricePerDay: pricePerDay
        }
        const validation = schema.validate(game);
        if (validation.error) return res.sendStatus(400);
        next();
    }
} 
