import { getResumeFromDB } from "@/actions/resume.action";
import Education from "@/components/preview/education";
import Experience from "@/components/preview/experience";
import PersonalDetails from "@/components/preview/personal-details";
import Skill from "@/components/preview/skill";
import Summary from "@/components/preview/summary";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { resume } = await getResumeFromDB(id);

  return {
    title: `${resume?.name} - Resume`,
    description: `${resume?.summary}`,
    openGraph: {
      title: `${resume?.name} - Resume`,
      description: `${resume?.summary}`,
      images: ["/logo.svg"],
    },
  };
}

export default async function ResumePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { resume } = await getResumeFromDB(id);

  return (
    <div className="m-20">
      <PersonalDetails resume={resume} />
      <Summary resume={resume} />
      <Experience resume={resume} />
      <Education resume={resume} />
      <Skill resume={resume} print={true} />
    </div>
  );
}
