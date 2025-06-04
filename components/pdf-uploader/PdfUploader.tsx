'use client'

import {useState} from 'react';
import {useDropzone} from 'react-dropzone';

interface Props {
  onFileChange: (file: File) => Promise<void>
}

const PdfUploader = ({onFileChange}: Props) => {
  const [content, setContent] = useState<string | null>(null);

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if(file){
      setContent(file.name);
      onFileChange(file)
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/webp': ['.webp'],
    },
    multiple: false,
  });

  return (
    <div {...getRootProps()} style={styles.dropzone}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Suelta el PDF aquí...</p>
      ) : content ? (
        <p>Archivo cargado con exito</p>
      ) : (
        <p>Arrastra un archivo PDF o haz clic para seleccionar</p>
      )}
    </div>
  );
};

const styles = {
  dropzone: {
    border: '2px dashed #cccccc',
    padding: '20px',
    borderRadius: '8px',
    cursor: 'pointer',
    margin: '20px 0',
  },
  error: {
    color: 'red',
  },
  preview: {
    marginTop: '20px',
    padding: '10px',
    borderRadius: '4px',
  },
};

export default PdfUploader;
