export function obtenerPuntoDeVentaYCompNro(texto: string): string | null {
  // Normalizamos los espacios y eliminamos saltos de línea innecesarios
  const textoNormalizado = texto.replace(/\s+/g, ' ').trim();

  // Usamos una expresión regular para buscar el patrón "Punto de Venta:Comp. Nro:" seguido de un número
  const match = textoNormalizado.match(/Punto de Venta:Comp\. Nro:\s*(\d+)/);

  // Si encontramos una coincidencia, devolvemos el número; de lo contrario, devolvemos null
  return match ? match[1] : null;
}