// routes/public-api.js
import express from "express";
import { borrowBook, getAllMembers, returnBook } from "../controllers/member-controller.js";
import { getAllBookReady } from "../controllers/book-controller.js";

const publicApi = express.Router();
publicApi.post("/api/borrow", borrowBook);
publicApi.get("/api/members", getAllMembers);
publicApi.post("/api/return", returnBook);
publicApi.get("/api/books", getAllBookReady);

export { publicApi }