"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Home() {
  const {data: session, status } = useSession({required: true});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://discord.com//api/v10/users/@me", {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (session) {
      fetchData();
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
      <p>Signed in as {session.accessToken}</p>
      <button onClick={() => signOut()}>Sign out</button>


    </div>
  )

}
