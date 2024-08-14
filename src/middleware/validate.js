import { appError } from "../utils/appError.js"


export const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate({ ...req.body, ...req.params, ...req.query }, { abortEarly: false });
        if (!error) {
            next();
        } else {
            console.log(req.body)
            const errMsgs = error.details.map(detail => detail.message);
            return next(new appError(errMsgs, 401));
        }
    };
}
