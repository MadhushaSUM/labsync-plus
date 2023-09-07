import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { query } from "../../../../lib/database";
import { data } from "autoprefixer";


export const AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},

            async authorize(credentials) {
                const { email, password } = credentials;

                try {
                    // check if the username exists
                    const user = await query({
                        query:"SELECT * FROM users WHERE email = ?",
                        values:[email]
                    });
            
                    if (user.length === 0) {
                        return NextResponse.json({ message: "User doesn't exists!" }, { status: 404 });                        
                    }
            
                    if (user[0].password !== password) {
                        return NextResponse.json({ message: "Invalid credentials!" }, { status: 502 });
                    }
                    
                    return user[0];
                } catch (error) {
                    console.log(error);
                    return NextResponse.json({ message: "Error occured while logging in" }, { status: 501 });
                }
            },
        }),
    ],
    callbacks: {
        async session({ session }) {
            const email = session?.user?.email;

            const data = await query({
                query:"SELECT * FROM users WHERE email = ?",
                values:[email]
            }); 

            const newSession = {
                ...session,
                user: {
                    ...session.user,
                    username: data[0].username,
                },
            };
            
            return newSession;
        }
    },
    session: {
        stratergy: "jwt",

    },

    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
    },
};


const handler = NextAuth(AuthOptions);
export { handler as GET, handler as POST };