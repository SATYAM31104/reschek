import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import DotGrid from "~/components/DotGrid";
import { usePuterStore } from "~/lib/puter";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Rescheck" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated]);

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);
      const resumes = (await kv.list('resume:*', true)) as KVItem[];
      const parsedResumes = resumes?.map((resume) => (
        JSON.parse(resume.value) as Resume
      ));
      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    };
    loadResumes();
  }, []);

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

      {/* Content */}
      <div className="relative z-10">
        <Navbar />

        <section className="main-section">
          <div className="page-heading py-16">
            <h1>Track Your Applications & Resume Ratings</h1>
            {!loadingResumes && resumes?.length === 0 ? (
              <h2>No resumes found. Upload your first resume to get feedback.</h2>
            ) : (
              <h2>Review your submissions and check AI-powered feedback.</h2>
            )}
          </div>

          {loadingResumes && (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="relative">
                {/* Outer rotating ring */}
                <div className="w-20 h-20 border-4 border-gray-300 border-t-cyan-400 rounded-full animate-spin"></div>

                {/* Inner pulsing dot */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                </div>

                {/* Orbiting dots */}
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s' }}>
                  <div className="absolute top-0 left-1/2 w-2 h-2 bg-green-400 rounded-full transform -translate-x-1/2 -translate-y-1"></div>
                </div>
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }}>
                  <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-blue-400 rounded-full transform -translate-x-1/2 translate-y-1"></div>
                </div>
              </div>

              {/* Loading text with typing effect */}
              <div className="mt-6 text-center">
                <h3 className="text-xl font-semibold text-white mb-2">Loading Your Resumes</h3>
                <div className="flex items-center justify-center space-x-1">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}

          {!loadingResumes && resumes.length > 0 && (
            <div className="resumes-section">
              {resumes.map((resume) => (
                <ResumeCard key={resume.id} resume={resume} />
              ))}
            </div>
          )}

          {!loadingResumes && resumes?.length === 0 && (
            <div className="flex flex-col items-center justify-center mt-10 gap-4">
              <Link to="/upload" className="primary-button w-fit text-xl font-semibold">
                Upload Resume
              </Link>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}