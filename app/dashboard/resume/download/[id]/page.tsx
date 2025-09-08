"use client";

import ResumeCard from "@/components/cards/resume-card";
import { Button } from "@/components/ui/button";
import { useResume } from "@/context/resume";
import { DownloadIcon, PrinterIcon, ShareIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function DownloadPage() {
  const params = useParams();
  const id = params.id as string;

  const { resumes } = useResume();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [currentResume, setCurrentResume] = useState<any | null>(null);

  useEffect(() => {
    if (id && resumes) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const foundResume = resumes?.find((res: any) => res.id === id);
      setCurrentResume(foundResume || null);
    }
  }, [id, resumes]);

  const printResume = () => {
    if (typeof window !== "undefined") {
      const newWindow = window.open(
        `/resume/${currentResume?.id}`,
        "_blank"
      ) as Window;

      newWindow.onload = () => {
        setTimeout(() => {
          newWindow.print();
        }, 300);
      };
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen mx-5 my-20 overflow-auto">
      <div className=" text-center w-full md:w-1/3">
        <h2 className="font-bold text-lg">เรซูเม่ของคุณพร้อมแล้ว!</h2>
        <p>คุณสามารถดาวน์โหลด พิมพ์ หรือแชร์เรซูเม่ของคุณได้แล้ว</p>
        <div className="flex justify-between my-20">
          <div className=" flex flex-col items-center">
            <DownloadIcon size={48} />
            <Button onClick={printResume} className="my-2">
              ดาวน์โหลด
            </Button>
          </div>
          <div className=" flex flex-col items-center">
            <PrinterIcon size={48} />
            <Button onClick={printResume} className="my-2">
              พิมพ์
            </Button>
          </div>
          <div className=" flex flex-col items-center">
            <ShareIcon size={48} />
            <Button
              onClick={() => {
                navigator.clipboard.writeText(
                  window.location.origin + `/resume/${currentResume?.id}`
                );
                toast.success("Link copied to clipboard!");
              }}
              className="my-2"
            >
              แชร์
            </Button>
          </div>
        </div>
        {currentResume ? <ResumeCard resume={currentResume} /> : null}
        <div className="mb-10"></div>
      </div>
    </div>
  );
}
