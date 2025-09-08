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
      <h2 className="text-2xl font-bold mb-5">ประสบการณ์</h2>
      {experienceList.length > 0 &&
        experienceList.map((exp, index) => (
          <div key={index} className="mb-10">
            <Input
              name="title"
              type="text"
              placeholder="ตำแหน่งงาน"
              value={exp.title ?? ""}
              onChange={(e) => handleExperienceChange(e, index)}
              className="mb-3"
              autoFocus
            />
            <Input
              name="company"
              type="text"
              placeholder="ชื่อบริษัท"
              value={exp.company ?? ""}
              onChange={(e) => handleExperienceChange(e, index)}
              className="mb-3"
            />
            <Input
              name="address"
              type="text"
              placeholder="ที่อยู่บริษัท"
              value={exp.address ?? ""}
              onChange={(e) => handleExperienceChange(e, index)}
              className="mb-3"
            />
            <Input
              name="startDate"
              type="text"
              placeholder="วันที่เริ่มงาน"
              value={exp.startDate ?? ""}
              onChange={(e) => handleExperienceChange(e, index)}
              className="mb-3"
            />
            <Input
              name="endDate"
              type="text"
              placeholder="วันที่สิ้นสุดงาน"
              value={exp.endDate ?? ""}
              onChange={(e) => handleExperienceChange(e, index)}
              className="mb-3"
            />
            <Textarea
              name="summary"
              onChange={(e) => handleExperienceChange(e, index)}
              value={exp.summary ?? ""}
              className="mb-2"
              placeholder="รายละเอียดงาน"
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
                สร้างด้วย AI
              </Button>
            </div>
          </div>
        ))}

      <div className="flex justify-between mt-3">
        <Button variant="outline" type="button" onClick={addExperience}>
          <PlusIcon size={18} className="mr-2" />
          เพิ่ม
        </Button>
        {experienceList.length > 1 && (
          <Button variant="outline" type="button" onClick={removeExperience}>
            <XIcon size={18} className="mr-2" />
            ลบ
          </Button>
        )}
        <Button
          variant="outline"
          type="button"
          onClick={handleExperienceSubmit}
        >
          <ArrowRightIcon size={18} className="mr-2" />
          ถัดไป
        </Button>
      </div>
    </div>
  );
}
