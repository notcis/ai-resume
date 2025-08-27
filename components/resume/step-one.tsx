import { useResume } from "@/context/resume";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function StepOne() {
  const { data: session } = useSession();
  const { resume, setResume } = useResume();

  // Handle form submission
  const handleSubmit = async () => {
    // Save the resume
    //await saveResume();
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Update resume state and local storage
    const { name, value } = e.target;
    // Update resume state and local storage
    setResume((prev) => {
      // Create a new resume object with the updated field
      const updateResume = { ...prev, [name]: value };
      // Save the updated resume to local storage
      localStorage.setItem("resume", JSON.stringify(updateResume));
      // Return the updated resume
      return updateResume;
    });
  };

  return (
    <div className="w-full lg:w-1/2 p-5 shadow-lg border-t-4 rounded-lg">
      <h2 className=" text-2xl font-bold mb-5">Personal Information</h2>

      <Input
        name="name"
        className="mb-3"
        onChange={handleChange}
        value={resume.name}
        placeholder="Enter your name"
        type="text"
        autoFocus
        required
      />

      <Input
        name="job"
        className="mb-3"
        onChange={(e) => setResume({ ...resume, job: e.target.value })}
        value={resume.job}
        placeholder="Enter your job title"
        type="text"
        required
      />
      <Input
        name="address"
        className="mb-3"
        onChange={handleChange}
        value={resume.address}
        placeholder="Enter your address"
        type="text"
        required
      />
      <Input
        name="phone"
        className="mb-3"
        onChange={handleChange}
        value={resume.phone}
        placeholder="Enter your phone number"
        type="number"
        required
      />
      <Input
        name="email"
        className="mb-3"
        onChange={handleChange}
        value={resume.email}
        placeholder="Enter your email"
        type="email"
        required
      />

      <div className="flex justify-end">
        {!session?.user?.id ? (
          <Button type="button" variant="link" asChild>
            <Link href="/sign-in">Sign in to save</Link>
          </Button>
        ) : (
          <Button type="button" onClick={handleSubmit}>
            Save
          </Button>
        )}
      </div>
    </div>
  );
}
