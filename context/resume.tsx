"use client";

import {
  getResumeFromDB,
  getUserResumeFromDB,
  saveResumeToDB,
  updateResumeFromDB,
} from "@/actions/resume.action";
import { Resume } from "@/lib/generated/prisma";
import { ResumeProps } from "@/lib/type";
import { useParams, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

// Context for managing resume state
type ResumeContextType = {
  resume: ResumeProps;
  setResume: React.Dispatch<React.SetStateAction<ResumeProps>>;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  saveResume: () => Promise<void>;
  resumes: Resume[];
  setResumes: React.Dispatch<React.SetStateAction<Resume[]>>;
  getUserResumes: () => Promise<void>;
  updateResume: () => Promise<void>;
};

// Create the context
const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

// Initial state for the resume
const initialState = {
  name: "",
  job: "",
  address: "",
  phone: "",
  email: "",
  themeColor: "",
  summary: "",
};

// Create the provider
export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { id } = useParams();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [resume, setResume] = useState<any>(initialState);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [step, setStep] = useState<number>(1);

  // Load resume from local storage
  useEffect(() => {
    const storedResume = localStorage.getItem("resume");
    if (storedResume) {
      setResume(JSON.parse(storedResume));
    }
  }, []);

  // Get user resumes
  useEffect(() => {
    getUserResumes();
  }, []);

  // Get resume by id
  useEffect(() => {
    if (id) {
      getResume(id as string);
    }
  }, [id]);

  // Save resume
  const saveResume = async () => {
    const data = await saveResumeToDB(resume);

    if (!data.success) {
      toast.error("❌ Failed to save resume. Please try again.");
      return;
    }

    setResume(data.resume);
    localStorage.removeItem("resume");
    setStep(2);
    toast.success("🎉 Resume saved. Keep building!");
    router.push(`/dashboard/resume/edit/${data.resume?.id}`);
  };

  // Get user resumes
  const getUserResumes = async () => {
    const data = await getUserResumeFromDB();

    if (!data.success) {
      toast.error(
        data.message || "❌ Failed to load resumes. Please try again."
      );
      return;
    }
    setResumes(data.resume as Resume[]);
  };

  // Get resume by id
  const getResume = async (id: string) => {
    const data = await getResumeFromDB(id);
    if (!data.success) {
      toast.error(
        data.message || "❌ Failed to load resume. Please try again."
      );
      return;
    }
    setResume(data.resume);
  };

  const updateResume = async () => {
    const data = await updateResumeFromDB(resume, id as string);
    if (!data.success) {
      toast.error(
        data.message || "❌ Failed to update resume. Please try again."
      );
      return;
    }
    setResume(data.resume);
    toast.success("✅ Resume updated successfully!, keep building!");
  };

  // Create the provider
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
        updateResume,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

// Custom hook to use the resume context
export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
};
