import rateLimit from 'express-rate-limit';

export const rateLimitMiddleware = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutos
  max: 100,  // Límite de 100 solicitudes por IP en 15 minutos
  message: 'Demasiadas solicitudes, por favor inténtelo más tarde',
});
