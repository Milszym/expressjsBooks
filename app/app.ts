import * as express from "express";
import * as bodyParser from "body-parser";
import MongodbMemoryServer from 'mongodb-memory-server';

class App {

    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));
        // serving static files
        this.app.use(express.static('public'));
    }

}

export default new App().app;