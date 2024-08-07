import { ErrorResponse } from "../error/response-error.js";

const errorMiddleware = async (error, req, res, next) => {
    if (!error) return next();
    if (error instanceof ErrorResponse) {
        return res.status(error.statusCode).json({ success: false, error: error.message });
    }
    return res.status(500).json({ success: false, error: error.message });
}

export {
    errorMiddleware
}