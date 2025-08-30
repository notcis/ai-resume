import { Resume } from "@/lib/generated/prisma";
import PersonalDetails from "../preview/personal-details";
import Link from "next/link";
import Summary from "../preview/summary";

export default function ResumeCard({ resume }: { resume: Resume }) {
  return (
    <Link href={`/dashboard/resume/edit/${resume.id}`}>
      <div
        className=" shadow-lg h-[175px] w-full rounded-xl p-5 border-t-[20px]"
        style={{ borderColor: resume.themeColor || "#b3aeae3d" }}
      >
        <PersonalDetails resume={resume} />
        <Summary resume={resume} />
      </div>
    </Link>
  );
}
