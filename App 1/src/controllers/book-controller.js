import bookService from "../services/book-service.js";

const getAllBookReady = async (req, res, next) => {
    try {
        const result = await bookService.getAllBookReady();
        return res.status(200).json({ success: true, data: result });
    } catch (error) {
        next(error);
    }
};

export {
    getAllBookReady
}