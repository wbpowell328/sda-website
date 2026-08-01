// Express 4 doesn't forward rejected promises from async handlers to error
// middleware — an uncaught rejection just hangs the request. Wrap every
// async route with this so errors become a normal 500 response.
export function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
