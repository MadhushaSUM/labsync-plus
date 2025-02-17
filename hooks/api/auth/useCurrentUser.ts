import { useSession } from "next-auth/react"


export const useCurrentUser = () => {
    const session = useSession();

    if (session.status != 'authenticated') {
        window.location.reload();
    }

    return session.data?.user;
}