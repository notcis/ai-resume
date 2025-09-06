import { StarIcon } from "lucide-react";
import { Progress } from "../ui/progress";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Skill({
  resume,
  print = false,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resume: any;
  print?: boolean;
}) {
  const themeColor = resume?.themeColor || "#333";
  const defaultColor = "#d3d3d3";
  return (
    <div className="my-6">
      <h2 style={{ color: themeColor }} className=" font-bold text-sm mb-2">
        Skills
      </h2>
      <hr style={{ borderColor: themeColor }} />

      <div className=" grid grid-cols-2 gap-3 my-4">
        {resume?.skill &&
          resume?.skill.length > 0 &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          resume.skill.map((sk: any) => (
            <div key={sk} className="flex items-center justify-between">
              <h2 className=" text-sm font-bold">{sk?.name}</h2>
              <div className="flex-1 ml-2">
                {print ? (
                  <div className=" flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className="w-5 h-5"
                        style={{
                          color:
                            i < Number(sk?.level) ? themeColor : defaultColor,
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <Progress value={Number(sk?.level) * 20} />
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
