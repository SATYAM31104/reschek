import ScoreGauge from "~/components/ScoreGauge";

interface Feedback {
    overallScore: number;
    toneAndStyle: { score: number };
    content: { score: number };
    structure: { score: number };
    skills: { score: number };
    [key: string]: any;
}

const ScoreBadge = ({ score }: { score: number }) => {
    const badgeColor = 
        score > 69 
            ? "bg-badge-green" 
            : score > 49 
            ? "bg-badge-yellow" 
            : "bg-badge-red";
    
    const badgeText = 
        score > 69 ? "Strong" : score > 49 ? "Good Start" : "Needs Work";

    return (
        <div className={`score-badge ${badgeColor}`}>
            <p className="text-xs !text-black font-semibold">{badgeText}</p>
        </div>
    );
};

const Category = ({ title, score }: { title: string; score: number }) => {
    return (
        <div className="resume-summary">
            <div className="category">
                <div className="flex flex-row gap-2 items-center justify-center">
                    <p className="text-2xl !text-black">{title}</p>
                    <ScoreBadge score={score} />
                </div>
                <p className="text-2xl">
                    <span className="!text-black">{score}</span><span className="!text-black">/100</span>
                </p>
            </div>
        </div>
    );
};

const Summary = ({ feedback }: { feedback: Feedback }) => {
    return (
        <div className="bg-white rounded-2xl shadow-md w-full">
            <div className="flex flex-row max-sm:flex-col items-center p-4 gap-8">
                <ScoreGauge score={feedback.overallScore} />
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold !text-black">Your Resume Score</h2>
                    <p className="text-sm !text-black">
                        This score is calculated based on the variables listed below.
                    </p>
                </div>
            </div>
            <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
            <Category title="Content" score={feedback.content.score} />
            <Category title="Structure" score={feedback.structure.score} />
            <Category title="Skills" score={feedback.skills.score} />
        </div>
    );
};
export default Summary