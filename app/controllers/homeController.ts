import {Request, Response} from 'express';

export class HomeController {

    public static WELCOME_MESSAGE = 'Welcome to the greatest library you\'ve ever seen!!!'

    public showWelcomeMessage = (req: Request, res: Response) => {
            res.status(200).send({
                message: HomeController.WELCOME_MESSAGE
            })
        }
}