import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import Image from "next/image";

export default function TopNav() {
  return (
    <nav className="flex justify-between items-center p-1 shadow">
      <Link href="/">
        <Image src="/logo.svg" alt="Logo" width={50} height={39} />
      </Link>
      <ModeToggle />
    </nav>
  );
}
