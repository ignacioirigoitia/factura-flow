import NextAuth, {type NextAuthConfig} from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { z } from 'zod';
import prisma from './lib/prisma';
import bcryptjs from 'bcryptjs';
 
export const authConfig : NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account',
  },

  callbacks: {

    authorized({ auth, request: { nextUrl } }) {
      
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return true
      }
      return true;
    },

    jwt({token, user}) {
      if(user){
        token.data = user;
      }
      return token;
    },

    session({session, token}) {
      session.user = token.data as any;
      return session;
    },
  },

  providers: [

    Credentials({
      async authorize(credentials) {
        // Validar las credenciales
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if(!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        // buscar el correo
        const user = await prisma.employee.findUnique({ 
          where: { correo: email.toLowerCase()}
        });

        if(!user || !user.activo) return null;

        // comparacion de las contraseñas
        if(!bcryptjs.compareSync(password, user.password)) return null;

        // regresar el usuario
        const {password: _, ...rest} = user;
        
        return rest;
      },
    }),

  ],
}


export const {  signIn, signOut, auth, handlers } = NextAuth( authConfig );