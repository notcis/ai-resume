import { useResume } from "@/context/resume";
import PersonalDetails from "../preview/personal-details";
import Summary from "../preview/summary";
import Experience from "../preview/experience";
import Education from "../preview/education";
import Skill from "../preview/skill";

export default function PreviewCard() {
  const { resume } = useResume();

  return (
    <div
      className="shadow-lg max-h-screen w-full rounded-xl p-5 border-t-[20px] overflow-y-auto"
      style={{ borderColor: resume?.themeColor }}
    >
      <PersonalDetails resume={resume} />
      <Summary resume={resume} />
      <Experience resume={resume} />
      <Education resume={resume} />
      <Skill resume={resume} />
    </div>
  );
}
