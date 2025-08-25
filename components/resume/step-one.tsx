import { useResume } from "@/context/resume";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function StepOne() {
  const { resume, setResume } = useResume();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(resume);
  };
  return (
    <div className="w-full lg:w-1/2 p-5 shadow-lg border-t-4 rounded-lg">
      <h2 className=" text-2xl font-bold mb-5">Personal Information</h2>
      <form onSubmit={handleSubmit}>
        <Input
          className="mb-3"
          onChange={(e) => setResume({ ...resume, name: e.target.value })}
          value={resume.name}
          placeholder="Enter your name"
          type="text"
          autoFocus
          required
        />

        <Input
          className="mb-3"
          onChange={(e) => setResume({ ...resume, job: e.target.value })}
          value={resume.job}
          placeholder="Enter your job title"
          type="text"
          required
        />
        <Input
          className="mb-3"
          onChange={(e) => setResume({ ...resume, address: e.target.value })}
          value={resume.address}
          placeholder="Enter your address"
          type="text"
          required
        />
        <Input
          className="mb-3"
          onChange={(e) => setResume({ ...resume, phone: e.target.value })}
          value={resume.phone}
          placeholder="Enter your phone number"
          type="number"
          required
        />
        <Input
          className="mb-3"
          onChange={(e) => setResume({ ...resume, email: e.target.value })}
          value={resume.email}
          placeholder="Enter your email"
          type="email"
          required
        />
        <div className=" flex justify-end">
          <Button>Save</Button>
        </div>
      </form>
    </div>
  );
}
