import { prismaClient } from "../application/database.js";

const getAllBookReady = async () => {
    return await prismaClient.book.findMany({
        where: {
            borrow: {
                none: {}
            }
        }
    })
}

export default {
    getAllBookReady
}