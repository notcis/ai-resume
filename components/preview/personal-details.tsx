import { Resume } from "@/lib/generated/prisma";

export default function PersonalDetails({ resume }: { resume: Resume }) {
  return (
    <>
      <h2
        style={{ color: resume.themeColor || "#0e0d0db9" }}
        className=" font-bold text-xl text-center"
      >
        {resume.name}
      </h2>
      <h2 className=" text-center text-sm font-medium">{resume.job}</h2>
      <h2 className=" text-center text-sm font-medium">{resume.address}</h2>

      <div className=" flex justify-between">
        <h2 className=" font-normal text-xs">{resume.phone}</h2>
        <h2 className=" font-normal text-xs">{resume.userEmail}</h2>
      </div>

      <hr
        className="border-[1.5px] my-2"
        style={{ color: resume.themeColor || "#0e0d0db9" }}
      />
    </>
  );
}
