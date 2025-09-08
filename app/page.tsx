import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle,
  Sparkles,
  Download,
  Printer,
  Share2,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Background Image */}
      <div
        className="relative bg-cover bg-center"
        style={{
          backgroundImage: 'url("/bg.jpg")',
          height: "50vh",
        }}
      >
        {/* Optional: Add an overlay to darken the image */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#010818] z-0"></div>

        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center">
            <h1 className="text-white text-5xl font-bold mb-6">
              สร้างเรซูเม่ AI ฟรีของคุณวันนี้
            </h1>
            <p className="text-white mb-5 max-w-2xl mx-auto">
              สร้างเรซูเม่ที่ดูเป็นมืออาชีพและปรับแต่งได้อย่างง่ายดายด้วย
              เครื่องมือสร้างเรซูเม่ AI ฟรีของเรา
            </p>
            <Link href="/resume/create">
              <Button
                size="lg"
                className="text-lg px-8 py-4 bg-blue-600 hover:bg-blue-700 cursor-pointer"
              >
                เริ่มต้นใช้งานฟรี <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="bg-white dark:bg-gray-800 pt-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-20">
            ทำไมต้องใช้ AI Resume Builder ของเรา?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Sparkles className="w-12 h-12 text-blue-500" />}
              title="เนื้อหาที่ขับเคลื่อนด้วย AI"
              description="AI ของเราสร้างเนื้อหาที่ปรับแต่งได้ตามประสบการณ์ของคุณและงานที่คุณสมัคร ทำให้ใช้งานได้ง่ายมาก"
            />
            <FeatureCard
              icon={<CheckCircle className="w-12 h-12 text-green-500" />}
              title="สร้างเรซูเม่ไม่จำกัด"
              description="สร้างเรซูเม่ได้มากเท่าที่คุณต้องการฟรี เหมาะสำหรับการสมัครงานหรืออุตสาหกรรมหลายแห่ง"
            />
            <FeatureCard
              icon={<ArrowRight className="w-12 h-12 text-purple-500" />}
              title="การปรับแต่งที่ง่าย"
              description="ปรับแต่งเรซูเม่ของคุณได้อย่างง่ายดายด้วยอินเทอร์เฟซที่ใช้งานง่ายของเรา มันง่ายมาก ใครๆ ก็สามารถสร้างเรซูเม่ที่เป็นมืออาชีพได้ในไม่กี่นาที"
            />
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-blue-600 dark:bg-blue-800 text-white py-20 mt-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            พร้อมที่จะสร้างเรซูเม่ AI ฟรีของคุณแล้วหรือยัง?
          </h2>
          <div className="flex justify-center space-x-8 mb-8">
            <div className="flex flex-col items-center">
              <Download className="w-12 h-12 mb-2" />
              <span>ดาวน์โหลด</span>
            </div>
            <div className="flex flex-col items-center">
              <Printer className="w-12 h-12 mb-2" />
              <span>พิมพ์</span>
            </div>
            <div className="flex flex-col items-center">
              <Share2 className="w-12 h-12 mb-2" />
              <span>แชร์</span>
            </div>
          </div>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            สร้างเรซูเม่ที่ดูเป็นมืออาชีพและปรับแต่งได้อย่างง่ายดายด้วยเครื่องมือสร้างเรซูเม่
            AI
          </p>
          <Link href="/resume/create">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
              สร้างเรซูเม่ AI ฟรีของคุณตอนนี้ <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 text-center">
        {description}
      </p>
    </div>
  );
}
