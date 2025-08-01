import type { Route } from "./+types/home";
import DotGrid from "~/components/DotGrid";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Reschek" },
    { name: "description", content: "Analyze Your Resumes and Get Smart Feedback" },
  ];
}

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Background DotGrid */}
      <div className="fixed inset-0 z-0">
        <DotGrid
          dotSize={4}
          gap={24}
          baseColor="#374151"
          activeColor="#8e98ff"
          proximity={120}
          speedTrigger={80}
          shockRadius={200}
          shockStrength={3}
        />
      </div>

      {/* Your content goes here */}
      <div className="relative z-10">
        <section className="main-section">
          <div className="page-heading">
            <h1>Rescheck</h1>
            <p>Track Your Applications and Get Smart Feedback for Your Resume</p>
          </div>
        </section>
      </div>
    </main>
  );
}
