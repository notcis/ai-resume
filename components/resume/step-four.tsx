import { useResume } from "@/context/resume";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowRightIcon, PlusIcon, XIcon } from "lucide-react";

export default function StepFour() {
  const {
    educationList,
    handleEducationChange,
    handleEducationSubmit,
    addEducation,
    removeEducation,
  } = useResume();
  return (
    <div className="w-full p-5 shadow-lg border-t-4 rounded-lg overflow-y-auto">
      <h2 className="text-2xl font-bold mb-5">การศึกษา</h2>
      {educationList.length > 0 &&
        educationList.map((edu, index) => (
          <div key={index} className="mb-10">
            <Input
              name="name"
              type="text"
              placeholder="ชื่อโรงเรียน/มหาวิทยาลัย"
              value={edu.name ?? ""}
              onChange={(e) => handleEducationChange(e, index)}
              className="mb-3"
              autoFocus
            />
            <Input
              name="address"
              type="text"
              placeholder="ที่อยู่โรงเรียน/มหาวิทยาลัย"
              value={edu.address ?? ""}
              onChange={(e) => handleEducationChange(e, index)}
              className="mb-3"
            />
            <Input
              name="qualification"
              type="text"
              placeholder="วุฒิการศึกษา"
              value={edu.qualification ?? ""}
              onChange={(e) => handleEducationChange(e, index)}
              className="mb-3"
            />
            <Input
              name="year"
              type="text"
              placeholder="ปีการศึกษา"
              value={edu.year ?? ""}
              onChange={(e) => handleEducationChange(e, index)}
              className="mb-3"
            />
          </div>
        ))}

      <div className="flex justify-between mt-3">
        <Button variant="outline" type="button" onClick={addEducation}>
          <PlusIcon size={18} className="mr-2" />
          เพิ่ม
        </Button>
        {educationList.length > 1 && (
          <Button variant="outline" type="button" onClick={removeEducation}>
            <XIcon size={18} className="mr-2" />
            ลบ
          </Button>
        )}
        <Button variant="outline" type="button" onClick={handleEducationSubmit}>
          <ArrowRightIcon size={18} className="mr-2" />
          ถัดไป
        </Button>
      </div>
    </div>
  );
}
