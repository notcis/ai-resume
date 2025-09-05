// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Education({ resume }: { resume: any }) {
  return (
    <div className="my-6">
      <h2
        style={{ color: resume?.themeColor }}
        className="font-bold text-sm mb-2"
      >
        Education
      </h2>
      <hr style={{ borderColor: resume?.themeColor }} />
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resume?.education?.map((edu: any, index: number) => (
          <div key={index} className="my-5">
            <p className=" text-sm font-bold">{edu?.qualification}</p>
            <div className="ml-2">
              <p className="text-sm">{edu?.name}</p>
              <p className="text-xs text-gray-600">{edu?.address}</p>
              <p className="text-xs text-gray-600">{edu?.year}</p>
            </div>
          </div>
        ))
      }
    </div>
  );
}
