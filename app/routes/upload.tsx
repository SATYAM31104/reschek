import { type FormEvent } from 'react'
import Navbar from '~/components/Navbar'
import DotGrid from '~/components/DotGrid'
import { useState } from 'react'
import FileUploader from '~/components/FileUploader'

const Upload = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const handleFileSelect = (file: File | null) => {
        setFile(file);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget.closest('form');
        if (!form) return;
        const formData = new FormData(form);
        const formCompanyName = formData.get('company-name');
        const formJobTitle = formData.get('job-title');
        const formJobDescription = formData.get('job-description');
        
        // Process the form data here
        console.log('Form submitted:', {
            companyName: formCompanyName,
            jobTitle: formJobTitle,
            jobDescription: formJobDescription,
            file
        });
    }
    

    return (
        <main className="relative min-h-screen">
            {/* Background DotGrid - Same as home page */}
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
                <section className='main-section'>
                    <div className="page-heading py-16">
                        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Smart Feedback on Your Resumes
                        </h1>
                        {isProcessing ? (
                            <>
                                <h2>{statusText}</h2>
                                <img src='/images/resume-scan.gif' className='w-full' alt="Resume scanning"></img>
                            </>
                        ) : ( //if we are not processing this will be shwoed
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 via-green-400 to-blue-500 bg-clip-text text-transparent drop-shadow-2xl animate-pulse">
                                Drop Your Resume For
                                <span className="block text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent font-extrabold mt-2">
                                    ATS Score
                                </span>
                            </h2>
                        )}
                        {!isProcessing && (
                            <form id="upload-form" onSubmit={handleSubmit} className='flex flex-col gap-4 mt-8'>
                                <div className='form-div'>
                                    <label htmlFor="company-name">Company Name</label>
                                    <input
                                        type='text'
                                        name='company-name'
                                        placeholder='Company Name'
                                        id="company-name"
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                        className="w-full p-3 rounded-lg bg-gray-800/80 border border-gray-600 text-black placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
                                    />
                                </div>
                                <div className='form-div'>
                                    <label htmlFor="job-title">Job Title</label>
                                    <input
                                        type='text'
                                        name='job-title'
                                        placeholder='Job Title'
                                        id="job-title"
                                        value={jobTitle}
                                        onChange={(e) => setJobTitle(e.target.value)}
                                        className="w-full p-3 rounded-lg bg-gray-800/80 border border-gray-600 text-black placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
                                    />
                                </div>
                                <div className='form-div'>
                                    <label htmlFor="job-description">Job description</label>
                                    <textarea
                                        rows={5}
                                        name='job-description'
                                        placeholder='job description'
                                        id="job-description"
                                        value={jobDescription}
                                        onChange={(e) => setJobDescription(e.target.value)}
                                        className="w-full p-3 rounded-lg bg-gray-800/80 border border-gray-600 text-black placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
                                    />
                                </div>

                                <div className='form-div'>
                                    <label htmlFor="uploader">Upload Resume</label>
                                    <FileUploader onFileSelect={handleFileSelect}/>
                                    {file && (
                                        <p className="text-green-400 text-sm mt-2">
                                            Selected: {file.name}
                                        </p>
                                    )}
                                </div>
                                <button 
                                    type="submit"
                                    className='primary-button w-full mt-6'
                                    disabled={!file || !companyName || !jobTitle}
                                >
                                    Analyze Resume
                                </button>
                            </form>)}
                    </div>
                </section>
            </div>
        </main>
    )
}
export default Upload
