'use server';

export const uploadPdfAws = async (file: File) => {
  const apiUrl = process.env.API_URL_AWS ?? '';
  const apiKey = process.env.API_KEY_URL ?? '';

  // Crear un objeto FormData para enviar el archivo
  const formData = new FormData();
  formData.append('file', file, file.name);

  try {
    // Realizar la solicitud a la API de AWS
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        // Nota: No es necesario establecer el Content-Type cuando usamos FormData,
        // ya que el navegador lo maneja automáticamente.
      },
      body: formData,
    });

    // Verificar si la solicitud fue exitosa
    if (!response.ok) {
      throw new Error(`Error al subir el archivo: ${response.statusText}`);
    }

    // Obtener la respuesta de la API
    const data = await response.json();
    console.log('Archivo subido exitosamente:', data);
    return {
      ok: true,
      message: 'Archivo subido exitosamente'
    }
  } catch (error) {
    console.error('Error en la subida del archivo:', error);
    return {
      ok: false,
      message: 'Error en la subida del archivo'
    }
  }
};
