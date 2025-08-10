import { useState, useEffect } from 'react'

interface ResumeData {
    personalInfo: {
        name: string
        email: string
        phone: string
        location: string
        linkedin: string
        website: string
    }
    summary: string
    experience: Array<{
        id: string
        company: string
        position: string
        duration: string
        description: string
    }>
    education: Array<{
        id: string
        institution: string
        degree: string
        duration: string
        gpa?: string
    }>
    skills: string[]
    projects: Array<{
        id: string
        name: string
        description: string
        technologies: string
    }>
}

interface ResumeEditorProps {
    onResumeChange: (resumeData: ResumeData) => void
    initialData?: ResumeData
}

const defaultResumeData: ResumeData = {
    personalInfo: {
        name: 'John Doe',
        email: 'john.doe@email.com',
        phone: '+1 (555) 123-4567',
        location: 'New York, NY',
        linkedin: 'linkedin.com/in/johndoe',
        website: 'johndoe.dev'
    },
    summary: 'Experienced software developer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies.',
    experience: [
        {
            id: '1',
            company: 'Tech Corp',
            position: 'Senior Software Engineer',
            duration: '2022 - Present',
            description: 'Led development of scalable web applications serving 100k+ users. Implemented microservices architecture reducing system latency by 40%.'
        }
    ],
    education: [
        {
            id: '1',
            institution: 'University of Technology',
            degree: 'Bachelor of Science in Computer Science',
            duration: '2018 - 2022',
            gpa: '3.8'
        }
    ],
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker'],
    projects: [
        {
            id: '1',
            name: 'E-commerce Platform',
            description: 'Built a full-stack e-commerce platform with React and Node.js',
            technologies: 'React, Node.js, MongoDB, Stripe'
        }
    ]
}

