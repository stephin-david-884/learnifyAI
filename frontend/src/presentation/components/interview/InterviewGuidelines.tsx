import React from "react";
import { CheckCircle2 } from "lucide-react";

const guidelines = [

    "Speak clearly and naturally.",
    "Answer one question at a time.",
    "You may re-record your answer before moving to the next question.",
    "The AI evaluates your understanding, not exact wording.",
    "A camera is not required for this interview.",
    "Find a quiet environment with minimal background noise.",
    "The interview uses one overall timer and will auto-submit when time expires.",

];

const InterviewGuidelines: React.FC = () => {

    return (

        <div className="rounded-3xl border border-slate-200 bg-white p-6">

            <h2 className="text-xl font-bold text-slate-900">

                Interview Guidelines

            </h2>

            <p className="mt-2 text-sm text-slate-500">

                Please read these instructions before starting.

            </p>

            <div className="mt-6 space-y-4">

                {guidelines.map((item) => (

                    <div
                        key={item}
                        className="flex items-start gap-3"
                    >

                        <CheckCircle2
                            size={20}
                            className="mt-0.5 shrink-0 text-emerald-500"
                        />

                        <p className="text-slate-700">

                            {item}

                        </p>

                    </div>

                ))}

            </div>

        </div>

    );

};

export default InterviewGuidelines;