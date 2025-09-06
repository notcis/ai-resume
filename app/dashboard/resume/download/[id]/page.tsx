import { Button } from "@/components/ui/button";
import { DownloadIcon, PrinterIcon, ShareIcon } from "lucide-react";

export default function DownloadPage() {
  return (
    <div className="flex justify-center items-center h-screen ">
      <div>
        <h2 className="font-bold text-lg">
          💥 Congratulations Your AI Resume is Ready!
        </h2>
        <p>you can now download, print, or share your resume.</p>
        <div className="flex justify-between my-20">
          <div className=" flex flex-col items-center">
            <DownloadIcon size={48} />
            <Button>Download</Button>
          </div>
          <div className=" flex flex-col items-center">
            <PrinterIcon size={48} />
            <Button>Print</Button>
          </div>
          <div className=" flex flex-col items-center">
            <ShareIcon size={48} />
            <Button>Share</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
