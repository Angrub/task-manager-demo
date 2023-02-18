import { NextFunction, Request, Response } from "express";
import { TaskStorageInterface } from "../../interfaces/tasks.interfaces";

class TaskService {
    private Storage: TaskStorageInterface;

    constructor(storage: TaskStorageInterface) {
        this.Storage = storage;
    }

    async listTasks(req: Request, res: Response, next: NextFunction) {
        try {
            const session = req.header('session');
            const tasks = await this.Storage.list(<string>session);
            
            res.json({ tasks });
        } catch(error) {
            next(error)
        }
    }

    async findTask(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const session = req.header('session');
            const task = await this.Storage.findOne(Number(id));

            if(task?.session_id !== session) {
                res.status(403).json({ message: 'Forbidden' });

            } else {
                res.json({ task });
            }
        } catch(error) {
            next(error)
        }
    }

    async createTask(req: Request, res: Response, next: NextFunction) {
        try {
            const session = req.header('session');
            const data = { 
                ...req.body,
                deadline: new Date(req.body.deadline),
                session_id: session
            };
            await this.Storage.create(data);

            res.status(202).json({ message: 'created' });
        } catch(error) {
            next(error)
        }
    }

    async editTask(req: Request, res: Response, next: NextFunction) {
        try {
            const session = req.header('session');
            const id = Number(req.params.id);
            const task = await this.Storage.findOne(id);

            if(task?.session_id !== session) {
                res.status(403).json({ message: 'Forbidden' });

            } else {
                const data = { 
                    ...req.body,
                    deadline: new Date(req.body.deadline),
                    session_id: session 
                };
                await this.Storage.edit(Number(id), data);
    
                res.status(202).json({ message: 'updated' });
            }
        } catch(error) {
            next(error)
        }
    }

    async removeTask(req: Request, res: Response, next: NextFunction) {
        try {
            const session = req.header('session');
            const id = Number(req.params.id);
            const task = await this.Storage.findOne(id);

            if(task?.session_id !== session) {
                res.status(403).json({ message: 'Forbidden' });

            } else {
                await this.Storage.remove(id, <string>session); 
                res.json({ task_id: id, message: 'deleted' });
            }
        } catch(error) {
            next(error)
        }
    }
}

export {
    TaskService
}