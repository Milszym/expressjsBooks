import {BookController} from "../controllers/bookController";
import {HomeController} from "../controllers/homeController";
import {ApiEndpoints} from "../constants/apiEndpoints";
import {UserController} from "../controllers/userController";

export class Routes {

    public bookController: BookController = new BookController();
    public homeController: HomeController= new HomeController();

    public routes(app): void {
        app.route(ApiEndpoints.HOME_URL)
            .get(this.homeController.showWelcomeMessage);

        app.route(ApiEndpoints.BOOK_URL)
            .get(this.bookController.getBooks)
            .post(this.bookController.addNewBook);

        app.route('/register')
            .post(new UserController().register);

        app.route(ApiEndpoints.BOOK_URL_WITH_ID)
            .get(this.bookController.getBookWithID)
            .put(this.bookController.updateBook)
            .delete(this.bookController.deleteBook);
    }
}