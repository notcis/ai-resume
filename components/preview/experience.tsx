// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Experience({ resume }: { resume: any }) {
  return (
    <div className=" my-6">
      <h2
        style={{ color: resume.themeColor }}
        className=" text-center font-bold text-sm mb-2"
      >
        Experience
      </h2>
      <hr style={{ borderColor: resume.themeColor }} />

      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resume.experience.map((exp: any, index: number) => (
          <div key={index} className="my-5">
            <h2 className=" text-sm font-bold">{exp?.title}</h2>
            <h3 className="text-sm">{exp?.company}</h3>
            <p className="text-sm text-gray-600">{exp?.address}</p>
            <p className="text-sm">{exp?.summary}</p>
          </div>
        ))
      }
    </div>
  );
}
