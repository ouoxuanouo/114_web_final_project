import mongoose from 'mongoose';
import { fail } from '../utils/response.js';

export function errorHandler(err, req, res, next) {
  // Mongoose validation
  if (err instanceof mongoose.Error.ValidationError) {
    return fail(res, 'ValidationError', 400, {
      code: 'BAD_REQUEST',
      details: err.message,
    });
  }

  // Invalid ObjectId
  if (err instanceof mongoose.Error.CastError) {
    return fail(res, 'InvalidId', 400, {
      code: 'BAD_REQUEST',
      details: 'Invalid id format',
    });
  }

  console.error('❌ Error:', err);
  return fail(res, 'InternalServerError', 500, {
    code: 'INTERNAL_ERROR',
    details: 'Unexpected error occurred',
  });
}
