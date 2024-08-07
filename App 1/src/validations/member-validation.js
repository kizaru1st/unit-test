import Joi from "joi";

export const borrowBookSchema = Joi.object({
    memberId: Joi.string().required(),
    bookId: Joi.string().required()
})