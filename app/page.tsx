"use client";

import Image from 'next/image';
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Home() {

  const { data:session } = useSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className='text-4xl font-bold'>LabSync Plus</h1>
      <h3><span>Welcome </span>{session?.user?.email}</h3>
      <button onClick={() => signOut()}>Sign Out</button>
    </main>
  )
}
