import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Button asChild>
        <Link href="/resume/create">create resume</Link>
      </Button>
    </div>
  );
}
