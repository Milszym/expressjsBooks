import {BookController} from "../controllers/bookController";
import {HomeController} from "../controllers/homeController";

export class Routes {

    public bookController: BookController = new BookController();
    public homeController: HomeController= new HomeController();

    public routes(app): void {
        app.route('/')
            .get(this.homeController.showWelcomeMessage);

        app.route('/book')
            .get(this.bookController.getBooks)
            .post(this.bookController.addNewBook);

        app.route('/book/:bookId')
            .get(this.bookController.getBookWithID)
            .put(this.bookController.updateBook)
            .delete(this.bookController.deleteBook);
    }
}