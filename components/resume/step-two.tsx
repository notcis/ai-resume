import { useResume } from "@/context/resume";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

export default function StepTwo() {
  const { resume, setResume, updateResume, setStep } = useResume();

  const handleSubmit = async () => {
    await updateResume();
    setStep(3);
  };
  return (
    <div className="w-full p-5 shadow-lg border-t-4 rounded-lg">
      <h2 className=" text-2xl font-bold mb-5">Summary</h2>
      <Textarea
        onChange={(e) => setResume({ ...resume, summary: e.target.value })}
        value={resume.summary}
        className="mb-3"
        placeholder="Write a summary about yourself"
        rows={10}
        required
      />
      <div className="flex justify-end">
        <Button onClick={handleSubmit}>Update</Button>
      </div>
    </div>
  );
}
