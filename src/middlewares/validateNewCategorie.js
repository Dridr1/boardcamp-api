export const validateNewCategorie = (schema) => {
    return (req, res, next) => {
        const validation = schema.validate(req.body);
        if(validation.error) {
            return res.sendStatus(409);
        }
        next();
    }
}