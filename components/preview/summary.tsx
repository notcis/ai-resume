import { Resume } from "@/lib/generated/prisma";

export default function Summary({ resume }: { resume: Resume }) {
  return (
    <div className="mt-5">
      <h2
        style={{ color: resume.themeColor || "#0e0d0db9" }}
        className="font-bold mb-3"
      >
        Summary
      </h2>
      {resume.summary && (
        <div className="text-xs font-normal">{resume.summary} </div>
      )}
    </div>
  );
}
