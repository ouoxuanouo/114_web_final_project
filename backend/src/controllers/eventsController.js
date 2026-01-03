import { ok, fail } from '../utils/response.js';
import { EventService } from '../services/EventService.js';

const service = new EventService();

export async function createEvent(req, res) {
  const doc = await service.create(req.body);
  return ok(res, doc, 'created', 201);
}

export async function listEvents(req, res) {
  const result = await service.list(req.query);
  return ok(res, result, 'ok', 200);
}

export async function getEvent(req, res) {
  const doc = await service.get(req.params.id);
  return ok(res, doc, 'ok', 200);
}

export async function updateEvent(req, res) {
  const doc = await service.update(req.params.id, req.body);
  return ok(res, doc, 'updated', 200);
}

export async function deleteEvent(req, res) {
  const result = await service.remove(req.params.id);
  return ok(res, result, 'deleted', 200);
}
