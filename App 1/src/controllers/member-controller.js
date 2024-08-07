import memberService from "../services/member-service.js";

const borrowBook = async (req, res, next) => {
    const { memberId, bookId } = req.body;
    try {
        const result = await memberService.borrowBook(bookId, memberId);
        return res.status(200).json({ success: true, message: "Success borrow book" });
    } catch (error) {
        next(error);
    }
}

const getAllMembers = async (req, res, next) => {
    try {
        const result = await memberService.getAllMembers();
        return res.status(200).json({ success: true, data: result });
    } catch (error) {
        next(error);
    }
}

const returnBook = async (req, res, next) => {
    const { memberId, bookId } = req.body;
    try {
        const result = await memberService.returnBook(bookId, memberId);
        if(result) {
            return res.status(200).json({ success: true, message: "Success return book" });
        }
    } catch (error) {
        next(error);
    }
}

export {
    borrowBook, getAllMembers, returnBook
}