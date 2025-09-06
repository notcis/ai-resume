import { Resume } from "@/lib/generated/prisma";
import PersonalDetails from "../preview/personal-details";
import Link from "next/link";
import Summary from "../preview/summary";
import Experience from "../preview/experience";
import Education from "../preview/education";
import Skill from "../preview/skill";

export default function ResumeCard({ resume }: { resume: Resume }) {
  return (
    <Link href={`/dashboard/resume/edit/${resume.id}`}>
      <div
        className=" shadow-lg w-full rounded-xl p-5 border-t-[20px] max-h-screen overflow-y-auto"
        style={{ borderColor: resume.themeColor || "#b3aeae3d" }}
      >
        <div className=" line-clamp-3">
          <PersonalDetails resume={resume} />
        </div>
        <div className=" line-clamp-4">
          <Summary resume={resume} />
        </div>
        <div className=" line-clamp-4">
          <Experience resume={resume} />
        </div>
        <div className=" line-clamp-4">
          <Education resume={resume} />
        </div>
        <div className=" line-clamp-4">
          <Skill resume={resume} />
        </div>
      </div>
    </Link>
  );
}
