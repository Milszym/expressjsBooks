import {Request, Response} from 'express';
import {Book} from "../models/book";

export class BookController {

    public addNewBook(req: Request, res: Response) {
        let newBook = new Book(req.body);
        newBook.save((err, book) =>
            err ? res.status(500).send(err.message) : res.status(201).json(book)
        );
    }

    public getBooks(req: Request, res: Response) {
        Book.find({}, (err, book) =>
            err ? res.status(500).send(err.message) : res.status(200).json(book)
        );
    }

    public getBookWithID(req: Request, res: Response) {
        let bookId = req.params.bookId;
        Book.findById(bookId, (err, book) => {
            if (!err && !book) {
                    res.status(404).json(`No book with id: ${bookId}`);
                } else {
                    err ? res.status(500).send(err.message) : res.status(200).json(book)
                }
            }
        );
    }

    public updateBook(req: Request, res: Response) {
        let bookId = req.params.bookId;
        Book.findByIdAndUpdate({_id: req.params.bookId}, req.body, {new: true, runValidators: true}, (err, book) => {
            if (!err && !book) {
                res.status(404).send(`No book with id: ${bookId}`);
            } else {
                err ? res.status(500).send(err.message) :
                    res.status(200).json(book)
            }
        });
    }

    public deleteBook(req: Request, res: Response) {
        let bookId = req.params.bookId;
        Book.findByIdAndRemove({_id: req.params.bookId}, (err, book) => {
            if (!err && !book) {
                res.status(404).send(`No book with id: ${bookId}`);
            } else {
                err ? res.status(500).send(err.message) :
                    res.status(200).json({message: 'Successfully deleted Book!'})
            }
        });
    }

}