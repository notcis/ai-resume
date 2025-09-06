"use client";

import { runAi } from "@/actions/gemeni-ai";
import {
  deleteResumeFromDB,
  getResumeFromDB,
  getUserResumeFromDB,
  saveResumeToDB,
  updateEducationToDB,
  updateExperienceToDB,
  updateResumeFromDB,
  updateSkillToDB,
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
  educationList: (typeof educationField)[];
  handleEducationChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  handleEducationSubmit: () => void;
  addEducation: () => void;
  removeEducation: () => void;
  skillList: (typeof skillField)[];
  handleSkillChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  handleSkillSubmit: () => void;
  addSkill: () => void;
  removeSkill: () => void;
  deleteResume: (id: string) => Promise<void>;
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

const educationField = {
  name: "",
  address: "",
  qualification: "",
  year: "",
};

const skillField = {
  name: "",
  level: "",
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
  education: [educationField],
  skill: [skillField],
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
  const [educationList, setEducationList] = useState<any[]>([educationField]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [skillList, setSkillList] = useState<any[]>([skillField]);
  // Reset resume when creating a new one
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

  // Update resume
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

  // Sync experience list with resume experience
  useEffect(() => {
    if (resume.experience) {
      setExperienceList(resume.experience);
    }
  }, [resume]);

  // Update experience in the database
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

  // Handle experience change
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

  // Submit experience
  const handleExperienceSubmit = () => {
    updateExperience(experienceList);
    setStep(4);
  };

  // Add new experience
  const addExperience = () => {
    const newExperience = {
      ...experienceField,
    };
    setExperienceList([...experienceList, newExperience]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setResume((prevState: any) => ({
      ...prevState,
      experience: [...experienceList, newExperience],
    }));
  };

  // Remove experience
  const removeExperience = () => {
    if (experienceList.length === 1) return;
    const newEntries = experienceList.slice(0, experienceList.length - 1);

    setExperienceList(newEntries);
    updateExperience(newEntries);
  };

  // Handle experience generation with AI
  const handleExperienceGenerateWithAi = async (index: number) => {
    setExperienceLoading((prev) => ({ ...prev, [index]: true }));

    const selectedExperience = experienceList[index];

    if (!selectedExperience || !selectedExperience.title) {
      toast.error("Please enter a job title to generate experience.");
      setExperienceLoading((prev) => ({ ...prev, [index]: false }));
      return;
    }

    const jobTitle = selectedExperience.title;
    const jobSummary = selectedExperience.summary || "";

    try {
      const response = await runAi(
        `Generate a list of duties and responsibilities in 3-4 bullet points for a job title "${jobTitle}" ${jobSummary} not in markdown format.`
      );

      const updatedExperienceList = experienceList.slice();
      updatedExperienceList[index] = {
        ...selectedExperience,
        summary: response,
      };
      setExperienceList(updatedExperienceList);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setResume((prev: any) => ({
        ...prev,
        experience: updatedExperienceList,
      }));

      toast.success("✅ Experience generated. You can edit it further.");
      setExperienceLoading((prev) => ({ ...prev, [index]: false }));
    } catch (error) {
      console.error("AI generation error:", error);
      toast.error("❌ Failed to generate experience. Please try again.");
      setExperienceLoading((prev) => ({ ...prev, [index]: false }));
    }
  };

  // Sync education list with resume education
  useEffect(() => {
    if (resume.education) {
      setEducationList(resume.education);
    }
  }, [resume]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateEducation = async (educationList: any[]) => {
    const data = await updateEducationToDB({
      ...resume,
      education: educationList,
    });
    if (!data.success) {
      toast.error(
        data.message || "❌ Failed to update education. Please try again."
      );
      return;
    }
    setResume(data.resume);
    toast.success("✅ Education updated. keep building!");
  };

  // Handle education change
  const handleEducationChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newEducation = [...educationList];
    const { name, value } = e.target;
    newEducation[index][name] = value;
    setEducationList(newEducation);
  };

  // Submit education
  const handleEducationSubmit = () => {
    updateEducation(educationList);
    setStep(5);
  };

  // Add new education
  const addEducation = () => {
    const newEducation = {
      ...educationField,
    };
    setEducationList([...educationList, newEducation]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setResume((prevState: any) => ({
      ...prevState,
      education: [...educationList, newEducation],
    }));
  };

  // Remove education
  const removeEducation = async () => {
    if (educationList.length === 1) return;
    const newEntries = educationList.slice(0, educationList.length - 1);
    setEducationList(newEntries);
    await updateEducation(newEntries);
  };

  useEffect(() => {
    if (resume.skill) {
      setSkillList(resume.skill);
    }
  }, [resume]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateSkill = async (skillList: any[]) => {
    const invalidSkill = skillList.filter(
      (skill) => !skill.name || !skill.level
    );

    if (invalidSkill.length > 0) {
      toast.error("❌ Please fill in all skill fields before updating.");
      return;
    }

    const data = await updateSkillToDB({
      ...resume,
      skill: skillList,
    });
    if (!data.success) {
      toast.error(
        data.message || "❌ Failed to update skills. Please try again."
      );
      return;
    }
    setResume(data.resume);
    toast.success("✅ Skills updated. keep building!");
  };

  const handleSkillChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newSkillList = [...skillList];
    const { name, value } = e.target;
    newSkillList[index][name] = value;
    setSkillList(newSkillList);
  };

  const handleSkillSubmit = () => {
    updateSkill(skillList);
    router.push(`/dashboard/resume/download/${resume?.id}`);
  };

  const addSkill = () => {
    const newSkill = {
      ...skillField,
    };
    setSkillList([...skillList, newSkill]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setResume((prevState: any) => ({
      ...prevState,
      skill: [...skillList, newSkill],
    }));
  };
  const removeSkill = async () => {
    if (skillList.length === 1) return;
    const newEntries = skillList.slice(0, skillList.length - 1);
    setSkillList(newEntries);
    await updateSkill(newEntries);
  };

  const deleteResume = async (id: string) => {
    const data = await deleteResumeFromDB(id);
    if (!data.success) {
      toast.error(
        data.message || "❌ Failed to delete resume. Please try again."
      );
      return;
    }
    setResumes((prev) => prev.filter((resume) => resume.id !== id));
    toast.success(data.message || "✅ Resume deleted successfully!");
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
        handleExperienceChange,
        handleExperienceSubmit,
        addExperience,
        removeExperience,
        handleExperienceGenerateWithAi,
        experienceList,
        experienceLoading,
        educationList,
        handleEducationChange,
        handleEducationSubmit,
        addEducation,
        removeEducation,
        skillList,
        handleSkillChange,
        handleSkillSubmit,
        addSkill,
        removeSkill,
        deleteResume,
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
