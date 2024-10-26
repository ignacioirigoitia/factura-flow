
export function obtenerCae(texto: string): string | null {
  // Normalizamos espacios en blanco para facilitar la búsqueda
  const textoNormalizado = texto.replace(/\s+/g, ' ').trim();

  // Buscamos la posición de la etiqueta 'CAE N°:'
  const indiceCae = textoNormalizado.indexOf('CAE N°:');
  
  if (indiceCae === -1) {
    return null; // Si no se encuentra 'CAE N°:', retornamos null
  }

  // Extraemos el fragmento posterior a 'CAE N°:'
  const fragmento = textoNormalizado.slice(indiceCae + 7); // 7 es la longitud de 'CAE N°:'

  // Buscamos el primer número largo (12 o más dígitos) en el fragmento extraído
  const match = fragmento.match(/\d{12,}/);

  return match ? match[0] : null;
}