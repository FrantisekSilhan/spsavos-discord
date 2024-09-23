"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const {data: session, status } = useSession({required: true});

  if (!session) {
    return (
      <div>
        <p>You are not signed in</p>
        <button onClick={() => signIn("discord")}>Sign in with Discord</button>
      </div>
    );
  }

  return (
    <div>
      <p>Signed in as {session.accessToken}</p>
      <button onClick={() => signOut()}>Sign out</button>

    </div>
  )

}
