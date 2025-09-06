import { Resume } from "@/lib/generated/prisma";
import PersonalDetails from "../preview/personal-details";
import Summary from "../preview/summary";
import Experience from "../preview/experience";
import Education from "../preview/education";
import Skill from "../preview/skill";
import { Button } from "../ui/button";
import { DownloadIcon, TrashIcon, UserPenIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useResume } from "@/context/resume";

export default function ResumeCard({ resume }: { resume: Resume }) {
  const router = useRouter();
  const { deleteResume } = useResume();

  return (
    <div
      className="relative shadow-lg w-full rounded-xl p-5 border-t-[20px] max-h-screen overflow-y-auto"
      style={{ borderColor: resume?.themeColor || "#b3aeae3d" }}
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

      <div className="absolute inset-0 bg-gray-800 flex items-center justify-center opacity-0 hover:opacity-90 transition-opacity duration-300">
        <div className="flex space-x-4">
          <Button
            onClick={() => router.push(`/dashboard/resume/edit/${resume.id}`)}
          >
            <UserPenIcon />
          </Button>
          <Button
            onClick={() =>
              router.push(`/dashboard/resume/download/${resume.id}`)
            }
          >
            <DownloadIcon />
          </Button>
          <Button onClick={() => deleteResume(resume.id)}>
            <TrashIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
