"use client";

import { useResume } from "@/context/resume";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useTransition } from "react";
import { BrainIcon, Loader2Icon } from "lucide-react";
import toast from "react-hot-toast";
import { runAi } from "@/actions/gemeni-ai";

/* import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <div>Loading editor...</div>,
});
import "react-quill/dist/quill.snow.css"; */

export default function StepTwo() {
  const { resume, setResume, updateResume, setStep } = useResume();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async () => {
    await updateResume();
    setStep(3);
  };

  const handleGenerateWithAI = async () => {
    startTransition(async () => {
      if (!resume.job) {
        toast.error("Please fill in the job title.");
        return;
      }

      const response = await runAi(
        `Generate a resume summary 1-2 sentences for a person with the following details: ${resume.job} in plain text format`
      );
      setResume({ ...resume, summary: response || "" });
    });
  };
  return (
    <div className="w-full p-5 shadow-lg border-t-4 rounded-lg">
      <div className=" flex justify-between">
        <h2 className=" text-2xl font-bold mb-5">Summary</h2>
        <Button
          disabled={isPending}
          variant="destructive"
          onClick={handleGenerateWithAI}
        >
          {isPending ? (
            <Loader2Icon size={18} className="mr-2 animate-spin" />
          ) : (
            <BrainIcon size={18} className="mr-2" />
          )}{" "}
          Generate with AI
        </Button>
      </div>
      <Textarea
        onChange={(e) => setResume({ ...resume, summary: e.target.value })}
        value={resume.summary || ""}
        className="mb-3"
        placeholder="Write a summary about yourself"
        rows={10}
        required
      />
      {/* <ReactQuill
        theme="snow"
        value={resume.summary}
        onChange={(value) => setResume({ ...resume, summary: value })}
      /> */}
      <div className="flex justify-end mt-3">
        <Button onClick={handleSubmit}>Update</Button>
      </div>
    </div>
  );
}
