import { AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const authConfig: AuthOptions = {
  pages: {
    signIn: '/sign-in'
  },
  providers: [
    // GoogleProvider({
    //   clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
    //   clientSecret: 'жопа',
    // }),
    Credentials({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const currentUser = await fetch('inctagram.work/api/v1/auth/me').then((res) => res.json());

        if (currentUser.data.statusCode === 200) {
          return currentUser.data.data;
        }
        // return {
        //   email: credentials?.email,
        //   password: credentials?.password
        // }

        return null;
      },
      credentials: {
        email: { label: 'email', required: true, type: 'email' },
        password: { label: 'password', type: 'password' }
      }
    })
  ]
};
