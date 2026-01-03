import { EventRepository } from '../repositories/EventRepository.js';

export class EventService {
  constructor() {
    this.repo = new EventRepository();
  }

  normalizePayload(payload = {}) {
    const clean = { ...payload };
    if (typeof clean.title === 'string') clean.title = clean.title.trim();
    if (typeof clean.location === 'string') clean.location = clean.location.trim();
    if (typeof clean.date === 'string') clean.date = clean.date.trim();
    if (typeof clean.description === 'string') clean.description = clean.description.trim();

    // defaults / safety
    if (!clean.status) clean.status = 'open';
    if (clean.quota === '' || clean.quota == null) delete clean.quota;

    return clean;
  }

  async create(payload) {
    const clean = this.normalizePayload(payload);
    return await this.repo.create(clean);
  }

  async list(query) {
    const q = (query.q || '').trim();
    const sort = (query.sort || 'createdAt').trim();
    const order = (query.order || 'desc').trim();
    return await this.repo.findAll({ q, sort, order });
  }

  async get(id) {
    const doc = await this.repo.findById(id);
    if (!doc) {
      const e = new Error('Event not found');
      e.status = 404;
      e.code = 'NOT_FOUND';
      throw e;
    }
    return doc;
  }

  async update(id, payload) {
    await this.get(id); // ensure exists
    const clean = this.normalizePayload(payload);
    const doc = await this.repo.updateById(id, clean);
    return doc;
  }

  async remove(id) {
    await this.get(id);
    const doc = await this.repo.deleteById(id);
    return { deletedId: id, deleted: doc != null };
  }
}
