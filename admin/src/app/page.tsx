"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { fetchDiscordUserInformation } from "./api/users";

export default function Home() {
  const {data: session, status } = useSession({required: true});

  useEffect(() => {
    console.log(session);
    if (session) {
      fetchDiscordUserInformation(session.accessToken).then((res) => {
        console.log(typeof(res));
      })
    }

  }, [session]);

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
      <button onClick={() => signOut()}>Sign out</button>


    </div>
  )

}
