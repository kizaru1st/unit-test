import supertest from 'supertest';
import express from 'express';
import { publicApi } from '../src/routes/public-api.js'; 
import { prismaClient } from '../src/application/database.js'; 

const app = express();
app.use(express.json());
app.use(publicApi);

const mockBooks = [
    { code: "JK-45", title: "Harry Potter", author: "J.K Rowling", stock: 1 },
    { code: "SHR-1", title: "A Study in Scarlet", author: "Arthur Conan Doyle", stock: 1 },
    { code: "TW-11", title: "Twilight", author: "Stephenie Meyer", stock: 1 },
    { code: "HOB-83", title: "The Hobbit, or There and Back Again", author: "J.R.R. Tolkien", stock: 1 },
    { code: "NRN-7", title: "The Lion, the Witch and the Wardrobe", author: "C.S. Lewis", stock: 1 }
];

const mockMembers = [
    { code: "M001", name: "Angga" },
    { code: "M002", name: "Ferry" },
    { code: "M003", name: "Putri" }
];

const mockBorrow = { id: 1, memberCode: 'M001', bookCode: 'HOB-83', createdAt: new Date() };

jest.mock('../src/application/database.js', () => ({
    prismaClient: {
        member: {
            findUnique: jest.fn(),
            findMany: jest.fn(),
            update: jest.fn()
        },
        book: {
            findUnique: jest.fn(),
            update: jest.fn()
        },
        borrow: {
            findMany: jest.fn(),
            create: jest.fn(),
            deleteMany: jest.fn()
        }
    }
}));

describe('POST /api/borrow', function () {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should borrow a book', async () => {
        prismaClient.member.findUnique.mockResolvedValue(mockMembers[0]);
        prismaClient.book.findUnique.mockResolvedValue(mockBooks[3]);
        prismaClient.borrow.findMany.mockResolvedValue([]);
        prismaClient.book.update.mockResolvedValue({ ...mockBooks[3], stock: 0 });
        prismaClient.borrow.create.mockResolvedValue(mockBorrow);

        const result = await supertest(app)
            .post('/api/borrow')
            .send({
                memberId: 'M001',
                bookId: 'HOB-83'
            });

        expect(result.status).toBe(200);
        expect(result.body.success).toBe(true);
        expect(result.body.message).toBe('Success borrow book');
    });

    it('should handle borrow errors', async () => {
        prismaClient.member.findUnique.mockResolvedValue(mockMembers[0]);
        prismaClient.book.findUnique.mockResolvedValue(mockBooks[3]);
        prismaClient.borrow.findMany.mockResolvedValue([mockBorrow]);

        const result = await supertest(app)
            .post('/api/borrow')
            .send({
                memberId: 'M001',
                bookId: 'HOB-83'
            });

        expect(result.status).toBe(404);
    });
});

describe('GET /api/members', function () {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return all members', async () => {
        prismaClient.member.findMany.mockResolvedValue(mockMembers);

        const result = await supertest(app)
            .get('/api/members');

        expect(result.status).toBe(200);
        expect(result.body.success).toBe(true);
        expect(result.body.data).toEqual(mockMembers);
    });

    it('should handle errors', async () => {
        prismaClient.member.findMany.mockRejectedValue(new Error('Database error'));

        const result = await supertest(app)
            .get('/api/members');

        expect(result.status).toBe(500);
    });
});

describe('POST /api/return', function () {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return a book', async () => {
        prismaClient.borrow.findMany.mockResolvedValue([mockBorrow]);
        prismaClient.book.findUnique.mockResolvedValue(mockBooks[3]);
        prismaClient.book.update.mockResolvedValue({ ...mockBooks[3], stock: 1 });
        prismaClient.borrow.deleteMany.mockResolvedValue({ count: 1 });

        const result = await supertest(app)
            .post('/api/return')
            .send({
                memberId: 'M001',
                bookId: 'HOB-83'
            });

        expect(result.status).toBe(200);
        expect(result.body.success).toBe(true);
        expect(result.body.message).toBe('Success return book');
    });

    it('should handle return errors', async () => {
        prismaClient.borrow.findMany.mockResolvedValue([]);

        const result = await supertest(app)
            .post('/api/return')
            .send({
                memberId: 'M001',
                bookId: 'HOB-83'
            });

        expect(result.status).toBe(404);
    });
});
