"use server";

import { signOut, auth } from "@/auth";
import { deleteSessionByUserId } from "@/data/user";

export const logout = async () => {
    const session = await auth();
    await deleteSessionByUserId(session?.user.id as number | undefined);
    console.log(session);

    await signOut({
        redirectTo: "/",
    });
};