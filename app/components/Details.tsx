import { cn } from "~/lib/utils";
import {
    Accordion,
    AccordionContent,
    AccordionHeader,
    AccordionItem,
} from "~/components/Accordion";

interface Feedback {
    toneAndStyle: {
        score: number;
        tips: { type: "good" | "improve"; tip: string; explanation: string }[];
    };
    content: {
        score: number;
        tips: { type: "good" | "improve"; tip: string; explanation: string }[];
    };
    structure: {
        score: number;
        tips: { type: "good" | "improve"; tip: string; explanation: string }[];
    };
    skills: {
        score: number;
        tips: { type: "good" | "improve"; tip: string; explanation: string }[];
    };
    [key: string]: any;
}

const ScoreBadge = ({ score }: { score: number }) => {
    return (
        <div
            className={cn(
                "flex flex-row gap-1 items-center px-2 py-0.5 rounded-[96px]",
                score > 69
                    ? "bg-badge-green"
                    : score > 39
                        ? "bg-badge-yellow"
                        : "bg-badge-red"
            )}
        >
            <img
                src={score > 69 ? "/icons/check.svg" : "/icons/warning.svg"}
                alt="score"
                className="size-4"
            />
            <p
                className={cn(
                    "text-sm font-medium",
                    score > 69
                        ? "text-badge-green-text"
                        : score > 39
                            ? "text-badge-yellow-text"
                            : "text-badge-red-text"
                )}
            >
                {score}/100
            </p>
        </div>
    );
};

const CategoryHeader = ({
    title,
    categoryScore,
}: {
    title: string;
    categoryScore: number;
}) => {
    return (
        <div className="flex flex-row gap-4 items-center py-2">
            <p className="text-2xl font-semibold !text-black">{title}</p>
            <ScoreBadge score={categoryScore} />
        </div>
    );
};

const CategoryContent = ({
    categoryData,
}: {
    categoryData: any;
}) => {
    // Handle different data structures from AI feedback
    const tips = categoryData.tips || [];
    const analysis = categoryData.analysis || '';
    const summary = categoryData.summary || '';
    const strengths = categoryData.strengths || [];
    const weaknesses = categoryData.weaknesses || [];
    const recommendations = categoryData.recommendations || [];

    return (
        <div className="flex flex-col gap-4 w-full">
            {/* AI Analysis Summary */}
            {(analysis || summary) && (
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h5 className="font-semibold !text-black mb-2 flex items-center gap-2">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        AI Analysis
                    </h5>
                    <p className="!text-black text-sm leading-relaxed whitespace-pre-wrap">
                        {analysis || summary}
                    </p>
                </div>
            )}

            {/* Strengths */}
            {strengths.length > 0 && (
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <h5 className="font-semibold !text-black mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Strengths Identified
                    </h5>
                    <div className="space-y-2">
                        {strengths.map((strength: string, index: number) => (
                            <div key={index} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                                <p className="!text-black text-sm">{strength}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Areas for Improvement */}
            {weaknesses.length > 0 && (
                <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                    <h5 className="font-semibold !text-black mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        Areas for Improvement
                    </h5>
                    <div className="space-y-2">
                        {weaknesses.map((weakness: string, index: number) => (
                            <div key={index} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                                <p className="!text-black text-sm">{weakness}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Recommendations */}
            {recommendations.length > 0 && (
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                    <h5 className="font-semibold !text-black mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        AI Recommendations
                    </h5>
                    <div className="space-y-3">
                        {recommendations.map((rec: string, index: number) => (
                            <div key={index} className="bg-white rounded p-3 border border-purple-200">
                                <p className="!text-black text-sm leading-relaxed">
                                    <span className="font-medium">#{index + 1}:</span> {rec}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Original Tips Structure (if available) */}
            {tips.length > 0 && (
                <div className="space-y-4">
                    <h5 className="font-semibold !text-black mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Specific Tips
                    </h5>

                    {/* Tips Summary */}
                    <div className="bg-gray-50 w-full rounded-lg px-5 py-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {tips.map((tip: any, index: number) => (
                            <div className="flex flex-row gap-2 items-center" key={index}>
                                <img
                                    src={
                                        tip.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"
                                    }
                                    alt="score"
                                    className="size-5"
                                />
                                <p className="text-sm !text-black">{tip.tip || tip}</p>
                            </div>
                        ))}
                    </div>

                    {/* Detailed Tips */}
                    <div className="flex flex-col gap-4 w-full">
                        {tips.map((tip: any, index: number) => (
                            <div
                                key={index + (tip.tip || tip)}
                                className={cn(
                                    "flex flex-col gap-2 rounded-2xl p-4",
                                    tip.type === "good"
                                        ? "bg-green-50 border border-green-200"
                                        : "bg-yellow-50 border border-yellow-200"
                                )}
                            >
                                <div className="flex flex-row gap-2 items-center">
                                    <img
                                        src={
                                            tip.type === "good"
                                                ? "/icons/check.svg"
                                                : "/icons/warning.svg"
                                        }
                                        alt="score"
                                        className="size-5"
                                    />
                                    <p className="text-lg font-semibold !text-black">{tip.tip || tip}</p>
                                </div>
                                {tip.explanation && (
                                    <p className="!text-black text-sm leading-relaxed">{tip.explanation}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Fallback for any other data */}
            {!analysis && !summary && !strengths.length && !weaknesses.length && !recommendations.length && !tips.length && (
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <p className="!text-black text-sm text-center">
                        No detailed feedback available for this section yet.
                    </p>
                </div>
            )}
        </div>
    );
};

const Details = ({ feedback }: { feedback: Feedback }) => {
    return (
        <div className="flex flex-col gap-4 w-full">
            <Accordion className="space-y-4">
                <AccordionItem id="tone-style" className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <AccordionHeader itemId="tone-style" className="px-6 py-4 hover:bg-gray-50 rounded-t-xl transition-colors duration-200">
                        <CategoryHeader
                            title="Tone & Style"
                            categoryScore={feedback.toneAndStyle.score}
                        />
                    </AccordionHeader>
                    <AccordionContent itemId="tone-style" className="px-6 pb-6">
                        <CategoryContent categoryData={feedback.toneAndStyle} />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem id="content" className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <AccordionHeader itemId="content" className="px-6 py-4 hover:bg-gray-50 rounded-t-xl transition-colors duration-200">
                        <CategoryHeader
                            title="Content"
                            categoryScore={feedback.content?.score || 0}
                        />
                    </AccordionHeader>
                    <AccordionContent itemId="content" className="px-6 pb-6">
                        <CategoryContent categoryData={feedback.content} />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem id="structure" className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <AccordionHeader itemId="structure" className="px-6 py-4 hover:bg-gray-50 rounded-t-xl transition-colors duration-200">
                        <CategoryHeader
                            title="Structure"
                            categoryScore={feedback.structure?.score || 0}
                        />
                    </AccordionHeader>
                    <AccordionContent itemId="structure" className="px-6 pb-6">
                        <CategoryContent categoryData={feedback.structure} />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem id="skills" className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <AccordionHeader itemId="skills" className="px-6 py-4 hover:bg-gray-50 rounded-t-xl transition-colors duration-200">
                        <CategoryHeader
                            title="Skills"
                            categoryScore={feedback.skills?.score || 0}
                        />
                    </AccordionHeader>
                    <AccordionContent itemId="skills" className="px-6 pb-6">
                        <CategoryContent categoryData={feedback.skills} />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default Details;