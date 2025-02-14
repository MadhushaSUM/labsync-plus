import type { NextAuthConfig } from "next-auth";
import Credentials from 'next-auth/providers/credentials';

import { LoginSchema } from '@/schemas';

export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                const validatedFields = LoginSchema.safeParse(credentials);

                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;

                    try {
                        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ email, password })
                        });

                        if (!response.ok) {
                            const errorData = await response.json();
                            throw new Error(errorData.message || "Failed to add patient");
                        }

                        const user = await response.json();

                        return {
                            id: user.id,
                            email: user.email,
                            name: user.name,
                            //TODO: Add any other user fields
                        };
                    } catch (error) {
                        console.error('Authentication error:', error);
                        return null;
                    }
                }

                return null;

            },
        })
    ],
} satisfies NextAuthConfig;
