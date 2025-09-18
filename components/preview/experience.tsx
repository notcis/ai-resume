import { formatSummary } from "@/lib/utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Experience({ resume }: { resume: any }) {
  return (
    <div className="my-6">
      <h2
        style={{ color: resume?.themeColor }}
        className="font-bold text-sm mb-2"
      >
        ประสบการณ์ทำงาน
      </h2>
      <hr style={{ borderColor: resume?.themeColor }} />

      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resume?.experience?.map((exp: any, index: number) => (
          <div key={index} className="my-5">
            <h2 className=" text-sm font-bold">{exp?.title}</h2>
            <h3 className="text-sm font-semibold">{exp?.company}</h3>
            <p className="text-xs text-gray-600">
              {exp?.startDate} - {exp?.endDate}
            </p>
            <p className="text-sm text-gray-600 ">{exp?.address}</p>
            {/* render formatted HTML (from Textarea / rich editor) */}
            <div
              className="text-sm font-normal mt-2.5 text-gray-800"
              dangerouslySetInnerHTML={{ __html: formatSummary(exp?.summary) }}
            />
          </div>
        ))
      }
    </div>
  );
}
