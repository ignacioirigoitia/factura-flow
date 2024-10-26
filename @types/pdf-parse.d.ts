// @types/pdf-parse.d.ts

declare module 'pdf-parse/lib/pdf-parse' {
  interface PDFParseResult {
    numpages: number;
    numrender: number;
    info: any;
    metadata: any;
    text: string;
  }

  function pdf(parse: Buffer | Uint8Array): Promise<PDFParseResult>;

  export = pdf;
}
