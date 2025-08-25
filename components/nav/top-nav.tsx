"use client";

import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import Image from "next/image";
import { Button } from "../ui/button";
import { signOut, useSession } from "next-auth/react";

export default function TopNav() {
  const { data: session, status } = useSession();

  return (
    <nav className="flex justify-between items-center p-1 shadow">
      <Link href="/">
        <Image src="/logo.svg" alt="Logo" width={50} height={39} />
      </Link>
      <div className="flex justify-end items-center">
        {status === "loading" ? (
          <p>Loading...</p>
        ) : !session?.user ? (
          <Button variant="link" asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
        ) : (
          <>
            {session.user.email}
            <Button variant="destructive" onClick={() => signOut()}>
              Sign Out
            </Button>
          </>
        )}

        <ModeToggle />
      </div>
    </nav>
  );
}
