import ProfileCard from "./ProfileCard";

const ResumeCard = ({ resume: { id, companyName, jobTitle, feedback, imagePath } }: { resume: Resume }) => {
    const handleViewClick = () => {
        // Navigate to resume details
        window.location.href = `/resume/${id}`;
    };

    // Debug: Log the image path
    console.log(`ResumeCard ${id}: imagePath = ${imagePath}`);

    return (
        <ProfileCard
            avatarUrl={imagePath}
            name={companyName || "Resume"}
            title={jobTitle || "Job Application"}
            handle={companyName ? companyName.toLowerCase().replace(/\s+/g, '') : `resume-${id}`}
            status={`Score: ${feedback.overallScore}/100`}
            contactText="View Details"
            score={feedback.overallScore}
            onContactClick={handleViewClick}
            enableTilt={true}
            showUserInfo={true}
            className="resume-profile-card"
        />
    )
}

export default ResumeCard