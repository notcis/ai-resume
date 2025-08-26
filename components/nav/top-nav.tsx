"use client";

import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import Image from "next/image";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import UserNav from "./user-nav";
import { Toaster } from "react-hot-toast";

export default function TopNav() {
  const { data: session } = useSession();

  return (
    <nav className="flex justify-between items-center p-1 shadow">
      <Link href="/">
        <Image src="/logo.svg" alt="Logo" width={50} height={39} />
      </Link>

      <Toaster />

      <div className="flex justify-end items-center gap-2">
        {!session?.user ? (
          <Button variant="link" asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
        ) : (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <UserNav user={session.user} />
          </>
        )}

        <ModeToggle />
      </div>
    </nav>
  );
}
