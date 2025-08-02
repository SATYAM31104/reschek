import { resumes } from "../../constants";
import type { Route } from "./+types/home";
import DotGrid from "~/components/DotGrid";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import TextPressure from "~/components/TextPressure";
import TextType from "~/components/TextType";

export function meta({}: Route.MetaArgs) {
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
          dotSize={3}
          gap={32}
          baseColor="#1e293b"
          activeColor="#06ffa5"
          proximity={140}
          speedTrigger={60}
          shockRadius={250}
          shockStrength={4}
        />
      </div>

      {/* Your content goes here */}
      <div className="relative z-10">
        <Navbar />
        <section className="main-section">
          <div className="page-heading">
            <div style={{ position: 'relative', height: '100px', width: '100%', maxWidth: '1200px', marginBottom: '1rem' }}>
              <TextPressure
                text="RESCHECK"
                flex={true}
                alpha={false}
                stroke={true}
                width={true}
                weight={true}
                italic={true}
                textColor="#06ffa5"
                strokeColor="#00d4ff"
                minFontSize={80}
              />
            </div>
            <TextType
              as="p"
              className="text-gray-300 text-xl"
              text="Track Your Applications and Get Smart Feedback for Your Resume"
              typingSpeed={80}
              initialDelay={1000}
              showCursor={true}
              cursorCharacter="|"
              cursorClassName="text-cyan-400"
              loop={false}
              startOnVisible={true}
            />
          </div>
        </section>
        {resumes.length > 0 && (
            <div className="resumes-section">
        {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
        ))}
            </div>
        )}
      </div>
    </main>
  );
}