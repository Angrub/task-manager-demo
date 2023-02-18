import { Router } from 'express';
import { SessionRouter } from './sessions/sessions.routes';
import { TaskRouter } from './tasks/tasks.routes';

const router = Router();

router.use('/v1/task', TaskRouter);
router.use('/v1/session', SessionRouter)

export { router as MainRouter }