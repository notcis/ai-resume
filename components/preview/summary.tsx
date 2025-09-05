import { formatSummary } from "@/lib/utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Summary({ resume }: { resume: any }) {
  return (
    <div className="mt-5">
      <h2 style={{ color: resume?.themeColor }} className="font-bold mb-3">
        Summary
      </h2>
      {resume.summary && (
        <div
          className="text-sm"
          dangerouslySetInnerHTML={{ __html: formatSummary(resume?.summary) }}
        />
      )}
    </div>
  );
}
