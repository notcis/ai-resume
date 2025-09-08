import { useResume } from "@/context/resume";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function StepOneCreate() {
  const { data: session } = useSession();
  const { resume, setResume, saveResume } = useResume();

  // Handle form submission
  const handleSubmit = async () => {
    await saveResume();
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setResume((prev: any) => {
      const updateResume = { ...prev, [name]: value };
      localStorage.setItem("resume", JSON.stringify(updateResume));
      return updateResume;
    });
  };

  return (
    <div className="w-full p-5 shadow-lg border-t-4 rounded-lg">
      <h2 className=" text-2xl font-bold mb-5">ข้อมูลส่วนตัว</h2>

      <Input
        name="name"
        className="mb-3"
        onChange={handleChange}
        value={resume.name}
        placeholder="กรุณากรอกชื่อของคุณ"
        type="text"
        autoFocus
        required
      />

      <Input
        name="job"
        className="mb-3"
        onChange={(e) => setResume({ ...resume, job: e.target.value })}
        value={resume?.job}
        placeholder="กรุณากรอกตำแหน่งงานของคุณ"
        type="text"
        required
      />
      <Input
        name="address"
        className="mb-3"
        onChange={handleChange}
        value={resume?.address}
        placeholder="กรุณากรอกที่อยู่ของคุณ"
        type="text"
        required
      />
      <Input
        name="phone"
        className="mb-3"
        onChange={handleChange}
        value={resume?.phone}
        placeholder="กรุณากรอกหมายเลขโทรศัพท์ของคุณ"
        type="number"
        required
      />
      <Input
        name="email"
        className="mb-3"
        onChange={handleChange}
        value={resume?.email}
        placeholder="กรุณากรอกอีเมลของคุณ"
        type="email"
        required
      />

      <div className="flex justify-end">
        {!session?.user?.id ? (
          <Button type="button" variant="link" asChild>
            <Link href="/sign-in">เข้าสู่ระบบเพื่อบันทึก</Link>
          </Button>
        ) : (
          <Button type="button" onClick={handleSubmit}>
            บันทึก
          </Button>
        )}
      </div>
    </div>
  );
}
