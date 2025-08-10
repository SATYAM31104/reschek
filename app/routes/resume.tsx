import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";
import Summary from "~/components/summary";
import ATS from "~/components/ATS";
import Details from "~/components/Details";
import DotGrid from "~/components/DotGrid";


export const meta = () => ([
    { title: 'Rescheck | Review ' },
    { name: 'description', content: 'Detailed overview of your resume' },
])

const Resume = () => {
    const { auth, isLoading, fs, kv } = usePuterStore();
    const { id } = useParams();
    const [imageUrl, setImageUrl] = useState('');
    const [resumeUrl, setResumeUrl] = useState('');
    const [feedback, setFeedback] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) navigate(`/auth?next=/resume/${id}`);
    }, [isLoading])

    useEffect(() => {
        const loadResume = async () => {
            const resume = await kv.get(`resume:${id}`);

            if (!resume) return;

            const data = JSON.parse(resume);

            const resumeBlob = await fs.read(data.resumePath);
            if (!resumeBlob) return;

            const pdfBlob = new Blob([resumeBlob], { type: 'application/pdf' });
            const resumeUrl = URL.createObjectURL(pdfBlob);
            setResumeUrl(resumeUrl);

            const imageBlob = await fs.read(data.imagePath);
            if (!imageBlob) return;
            const imageUrl = URL.createObjectURL(imageBlob);
            setImageUrl(imageUrl);

            setFeedback(data.feedback);
            console.log({ resumeUrl, imageUrl, feedback: data.feedback });
        }

        loadResume();
    }, [id]);

    return (
        <main className="relative min-h-screen !pt-0">
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
                <nav className="resume-nav">
                    <Link to="/" className="back-button">
                        <img src="/icons/back.svg" alt="logo" className="w-2.5 h-2.5" />
                        <span className="text-cyan-400 text-sm font-semibold">Back to Homepage</span>
                    </Link>
                </nav>
                <div className="flex flex-row w-full max-lg:flex-col-reverse min-h-screen">
                    <section className="feedback-section bg-[url('/images/bg-small.svg') bg-cover h-screen sticky top-0 flex items-center justify-center w-1/2 max-lg:w-full max-lg:h-[50vh]">
                        {imageUrl && resumeUrl && (
                            <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-wxl:h-fit w-fit">
                                <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                                    <img
                                        src={imageUrl}
                                        className="w-full h-full object-contain rounded-2xl"
                                        title="resume"
                                    />
                                </a>
                            </div>
                        )}
                    </section>
                    <section className="feedback-section w-1/2 max-lg:w-full min-h-screen overflow-y-auto p-6">
                        <h2 className="text-4xl !text-white font-bold mb-6">Resume Review</h2>
                        {feedback ? (
                            <div className="flex flex-col gap-8 animate-in fade-in duration-1000 pb-12">
                                <Summary feedback={feedback} />
                                <ATS 
                                    score={feedback.ATS?.score || 0} 
                                    suggestions={feedback.ATS?.tips || feedback.ATS?.suggestions || []} 
                                />
                                <Details feedback={feedback} />
                            </div>
                        ) : (
                            <div className="flex items-center justify-center min-h-[50vh]">
                                <img src="/images/resume-scan-2.gif" className="w-full max-w-md" />
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </main>
    )
}
export default Resume