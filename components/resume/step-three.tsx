import { useResume } from "@/context/resume";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  ArrowRightIcon,
  BrainIcon,
  Loader2Icon,
  PlusIcon,
  XIcon,
} from "lucide-react";
import { Textarea } from "../ui/textarea";

export default function StepThree() {
  const {
    experienceList,
    handleExperienceChange,
    handleExperienceSubmit,
    addExperience,
    removeExperience,
    handleExperienceGenerateWithAi,
    experienceLoading,
  } = useResume();
  return (
    <div className="w-full p-5 shadow-lg border-t-4 rounded-lg overflow-y-auto">
      <h2 className="text-2xl font-bold mb-5">Experiences</h2>
      {experienceList.length > 0 &&
        experienceList.map((exp, index) => (
          <div key={index} className="mb-10">
            <Input
              name="title"
              type="text"
              placeholder="Job Title"
              value={exp.title ?? ""}
              onChange={(e) => handleExperienceChange(e, index)}
              className="mb-3"
              autoFocus
            />
            <Input
              name="company"
              type="text"
              placeholder="Company Name"
              value={exp.company ?? ""}
              onChange={(e) => handleExperienceChange(e, index)}
              className="mb-3"
            />
            <Input
              name="address"
              type="text"
              placeholder="Company Address"
              value={exp.address ?? ""}
              onChange={(e) => handleExperienceChange(e, index)}
              className="mb-3"
            />
            <Input
              name="startDate"
              type="text"
              placeholder="Start Date"
              value={exp.startDate ?? ""}
              onChange={(e) => handleExperienceChange(e, index)}
              className="mb-3"
            />
            <Input
              name="endDate"
              type="text"
              placeholder="End Date"
              value={exp.endDate ?? ""}
              onChange={(e) => handleExperienceChange(e, index)}
              className="mb-3"
            />
            <Textarea
              name="summary"
              onChange={(e) => handleExperienceChange(e, index)}
              value={exp.summary ?? ""}
              className="mb-2"
              placeholder="job summary"
              rows={10}
              required
            />

            <div className=" flex justify-end">
              <Button
                variant="destructive"
                onClick={() => handleExperienceGenerateWithAi(index)}
                disabled={experienceLoading[index]}
              >
                {experienceLoading[index] ? (
                  <Loader2Icon size={18} className="mr-2 animate-spin" />
                ) : (
                  <BrainIcon size={18} className="mr-2" />
                )}
                Generate with AI
              </Button>
            </div>
          </div>
        ))}

      <div className="flex justify-between mt-3">
        <Button variant="outline" type="button" onClick={addExperience}>
          <PlusIcon size={18} className="mr-2" />
          Add
        </Button>
        {experienceList.length > 1 && (
          <Button variant="outline" type="button" onClick={removeExperience}>
            <XIcon size={18} className="mr-2" />
            Remove
          </Button>
        )}
        <Button
          variant="outline"
          type="button"
          onClick={handleExperienceSubmit}
        >
          <ArrowRightIcon size={18} className="mr-2" />
          Next
        </Button>
      </div>
    </div>
  );
}
