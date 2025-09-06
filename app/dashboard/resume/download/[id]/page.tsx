"use client";

import ResumeCard from "@/components/cards/resume-card";
import { Button } from "@/components/ui/button";
import { useResume } from "@/context/resume";
import { DownloadIcon, PrinterIcon, ShareIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function DownloadPage() {
  const params = useParams();
  const id = params.id as string;

  const { resumes } = useResume();

  const [currentResume, setCurrentResume] = useState(null);

  useEffect(() => {
    if (id && resumes) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const foundResume = resumes?.find((res: any) => res.id === id);
      setCurrentResume(foundResume || null);
    }
  }, [id, resumes]);
  return (
    <div className="flex justify-center items-center min-h-screen mx-5 my-20 overflow-auto">
      <div className=" text-center w-full md:w-1/3">
        <h2 className="font-bold text-lg">
          💥 Congratulations Your AI Resume is Ready!
        </h2>
        <p>you can now download, print, or share your resume.</p>
        <div className="flex justify-between my-20">
          <div className=" flex flex-col items-center">
            <DownloadIcon size={48} />
            <Button className="my-2">Download</Button>
          </div>
          <div className=" flex flex-col items-center">
            <PrinterIcon size={48} />
            <Button className="my-2">Print</Button>
          </div>
          <div className=" flex flex-col items-center">
            <ShareIcon size={48} />
            <Button className="my-2">Share</Button>
          </div>
        </div>
        {currentResume ? <ResumeCard resume={currentResume} /> : null}
        <div className="mb-10"></div>
      </div>
    </div>
  );
}
