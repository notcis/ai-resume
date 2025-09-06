import { useResume } from "@/context/resume";
import PersonalDetails from "../preview/personal-details";
import Summary from "../preview/summary";
import Experience from "../preview/experience";
import Education from "../preview/education";
import Skill from "../preview/skill";

export default function PreviewCard() {
  const { resume } = useResume();

  const newResume = {
    name: resume.name,
    id: "preview-id",
    userId: "preview-user-id",
    userEmail: resume.email,
    title: null,
    job: resume.job,
    address: resume.address,
    themeColor: resume.themeColor,
    phone: resume.phone,
    summary: resume.summary,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return (
    <div
      className="shadow-lg max-h-screen w-full rounded-xl p-5 border-t-[20px] overflow-y-auto"
      style={{ borderColor: resume.themeColor || "#b3aeae3d" }}
    >
      <PersonalDetails resume={newResume} />
      <Summary resume={newResume} />
      <Experience resume={resume} />
      <Education resume={resume} />
      <Skill resume={resume} />
    </div>
  );
}
