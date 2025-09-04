"use client";

import {
  getResumeFromDB,
  getUserResumeFromDB,
  saveResumeToDB,
  updateExperienceToDB,
  updateResumeFromDB,
} from "@/actions/resume.action";
import { useParams, usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

// Context for managing resume state
type ResumeContextType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resume: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setResume: React.Dispatch<React.SetStateAction<any>>;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  saveResume: () => Promise<void>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resumes: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setResumes: React.Dispatch<React.SetStateAction<any[]>>;
  getUserResumes: () => Promise<void>;
  updateResume: () => Promise<void>;
  experienceList: (typeof experienceField)[];
  experienceLoading: boolean[];
  handleExperienceChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => void;
  handleExperienceSubmit: () => void;
  addExperience: () => void;
  removeExperience: () => void;
  handleExperienceGenerateWithAi: (index: number) => void;
};

// Create the context
const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

const experienceField = {
  title: "",
  company: "",
  address: "",
  startDate: "",
  endDate: "",
  summary: "",
};

// Initial state for the resume
const initialState = {
  name: "",
  job: "",
  address: "",
  phone: "",
  email: "",
  themeColor: "",
  summary: "",
  experience: [experienceField],
};

// Create the provider
export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { id } = useParams();
  const pathname = usePathname();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [resume, setResume] = useState<any>(initialState);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [resumes, setResumes] = useState<any[]>([]);
  const [step, setStep] = useState<number>(1);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [experienceList, setExperienceList] = useState<any[]>([
    experienceField,
  ]);

  const [experienceLoading, setExperienceLoading] = useState<boolean[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateExperience = async (experienceList: any[]) => {
    const data = await updateExperienceToDB({
      ...resume,
      experience: experienceList,
    });

    if (!data.success) {
      toast.error(
        data.message || "❌ Failed to update experience. Please try again."
      );
      return;
    }
    setResume(data.resume);
    toast.success("✅ Experience updated. keep building!");
  };

  useEffect(() => {
    if (pathname.includes("/resume/create")) {
      // Load resume from database

      setResume(initialState);
      setStep(1);
    }
  }, [pathname]);

  // Load resume from local storage
  /*   useEffect(() => {
    const storedResume = localStorage.getItem("resume");
    if (storedResume) {
      setResume(JSON.parse(storedResume));
    }
  }, []); */

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
    setResumes(data.resume || []);
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

  useEffect(() => {
    if (resume.experience) {
      setExperienceList(resume.experience);
    }
  }, [resume]);

  const handleExperienceChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    const newExperience = [...experienceList];
    const { name, value } = e.target;
    newExperience[index][name] = value;
    setExperienceList(newExperience);
  };

  const handleExperienceSubmit = () => {
    updateExperience(experienceList);
  };

  // Add new experience
  const addExperience = () => {
    const newExperience = {
      ...experienceField,
    };
    setExperienceList([...experienceList, newExperience]);
  };

  // Remove experience
  const removeExperience = () => {
    if (experienceList.length === 1) return;
    const newEntries = experienceList.slice(0, experienceList.length - 1);
    console.log("newEntries:", newEntries);

    setExperienceList(newEntries);
  };

  //
  const handleExperienceGenerateWithAi = (index: number) => {};

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
        handleExperienceChange,
        handleExperienceSubmit,
        addExperience,
        removeExperience,
        handleExperienceGenerateWithAi,
        experienceList,
        experienceLoading,
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
