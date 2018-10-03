import * as express from "express";
import * as bodyParser from "body-parser";
import {Routes} from "./routes/routes";
import {MongoServer} from "./mongoConfig";
import * as session from 'express-session'

class App {

    public app: express.Application;
    public route: Routes = new Routes();

    constructor() {
        this.app = express();
        this.config();
        this.route.routes(this.app);
        MongoServer.setupMongoDB();
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(session({secret: "Books secret key"}));
    }
}

export default new App().app;