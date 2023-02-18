import { Router } from 'express';
import { SessionService } from './sessions.service';
import { SessionStorage } from './sessions.storage';

const router = Router();
const storage = new SessionStorage();
const service = new SessionService(storage);

/**
 * @swagger
 * /v1/session:
 *    get:
 *      tags:
 *        - sessions
 *      summary: "Genera sesión"
 *      description: Genera una nueva sesión al cliente si es la primera vez que accede.
 *      operationId: makeSession
 *      responses:
 *        '200':
 *          description: successful operation
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Session'
 *        '400':
 *          description: Invalid Session
 *              
 */
router.get('/', (req, res, next) => service.createSession(req, res, next));

export { router as SessionRouter }