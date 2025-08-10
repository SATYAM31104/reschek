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

interface ResumePreviewProps {
    resumeData: ResumeData
}

const ResumePreview = ({ resumeData }: ResumePreviewProps) => {
    return (
        <div className="h-full overflow-y-auto bg-white rounded-2xl shadow-2xl">
            <div className="p-8 max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8 border-b-2 border-gray-200 pb-6">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        {resumeData.personalInfo.name || 'Your Name'}
                    </h1>
                    <div className="flex flex-wrap justify-center gap-4 text-gray-600">
                        {resumeData.personalInfo.email && (
                            <span>{resumeData.personalInfo.email}</span>
                        )}
                        {resumeData.personalInfo.phone && (
                            <span>•</span>
                        )}
                        {resumeData.personalInfo.phone && (
                            <span>{resumeData.personalInfo.phone}</span>
                        )}
                        {resumeData.personalInfo.location && (
                            <span>•</span>
                        )}
                        {resumeData.personalInfo.location && (
                            <span>{resumeData.personalInfo.location}</span>
                        )}
                    </div>
                    <div className="flex flex-wrap justify-center gap-4 text-blue-600 mt-2">
                        {resumeData.personalInfo.linkedin && (
                            <a href={`https://${resumeData.personalInfo.linkedin}`} className="hover:underline">
                                {resumeData.personalInfo.linkedin}
                            </a>
                        )}
                        {resumeData.personalInfo.website && resumeData.personalInfo.linkedin && (
                            <span>•</span>
                        )}
                        {resumeData.personalInfo.website && (
                            <a href={`https://${resumeData.personalInfo.website}`} className="hover:underline">
                                {resumeData.personalInfo.website}
                            </a>
                        )}
                    </div>
                </div>

                {/* Professional Summary */}
                {resumeData.summary && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
                            Professional Summary
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            {resumeData.summary}
                        </p>
                    </div>
                )}

                {/* Experience */}
                {resumeData.experience.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
                            Professional Experience
                        </h2>
                        {resumeData.experience.map((exp) => (
                            <div key={exp.id} className="mb-6">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900">
                                            {exp.position || 'Position Title'}
                                        </h3>
                                        <p className="text-lg text-blue-600 font-medium">
                                            {exp.company || 'Company Name'}
                                        </p>
                                    </div>
                                    <span className="text-gray-600 font-medium">
                                        {exp.duration || 'Duration'}
                                    </span>
                                </div>
                                {exp.description && (
                                    <p className="text-gray-700 leading-relaxed">
                                        {exp.description}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Education */}
                {resumeData.education.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
                            Education
                        </h2>
                        {resumeData.education.map((edu) => (
                            <div key={edu.id} className="mb-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {edu.degree || 'Degree'}
                                        </h3>
                                        <p className="text-blue-600 font-medium">
                                            {edu.institution || 'Institution'}
                                        </p>
                                        {edu.gpa && (
                                            <p className="text-gray-600">GPA: {edu.gpa}</p>
                                        )}
                                    </div>
                                    <span className="text-gray-600 font-medium">
                                        {edu.duration || 'Duration'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Skills */}
                {resumeData.skills.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
                            Technical Skills
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {resumeData.skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Projects */}
                {resumeData.projects.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
                            Projects
                        </h2>
                        {resumeData.projects.map((project) => (
                            <div key={project.id} className="mb-4">
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                    {project.name || 'Project Name'}
                                </h3>
                                {project.description && (
                                    <p className="text-gray-700 mb-2">{project.description}</p>
                                )}
                                {project.technologies && (
                                    <p className="text-blue-600 font-medium">
                                        Technologies: {project.technologies}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ResumePreview