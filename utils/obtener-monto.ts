export function obtenerMonto(texto: string): number | null {
  // Expresión regular para capturar el monto antes de 'Subtotal: $'
  const regex = /(\d+[\.,]?\d*)\s*(?=Subtotal:\s*\$)/;
  const match = texto.match(regex);
  if(match){
    const monto = +match[1].replace('.', '').replace(',', '.');

    // Si el match no es un número,
    if(isNaN(monto)) return null;

    // Reemplazo de '.' por ',' y viceversa
    return monto;
  }
  return null
}