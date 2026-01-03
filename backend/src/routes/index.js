import { Router } from 'express';
import { eventsRouter } from './events.js';

export const apiRouter = Router();

apiRouter.use(eventsRouter);
