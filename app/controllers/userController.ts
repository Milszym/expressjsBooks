import {Response} from 'express';
import {User} from "../models/user";
import {HashUtil} from "../util/hashUtil";

export class UserController {

    public register(req, res: Response) {
        let newUser = new User(req.body);
        newUser.password = HashUtil.getHash(newUser.name + newUser.password);
        newUser.save((err, user) => {
            if(err) {
                res.status(500).send(err.message)
            } else {
                req.session.user = user;
                res.status(201).json('Some cookie')
            }
        });
    }

}