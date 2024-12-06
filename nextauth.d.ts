import NextAuth, {DefaultSession} from 'next-auth';

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
    } & DefaultSession['user'];
  }
}