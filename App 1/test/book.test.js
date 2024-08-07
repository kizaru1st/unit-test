import supertest from 'supertest';
import express from 'express';
import { publicApi } from '../src/routes/public-api.js'; 
import { prismaClient } from '../src/application/database.js'; 

const app = express();
app.use(express.json());
app.use(publicApi);

const mockBooks = [
    {
        code: "JK-45",
        title: "Harry Potter",
        author: "J.K Rowling",
        stock: 1
    },
    {
        code: "SHR-1",
        title: "A Study in Scarlet",
        author: "Arthur Conan Doyle",
        stock: 1
    },
    {
        code: "TW-11",
        title: "Twilight",
        author: "Stephenie Meyer",
        stock: 1
    },
    {
        code: "HOB-83",
        title: "The Hobbit, or There and Back Again",
        author: "J.R.R. Tolkien",
        stock: 1
    },
    {
        code: "NRN-7",
        title: "The Lion, the Witch and the Wardrobe",
        author: "C.S. Lewis",
        stock: 1
    },
]

jest.mock('../src/application/database.js', () => ({
    prismaClient: {
        book: {
            findMany: jest.fn()
        }
    }
}));

describe('GET /api/books', function () {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return all books that are ready to borrow', async () => {
        prismaClient.book.findMany.mockResolvedValue(mockBooks);

        const result = await supertest(app)
            .get('/api/books');

        expect(result.status).toBe(200);
        expect(result.body.success).toBe(true);
        expect(result.body.data).toEqual(mockBooks);
    });

    it('should handle errors', async () => {
        prismaClient.book.findMany.mockRejectedValue(new Error('Database error'));

        const result = await supertest(app)
            .get('/api/books');

        expect(result.status).toBe(500);
    });
});
