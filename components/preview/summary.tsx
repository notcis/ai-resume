import { Resume } from "@/lib/generated/prisma";

export default function Summary({ resume }: { resume: Resume }) {
  return <p className="text-xs">{resume.summary}</p>;
}
