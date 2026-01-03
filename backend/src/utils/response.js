export function ok(res, data = null, message = 'ok', status = 200) {
  return res.status(status).json({
    success: true,
    message,
    data,
    error: null,
  });
}

export function fail(res, message = 'error', status = 500, error = null) {
  return res.status(status).json({
    success: false,
    message,
    data: null,
    error,
  });
}
