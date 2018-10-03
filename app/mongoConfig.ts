import MongodbMemoryServer from 'mongodb-memory-server';
import * as mongoose from 'mongoose';

export class MongoServer {

    public static mongoServer = new MongodbMemoryServer();

    public static setupMongoDB(): any {
        this.mongoServer.getConnectionString().then(mongoUri => {
            const mongooseOptions = {
                autoReconnect: true,
                reconnectTries: Number.MAX_VALUE,
                reconnectInterval: 1000,
                useNewUrlParser: true,
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