import * as express from "express";
import * as bodyParser from "body-parser";
import {Routes} from "./routes/routes";
import MongodbMemoryServer from 'mongodb-memory-server';
import * as mongoose from 'mongoose';

class App {

    public app: express.Application;
    public route: Routes = new Routes();
    public mongoServer = new MongodbMemoryServer();

    constructor() {
        this.app = express();
        this.config();
        this.route.routes(this.app);
        this.setupMongoDB();
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
    }

    setupMongoDB(): any {
        this.mongoServer.getConnectionString().then(mongoUri => {
            const mongooseOptions = {
                autoReconnect: true,
                reconnectTries: Number.MAX_VALUE,
                reconnectInterval: 1000,
                useNewUrlParser: true
            };

            mongoose.connect(mongoUri, mongooseOptions);

            mongoose.connection.on('error', (error) => {
                if (error.message.code === 'ETIMEDOUT') {
                    console.log(error);
                    mongoose.connect(mongoUri, mongooseOptions);
                }
                console.log(error);
            });

            mongoose.connection.once('open', () => {
                console.log(`MongoDB successfully connected to ${mongoUri}`);
            });
        })
    }
}

export default new App().app;