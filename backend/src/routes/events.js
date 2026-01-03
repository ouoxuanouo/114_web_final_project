import { Router } from 'express';
import { createEvent, listEvents, getEvent, updateEvent, deleteEvent } from '../controllers/eventsController.js';

export const eventsRouter = Router();

eventsRouter.post('/events', createEvent);
eventsRouter.get('/events', listEvents);
eventsRouter.get('/events/:id', getEvent);
eventsRouter.put('/events/:id', updateEvent);
eventsRouter.delete('/events/:id', deleteEvent);
