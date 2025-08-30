import { useResume } from "@/context/resume";
import PersonalDetails from "../preview/personal-details";
import Summary from "../preview/summary";
import { Resume } from "@/lib/generated/prisma";

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
      className=" shadow-lg h-[175px] w-full rounded-xl p-5 border-t-[20px]"
      style={{ borderColor: resume.themeColor || "#b3aeae3d" }}
    >
      <PersonalDetails resume={newResume} />
      <Summary resume={newResume} />
    </div>
  );
}
