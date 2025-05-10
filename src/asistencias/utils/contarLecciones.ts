export const contarLecciones = (lecciones: string[] | string): number => {
  if (Array.isArray(lecciones)) {
    return lecciones.length;
  }
  if (typeof lecciones === 'string') {
    return lecciones
      .split(',')
      .map(l => l.trim())
      .filter(Boolean)
      .length;
  }
  return 0;
};