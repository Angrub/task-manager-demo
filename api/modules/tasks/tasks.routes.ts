import { NextFunction, Request, Response, Router } from 'express';
import { TaskService } from './tasks.service';
import { TaskStorage } from './tasks.storage';
import { validationResult } from "express-validator";
import { 
    idValidator,
    dtoValidator,
    sessionValidator
} from '../../libs/validations';
import { CustomError } from '../../libs/errorHandler/customError';

const router = Router();
const storage = new TaskStorage();
const service = new TaskService(storage);

/**
 * @swagger
 * /v1/task:
 *    get:
 *      tags:
 *        - task
 *      summary: "Lista tareas"
 *      description: Lista las tareas vinculadas a una sesión.
 *      operationId: listTasks
 *      parameters:
 *        - name: session
 *          in: header
 *          description: Sesión del cliente
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        '200':
 *          description: successful operation
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/ReducedTask'
 */
router.get('/', 
    sessionValidator, 
    (req: Request, res: Response, next: NextFunction) => {
        // data validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            next(new CustomError('Bad Request', 400, errors.array()));
        }
        // its ok
        service.listTasks(req, res, next);
    });

/**
 * @swagger
 * /v1/task/{id}:
 *    get:
 *      tags:
 *        - task
 *      summary: "Optiene una tarea"
 *      description: Trae todos los datos de una tarea asociada a una sesión.
 *      operationId: findOneTasks
 *      parameters:
 *        - name: session
 *          in: header
 *          description: Sesión del cliente
 *          required: true
 *          schema:
 *            type: string
 *        - name: id
 *          in: path
 *          description: Identificador de la tarea
 *          required: true
 *          schema:
 *            type: integer
 *            format: int64
 *      responses:
 *        '200':
 *          description: successful operation
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Task'
 *        '400': 
 *          description: Invalid ID
 *        '403': 
 *          description: Forbidden
 */
router.get('/:id',
    sessionValidator,
    idValidator,
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            next(new CustomError('Bad Request', 400, errors.array()));
        }

        service.findTask(req, res, next);
    });

/**
 * @swagger
 * /v1/task:
 *    post:
 *      tags:
 *        - task
 *      summary: "Crea una tarea"
 *      description: Crea una tarea asociandola a una sesión.
 *      operationId: createTask
 *      parameters:
 *        - name: session
 *          in: header
 *          description: Sesión del cliente
 *          required: true
 *          schema:
 *            type: string
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Task'
 *      responses:
 *        '200':
 *          description: successful operation
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ApiResponse'
 *        '400': 
 *          description: Invalid data
 */
router.post('/',
    sessionValidator,
    dtoValidator,
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            next(new CustomError('Bad Request', 400, errors.array()));
        }

        service.createTask(req, res, next);
    });

/**
 * @swagger
 * /v1/task/{id}:
 *    put:
 *      tags:
 *        - task
 *      summary: "Edita una tarea"
 *      description: Edita una tarea existente siempre y cuando esté asociada a la sesión.
 *      operationId: updateTask
 *      parameters:
 *        - name: session
 *          in: header
 *          description: Sesión del cliente
 *          required: true
 *          schema:
 *            type: string
 *        - name: id
 *          in: path
 *          description: Identificador de la tarea
 *          required: true
 *          schema:
 *            type: integer
 *            format: int64
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Task'
 *      responses:
 *        '200':
 *          description: successful operation
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ApiResponse'
 *        '400': 
 *          description: Invalid data
 *        '403': 
 *          description: Forbidden
 */
router.put('/:id',
    sessionValidator,
    idValidator,
    dtoValidator,
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            next(new CustomError('Bad Request', 400, errors.array()));
        }

        service.editTask(req, res, next);
    });

/**
 * @swagger
 * /v1/task/{id}:
 *    delete:
 *      tags:
 *        - task
 *      summary: "Elimina una tarea"
 *      description: Elimina una tarea simpre y cuando esté asociada a la sesión.
 *      operationId: deleteTask
 *      parameters:
 *        - name: session
 *          in: header
 *          description: Sesión del cliente
 *          required: true
 *          schema:
 *            type: string
 *        - name: id
 *          in: path
 *          description: Identificador de la tarea
 *          required: true
 *          schema:
 *            type: integer
 *            format: int64
 *      responses:
 *        '200':
 *          description: successful operation
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/DeleteResponse'
 *        '400': 
 *          description: Invalid ID
 *        '403': 
 *          description: Forbidden
 */
router.delete('/:id',
    sessionValidator,
    idValidator,
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            next(new CustomError('Bad Request', 400, errors.array()));
        }

        service.removeTask(req, res, next);
    });

export { router as TaskRouter }