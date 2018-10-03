import {Request, Response} from 'express';
import {Book} from "../models/book";

export class BookController {

    public addNewBook(req: Request, res: Response) {
        let newBook = new Book(req.body);
        newBook.save((err, Book) =>
            err ? res.send(err.message) : res.json(Book)
        );
    }

    public getBooks(req: Request, res: Response) {
        Book.find({}, (err, book) =>
            err ? res.send(err.message) : res.json(book)
        );
    }

    public getBookWithID(req: Request, res: Response) {
        let bookId = req.params.bookId;
        Book.findById(bookId, (err, book) => {
                if (!book) {
                    res.json(`No book with id: ${bookId}`);
                } else {
                    err ? res.send(err.message) : res.json(book)
                }
            }
        );
    }

    public updateBook(req: Request, res: Response) {
        Book.findOneAndUpdate({_id: req.params.bookId}, req.body, {new: true}, (err, book) =>
            err ? res.send(err.message) : res.json(book)
        );
    }

    public deleteBook(req: Request, res: Response) {
        let bookId = req.params.bookId;
        Book.findByIdAndRemove({_id: req.params.bookId}, (err, book) => {
            if (!book) {
                res.send(`No book with id: ${bookId}`);
            } else {
                err ? res.send(err.message) :
                    res.json({message: 'Successfully deleted Book!'})
            }
        });
    }

}