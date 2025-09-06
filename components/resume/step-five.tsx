import { useResume } from "@/context/resume";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowRightIcon, PlusIcon, XIcon } from "lucide-react";
export default function StepFive() {
  const {
    skillList,
    handleSkillChange,
    handleSkillSubmit,
    addSkill,
    removeSkill,
  } = useResume();

  const skillLevels = [
    { label: "Poor", value: "1" },
    { label: "Basic", value: "2" },
    { label: "Moderate", value: "3" },
    { label: "Advanced", value: "4" },
    { label: "Expert", value: "5" },
  ];
  return (
    <div className="w-full p-5 shadow-lg border-t-4 rounded-lg overflow-y-auto">
      <h2 className=" text-2xl font-bold mb-5">Skills</h2>
      {skillList?.length > 0 &&
        skillList.map((skill, index) => (
          <div key={index} className="mb-10">
            <Input
              name="name"
              type="text"
              placeholder="Skill"
              value={skill.name}
              onChange={(e) => handleSkillChange(e, index)}
              className="mb-3"
              autoFocus
            />
            <div className=" flex space-x-2">
              {skillLevels.map((level) => (
                <Button
                  key={level.value}
                  variant={skill.level === level.value ? "secondary" : "link"}
                  onClick={() =>
                    handleSkillChange(
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      { target: { name: "level", value: level.value } } as any,
                      index
                    )
                  }
                >
                  {level.label}
                </Button>
              ))}
            </div>
          </div>
        ))}
      <div className="flex justify-between">
        <Button variant="outline" onClick={addSkill}>
          <PlusIcon size={18} className="mr-2" />
          Add
        </Button>
        <Button onClick={removeSkill} variant="outline">
          <XIcon size={18} className="mr-2" />
          Remove
        </Button>
        <Button variant="outline" onClick={handleSkillSubmit}>
          <ArrowRightIcon size={18} className="mr-2" />
          Next
        </Button>
      </div>
    </div>
  );
}
