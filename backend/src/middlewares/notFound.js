import { fail } from '../utils/response.js';

export function notFound(req, res) {
  return fail(res, 'NotFound', 404, {
    code: 'NOT_FOUND',
    details: `Route not found: ${req.method} ${req.originalUrl}`,
  });
}
