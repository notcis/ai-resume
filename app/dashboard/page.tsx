"use client";

import SkeletonCard from "@/components/cards/skeleton-card";
import { useResume } from "@/context/resume";

export default function DashboardPage() {
  const { resumes } = useResume();

  if (!resumes.length) {
    return (
      <div>
        <p className="text-center my-5">Loading...</p>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-5 px-5">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    );
  }

  return (
    <div>
      <pre>{JSON.stringify(resumes, null, 2)}</pre>
    </div>
  );
}
