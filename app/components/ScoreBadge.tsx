interface ScoreBadgeProps {
    score: number;
}

const ScoreBadge = ({ score }: ScoreBadgeProps) => {
    const getBadgeStyle = (score: number) => {
        if (score > 70) {
            return 'bg-green-100 text-green-800 border-green-200';
        }
        if (score > 49) {
            return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        }
        return 'bg-red-100 text-red-800 border-red-200';
    };

    const getLabel = (score: number) => {
        if (score > 70) return 'Good';
        if (score > 49) return 'Fair';
        return 'Poor';
    };

    return (
        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getBadgeStyle(score)}`}>
            {getLabel(score)}
        </span>
    );
};

export default ScoreBadge;