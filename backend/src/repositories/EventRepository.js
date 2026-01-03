import { Event } from '../models/Event.js';

/**
 * Repository Pattern: all DB operations live here.
 */
export class EventRepository {
  async create(payload) {
    const doc = await Event.create(payload);
    return doc.toObject();
  }

  async findAll({ q, sort, order }) {
    const filter = {};
    if (q) {
      const r = new RegExp(q, 'i');
      filter.$or = [{ title: r }, { location: r }];
    }

    const sortField = sort === 'date' ? 'date' : 'createdAt';
    const sortOrder = order === 'asc' ? 1 : -1;

    const items = await Event.find(filter).sort({ [sortField]: sortOrder }).lean();
    const total = await Event.countDocuments(filter);

    return { items, total };
  }

  async findById(id) {
    const doc = await Event.findById(id).lean();
    return doc;
  }

  async updateById(id, payload) {
    const doc = await Event.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    }).lean();
    return doc;
  }

  async deleteById(id) {
    const doc = await Event.findByIdAndDelete(id).lean();
    return doc;
  }
}
