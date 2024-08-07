import { prismaClient } from "../application/database.js";
import { borrowBookSchema } from "../validations/member-validation.js";
import { ErrorResponse } from "../error/response-error.js";
import { addDays, differenceInDays } from 'date-fns';

const borrowBook = async (bookId, memberId) => {
    try {
        await borrowBookSchema.validateAsync({ bookId, memberId });
    } catch (error) {
        throw new ErrorResponse(error.message, 404);
    }
    const member = await prismaClient.member.findUnique({
        where: {
            code: memberId
        }
    });
    const book = await prismaClient.book.findUnique({
        where: {
            code: bookId
        }
    });

    if (!member || !book) {
        throw new ErrorResponse("Member or book not found", 404);
    }

    if (member.penaltyEndDate && member.penaltyEndDate > new Date()) {
        throw new ErrorResponse("Member is currently penalized and cannot borrow books", 403);
    }

    const borrow = await prismaClient.borrow.findMany({
        where: {
            memberCode: memberId,
            bookCode: bookId
        }
    });

    if (borrow.length > 0) {
        throw new ErrorResponse("Member has already borrowed this book", 404);
    }

    const stock = book.stock - 1;
    if (stock < 0) {
        throw new ErrorResponse("Book out of stock", 404);
    }

    await prismaClient.book.update({
        where: {
            code: bookId
        },
        data: {
            stock
        }
    });

    await prismaClient.borrow.create({
        data: {
            memberCode: memberId,
            bookCode: bookId
        }
    });
}

const getAllMembers = async () => {
    return await prismaClient.member.findMany({
        include: {
            _count: {
                select: {
                    borrow: true
                }
            }
        }
    })
}

const returnBook = async (bookId, memberId) => {
    const borrow = await prismaClient.borrow.findMany({
        where: {
            memberCode: memberId,
            bookCode: bookId
        }
    });
    if (borrow.length === 0) {
        throw new ErrorResponse("Member has not borrowed this book", 404);
    }

    const currentDate = new Date();
    const borrowDate = borrow.createdAt;
    const daysBorrowed = differenceInDays(currentDate, borrowDate);

    let penalty = false;
    if (daysBorrowed > 7) {
        penalty = true;
        const penaltyEndDate = addDays(currentDate, 3);

        await prismaClient.member.update({
            where: { code: memberId },
            data: { penaltyEndDate: penaltyEndDate }
        });
    }

    await prismaClient.borrow.deleteMany({
        where: {
            memberCode: memberId,
            bookCode: bookId
        }
    });

    const book = await prismaClient.book.findUnique({
        where: {
            code: bookId
        }
    });
    const stock = book.stock + 1;
    await prismaClient.book.update({
        where: {
            code: bookId
        },
        data: {
            stock
        }
    });
    return { success: true, penalty };
}

export default {
    borrowBook, getAllMembers, returnBook
}