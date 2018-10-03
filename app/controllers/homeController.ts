import {Request, Response} from 'express';

export class HomeController {

    public showWelcomeMessage = (req: Request, res: Response) => {
            res.status(200).send({
                message: 'Welcome to the greatest library you\'ve ever seen!!!'
            })
        }
}