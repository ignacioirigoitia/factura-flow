import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: number;
      correo: string;
      nombreCompleto: string;
      telefono: string;
      rol: string;
      activo: boolean;
      companyId: string;
      companies: {
        id: string;
        companyId: string;
        employeeId: string;
      }[]
    } & DefaultSession['user'];
  }
}