import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, minlength: 1, maxlength: 80, trim: true },
    date: { type: String, required: true, trim: true }, // keep simple for assignment
    location: { type: String, required: true, trim: true, maxlength: 80 },
    quota: { type: Number, default: 30, min: 1, max: 100000 },
    status: { type: String, enum: ['draft', 'open', 'closed'], default: 'open' },
    description: { type: String, default: '', maxlength: 1000, trim: true },
  },
  { timestamps: true }
);

export const Event = mongoose.model('Event', EventSchema);