const ResumeEditor = ({ onResumeChange, initialData }: ResumeEditorProps) => {
    const [resumeData, setResumeData] = useState<ResumeData>(initialData || defaultResumeData)

    useEffect(() => {
        onResumeChange(resumeData)
    }, [resumeData, onResumeChange])

    const updatePersonalInfo = (field: keyof ResumeData['personalInfo'], value: string) => {
        setResumeData(prev => ({
            ...prev,
            personalInfo: { ...prev.personalInfo, [field]: value }
        }))
    }

    const updateSummary = (value: string) => {
        setResumeData(prev => ({ ...prev, summary: value }))
    }

    const addExperience = () => {
        const newExp = {
            id: Date.now().toString(),
            company: '',
            position: '',
            duration: '',
            description: ''
        }
        setResumeData(prev => ({
            ...prev,
            experience: [...prev.experience, newExp]
        }))
    }

    const updateExperience = (id: string, field: string, value: string) => {
        setResumeData(prev => ({
            ...prev,
            experience: prev.experience.map(exp =>
                exp.id === id ? { ...exp, [field]: value } : exp
            )
        }))
    }

    const removeExperience = (id: string) => {
        setResumeData(prev => ({
            ...prev,
            experience: prev.experience.filter(exp => exp.id !== id)
        }))
    }

    const updateSkills = (skills: string) => {
        setResumeData(prev => ({
            ...prev,
            skills: skills.split(',').map(s => s.trim()).filter(s => s)
        }))
    }

    return (
        <div className="h-full overflow-y-auto bg-black/40 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6">
            <h2 className="text-2xl font-semibold text-white mb-6">Edit Resume</h2>
            
            {/* Personal Information */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-cyan-400 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={resumeData.personalInfo.name}
                        onChange={(e) => updatePersonalInfo('name', e.target.value)}
                        className="bg-white/90 border border-gray-300 rounded-lg px-4 py-2 text-black placeholder-gray-500 focus:border-cyan-400 focus:outline-none"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={resumeData.personalInfo.email}
                        onChange={(e) => updatePersonalInfo('email', e.target.value)}
                        className="bg-white/90 border border-gray-300 rounded-lg px-4 py-2 text-black placeholder-gray-500 focus:border-cyan-400 focus:outline-none"
                    />
                    <input
                        type="text"
                        placeholder="Phone"
                        value={resumeData.personalInfo.phone}
                        onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                        className="bg-white/90 border border-gray-300 rounded-lg px-4 py-2 text-black placeholder-gray-500 focus:border-cyan-400 focus:outline-none"
                    />
                    <input
                        type="text"
                        placeholder="Location"
                        value={resumeData.personalInfo.location}
                        onChange={(e) => updatePersonalInfo('location', e.target.value)}
                        className="bg-white/90 border border-gray-300 rounded-lg px-4 py-2 text-black placeholder-gray-500 focus:border-cyan-400 focus:outline-none"
                    />
                    <input
                        type="text"
                        placeholder="LinkedIn"
                        value={resumeData.personalInfo.linkedin}
                        onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                        className="bg-white/90 border border-gray-300 rounded-lg px-4 py-2 text-black placeholder-gray-500 focus:border-cyan-400 focus:outline-none"
                    />
                    <input
                        type="text"
                        placeholder="Website"
                        value={resumeData.personalInfo.website}
                        onChange={(e) => updatePersonalInfo('website', e.target.value)}
                        className="bg-white/90 border border-gray-300 rounded-lg px-4 py-2 text-black placeholder-gray-500 focus:border-cyan-400 focus:outline-none"
                    />
                </div>
            </div>

            {/* Summary */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-cyan-400 mb-4">Professional Summary</h3>
                <textarea
                    placeholder="Write a brief professional summary..."
                    value={resumeData.summary}
                    onChange={(e) => updateSummary(e.target.value)}
                    rows={4}
                    className="w-full bg-white/90 border border-gray-300 rounded-lg px-4 py-2 text-black placeholder-gray-500 focus:border-cyan-400 focus:outline-none resize-none"
                />
            </div>

            {/* Experience */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-cyan-400">Experience</h3>
                    <button
                        onClick={addExperience}
                        className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                    >
                        Add Experience
                    </button>
                </div>
                {resumeData.experience.map((exp) => (
                    <div key={exp.id} className="bg-gray-800/30 rounded-lg p-4 mb-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <input
                                type="text"
                                placeholder="Company"
                                value={exp.company}
                                onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                                className="bg-white/90 border border-gray-300 rounded-lg px-3 py-2 text-black placeholder-gray-500 focus:border-cyan-400 focus:outline-none"
                            />
                            <input
                                type="text"
                                placeholder="Position"
                                value={exp.position}
                                onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                                className="bg-white/90 border border-gray-300 rounded-lg px-3 py-2 text-black placeholder-gray-500 focus:border-cyan-400 focus:outline-none"
                            />
                        </div>
                        <input
                            type="text"
                            placeholder="Duration (e.g., 2022 - Present)"
                            value={exp.duration}
                            onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)}
                            className="w-full bg-white/90 border border-gray-300 rounded-lg px-3 py-2 text-black placeholder-gray-500 focus:border-cyan-400 focus:outline-none mb-4"
                        />
                        <textarea
                            placeholder="Job description and achievements..."
                            value={exp.description}
                            onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                            rows={3}
                            className="w-full bg-white/90 border border-gray-300 rounded-lg px-3 py-2 text-black placeholder-gray-500 focus:border-cyan-400 focus:outline-none resize-none mb-2"
                        />
                        <button
                            onClick={() => removeExperience(exp.id)}
                            className="text-red-400 hover:text-red-300 text-sm transition-colors"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>

            {/* Skills */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-cyan-400 mb-4">Skills</h3>
                <input
                    type="text"
                    placeholder="Enter skills separated by commas (e.g., JavaScript, React, Node.js)"
                    value={resumeData.skills.join(', ')}
                    onChange={(e) => updateSkills(e.target.value)}
                    className="w-full bg-white/90 border border-gray-300 rounded-lg px-4 py-2 text-black placeholder-gray-500 focus:border-cyan-400 focus:outline-none"
                />
            </div>
        </div>
    )
}

export default ResumeEditor