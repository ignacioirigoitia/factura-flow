
export function obtenerPeriodoFacturado(texto: string): string | null {
  // Buscamos todas las fechas en formato DD/MM/YYYY usando una expresión regular
  const fechas = texto.match(/\b\d{2}\/\d{2}\/\d{4}\b/g);

  // Si encontramos al menos dos fechas, tomamos la primera y segunda
  if (fechas && fechas.length >= 2) {
    const [, mes, año] = fechas[0].split("/"); // Tomamos la primera fecha (inicio del período)
    return `${mes}/${año}`; // Retornamos en formato MM/YYYY
  }

  // Si no se encuentran suficientes fechas, devolvemos null
  return null;
}