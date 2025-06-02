
export function obtenerFechaEmision(texto: string): Date | null {
  // Normalizamos los espacios y eliminamos saltos de línea innecesarios
  const textoNormalizado = texto.replace(/\s+/g, ' ').trim();

  // Buscamos el índice de "Domicilio:"
  const indiceDomicilio = textoNormalizado.indexOf('Domicilio:');
  if (indiceDomicilio === -1) {
    const indiceDomicilioComercial = textoNormalizado.indexOf('Domicilio Comercial:');
    
    // Extraemos el fragmento que sigue a "Domicilio:"
    const fragmento = textoNormalizado.slice(indiceDomicilioComercial + 10);

    // Buscamos el primer patrón de fecha en el formato DD/MM/YYYY
    const match = fragmento.match(/\b(\d{2})\/(\d{2})\/(\d{4})\b/);
    
    if (!match) return null; // Si no encontramos la fecha, retornamos null

    // Extraemos día, mes y año del match
    const [, dia, mes, anio] = match;

    // Creamos un objeto Date (mes se pasa como índice: enero = 0)
    return new Date(parseInt(anio), parseInt(mes) - 1, parseInt(dia));
  }

  // Extraemos el fragmento que sigue a "Domicilio:"
  const fragmento = textoNormalizado.slice(indiceDomicilio + 10);

  // Buscamos el primer patrón de fecha en el formato DD/MM/YYYY
  const match = fragmento.match(/\b(\d{2})\/(\d{2})\/(\d{4})\b/);
  
  if (!match) return null; // Si no encontramos la fecha, retornamos null

  // Extraemos día, mes y año del match
  const [, dia, mes, anio] = match;

  // Creamos un objeto Date (mes se pasa como índice: enero = 0)
  return new Date(parseInt(anio), parseInt(mes) - 1, parseInt(dia));
}