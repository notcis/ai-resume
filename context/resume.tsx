"use client";

import { getUserResumeFromDB, saveResumeToDB } from "@/actions/resume.action";
import { Resume } from "@/lib/generated/prisma";
import { ResumeProps } from "@/lib/type";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

type ResumeContextType = {
  resume: ResumeProps;
  setResume: React.Dispatch<React.SetStateAction<ResumeProps>>;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  saveResume: () => Promise<void>;
  resumes: Resume[];
  setResumes: React.Dispatch<React.SetStateAction<Resume[]>>;
  getUserResumes: () => Promise<void>;
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

const initialState = {
  name: "",
  job: "",
  address: "",
  phone: "",
  email: "",
  themeColor: "",
};

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [resume, setResume] = useState<any>(initialState);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [step, setStep] = useState<number>(1);

  // Load resume from local storage
  useEffect(() => {
    // Get resume from local storage
    const storedResume = localStorage.getItem("resume");
    // If resume exists in local storage, set it to state
    if (storedResume) {
      // Parse the JSON and set it to state
      setResume(JSON.parse(storedResume));
    }
  }, []);

  useEffect(() => {
    getUserResumes();
  }, []);

  const saveResume = async () => {
    const data = await saveResumeToDB(resume);

    if (!data.success) {
      toast.error("❌ Failed to save resume. Please try again.");
      return;
    }

    setResume(data.resume);
    setStep(2);
    toast.success("🎉 Resume saved. Keep building!");
    router.push(`/dashboard/resume/edit/${data.resume?.id}`);
  };

  const getUserResumes = async () => {
    const data = await getUserResumeFromDB();

    if (!data.success) {
      toast.error("❌ Failed to load resume. Please try again.");
      return;
    }
    setResumes(data.resume as Resume[]);
  };

  return (
    <ResumeContext.Provider
      value={{
        resume,
        setResume,
        step,
        setStep,
        saveResume,
        resumes,
        setResumes,
        getUserResumes,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
};
