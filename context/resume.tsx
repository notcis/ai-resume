"use client";

import { createContext, useContext, useState } from "react";

type ResumeContextType = {
  resume: typeof initialState;
  setResume: React.Dispatch<React.SetStateAction<typeof initialState>>;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
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
  const [resume, setResume] = useState<typeof initialState>(initialState);
  const [step, setStep] = useState<number>(1);

  return (
    <ResumeContext.Provider value={{ resume, setResume, step, setStep }}>
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
