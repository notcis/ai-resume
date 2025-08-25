import { useResume } from "@/context/resume";

export default function ResumeCreateNav() {
  const { step, setStep } = useResume();

  return (
    <nav className="flex justify-center w-full py-4">
      <div className=" flex space-x-4">
        {[1, 2, 3, 4, 5].map((item) => (
          <button
            key={item}
            onClick={() => setStep(item)}
            disabled={step < item}
            className={`w-10 h-10 flex items-center justify-center rounded-full  hover:bg-primary hover:text-slate-200 ${
              step === item
                ? "bg-primary text-slate-200 dark:text-slate-800"
                : "bg-secondary text-gray-700 dark:text-gray-400"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </nav>
  );
}
