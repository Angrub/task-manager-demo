import { NextFunction, Request, Response } from "express";
import { SessionStorageInterface } from "../../interfaces/sessions.interfaces";
import { v4 as uuidv4 } from 'uuid';
import { CustomError } from "../../libs/errorHandler/customError";

class SessionService {
    private Storage: SessionStorageInterface;

    constructor(storage: SessionStorageInterface) {
        this.Storage = storage;
    }

    async createSession(req: Request, res: Response, next: NextFunction) {
        try {
            const session = req.header('session');
            if(session === undefined) {   
                const uuid = uuidv4()
                await this.Storage.create(uuid);
                
                res.json({session_id: uuid });

            } else {
                const data = await this.Storage.findOne(session);
                if(!data) throw new CustomError('Invalid Session', 400);

                res.send(`hello ${data.session_id}`);
            }
        } catch (error) {
            next(error);
        }
    }
}

export { SessionService }