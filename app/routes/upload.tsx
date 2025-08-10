import { type FormEvent, useState } from 'react'
import Navbar from "~/components/Navbar";
import DotGrid from "~/components/DotGrid";
import FileUploader from "~/components/FileUploader";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { convertPdfToImage } from "~/lib/Pdf2img";
import { generateUUID } from "~/lib/utils";
import { prepareInstructions, AIResponseFormat } from "../../constants";

const Upload = () => {
    const { fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleFileSelect = (file: File | null) => {
        setFile(file)
    }

    const handleAnalyze = async ({ companyName, jobTitle, jobDescription, file }: { companyName: string, jobTitle: string, jobDescription: string, file: File }) => {
        setIsProcessing(true);

        setStatusText('Uploading the file...');
        const uploadedFile = await fs.upload([file]);
        if (!uploadedFile) return setStatusText('Error: Failed to upload file');

        setStatusText('Converting to image...');
        const imageFile = await convertPdfToImage(file);
        if (!imageFile.file) return setStatusText('Error: Failed to convert PDF to image');

        setStatusText('Uploading the image...');
        const uploadedImage = await fs.upload([imageFile.file]);
        if (!uploadedImage) return setStatusText('Error: Failed to upload image');

        setStatusText('Preparing data...');
        const uuid = generateUUID();
        const data = {
            id: uuid,
            resumePath: uploadedFile.path,
            imagePath: uploadedImage.path,
            companyName, jobTitle, jobDescription,
            feedback: '',
        }
        await kv.set(`resume:${uuid}`, JSON.stringify(data));

        setStatusText('Analyzing with AI...');

        // List of models to try in order of preference
        const models = [
            'claude-3-5-sonnet-20241022',
            'claude-3-sonnet-20240229',
            'claude-3-haiku-20240307',
            'gpt-4o',
            'gpt-4o-mini',
            'gpt-4-turbo',
            'gpt-3.5-turbo'
        ];

        let feedback = null;
        let lastError = '';

        for (let i = 0; i < models.length; i++) {
            const model = models[i];
            try {
                setStatusText(`Analyzing... (${i + 1}/${models.length})`);

                // Create a timeout promise
                const timeoutPromise = new Promise((_, reject) => {
                    setTimeout(() => reject(new Error('Request timeout')), 60000); // 60 second timeout
                });

                // Try using ai.chat first (more reliable) with timeout
                const chatPromise = ai.chat(
                    [
                        {
                            role: "user",
                            content: [
                                {
                                    type: "file",
                                    puter_path: uploadedFile.path,
                                },
                                {
                                    type: "text",
                                    text: prepareInstructions({ jobTitle, jobDescription, AIResponseFormat }),
                                },
                            ],
                        },
                    ],
                    { model: model }
                );

                feedback = await Promise.race([chatPromise, timeoutPromise]);

                if (feedback) {
                    break;
                }
            } catch (error) {
                // Model failed, try next one
                lastError = error instanceof Error ? error.message : String(error);

                // Try ai.feedback as fallback for this model (with timeout)
                try {
                    const timeoutPromise = new Promise((_, reject) => {
                        setTimeout(() => reject(new Error('Fallback timeout')), 45000);
                    });

                    const feedbackPromise = ai.feedback(
                        uploadedFile.path,
                        prepareInstructions({ jobTitle, jobDescription, AIResponseFormat })
                    );

                    feedback = await Promise.race([feedbackPromise, timeoutPromise]);

                    if (feedback) {
                        break;
                    }
                } catch (fallbackError) {
                    // Fallback also failed, continue to next model
                }

                // If it's the last model, we'll handle the error below
                if (i === models.length - 1) {
                    break;
                }

                // Wait a bit before trying the next model
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        }

        if (!feedback) {
            return setStatusText(`Error: All AI models failed. Last error: ${lastError}`);
        }

        try {
            // Handle different response formats from AI
            let feedbackText = '';
            if (typeof feedback === 'string') {
                feedbackText = feedback;
            } else if (feedback && typeof feedback === 'object') {
                // Handle object response with message property
                if ('message' in feedback) {
                    const message = (feedback as any).message;
                    if (typeof message === 'string') {
                        feedbackText = message;
                    } else if (message && 'content' in message) {
                        if (Array.isArray(message.content)) {
                            feedbackText = message.content[0]?.text || '';
                        } else {
                            feedbackText = message.content || '';
                        }
                    }
                }
            }

            if (!feedbackText) {
                return setStatusText("Error: Empty AI response");
            }

            const parsedFeedback = JSON.parse(feedbackText);
            data.feedback = parsedFeedback;

            await kv.set(`resume:${uuid}`, JSON.stringify(data));
            setStatusText('Analysis complete!');
            console.dir(data);
            navigate(`/results/${uuid}`)

            // Comment out auto-redirect for debugging
            // navigate(`/results/${uuid}`);
        } catch (error) {
            console.error('Error parsing feedback:', error);
            setStatusText("Error: Failed to parse AI response");
        }
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget.closest('form');
        if (!form) return;
        const formData = new FormData(form);

        const companyName = formData.get('company-name') as string;
        const jobTitle = formData.get('job-title') as string;
        const jobDescription = formData.get('job-description') as string;

        if (!file) return;

        handleAnalyze({ companyName, jobTitle, jobDescription, file });
    }

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
                        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Smart Feedback on Your Resumes
                        </h1>
                        {isProcessing ? (
                            <div className="text-center">
                                <h2 className="text-2xl font-semibold text-white mb-6">{statusText}</h2>
                                <div className="max-w-md mx-auto">
                                    <img src="/images/resume-scan.gif" className="w-full" alt="Resume scanning" />
                                </div>
                            </div>
                        ) : (
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 via-green-400 to-blue-500 bg-clip-text text-transparent drop-shadow-2xl animate-pulse">
                                Drop Your Resume For
                                <span className="block text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent font-extrabold mt-2">
                                    ATS Score
                                </span>
                            </h2>
                        )}
                        {!isProcessing && (
                            <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
                                <div className="form-div">
                                    <label htmlFor="company-name">Company Name</label>
                                    <input
                                        type="text"
                                        name="company-name"
                                        placeholder="Company Name"
                                        id="company-name"
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                        className="w-full p-3 rounded-lg bg-gray-800/80 border border-gray-600 text-black placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
                                    />
                                </div>
                                <div className="form-div">
                                    <label htmlFor="job-title">Job Title</label>
                                    <input
                                        type="text"
                                        name="job-title"
                                        placeholder="Job Title"
                                        id="job-title"
                                        value={jobTitle}
                                        onChange={(e) => setJobTitle(e.target.value)}
                                        className="w-full p-3 rounded-lg bg-gray-800/80 border border-gray-600 text-black placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
                                    />
                                </div>
                                <div className="form-div">
                                    <label htmlFor="job-description">Job Description</label>
                                    <textarea
                                        rows={5}
                                        name="job-description"
                                        placeholder="Job Description"
                                        id="job-description"
                                        value={jobDescription}
                                        onChange={(e) => setJobDescription(e.target.value)}
                                        className="w-full p-3 rounded-lg bg-gray-800/80 border border-gray-600 text-black placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
                                    />
                                </div>

                                <div className="form-div">
                                    <label htmlFor="uploader">Upload Resume</label>
                                    <FileUploader onFileSelect={handleFileSelect} />
                                    {file && (
                                        <p className="text-green-400 text-sm mt-2">
                                            Selected: {file.name}
                                        </p>
                                    )}
                                </div>

                                <button
                                    className="primary-button w-full mt-6"
                                    type="submit"
                                    disabled={!file || !companyName || !jobTitle}
                                >
                                    Analyze Resume
                                </button>
                            </form>
                        )}
                    </div>
                </section>
            </div>
        </main>
    )
}
export default Upload