import React from "react";
import { Mic } from "lucide-react";

type Props = {
    isSpeaking: boolean;
};

const AvatarFace: React.FC<Props> = ({
    isSpeaking,
}) => {

    return (

        <div className="flex flex-col items-center">

            <div
                className={`relative flex h-44 w-44 items-center justify-center rounded-full border-4 bg-gradient-to-br from-red-100 via-rose-50 to-white shadow-xl transition-all duration-500 animate-[float_3.5s_ease-in-out_infinite]

                ${isSpeaking
                        ? "border-red-500 shadow-[0_0_35px_rgba(239,68,68,0.35)] scale-105"
                        : "border-slate-200"
                    }`}
            >

                {isSpeaking && (
                    <>
                        <div className="absolute inset-0 rounded-full border-4 border-red-300 animate-ping opacity-30" />
                        <div className="absolute inset-2 rounded-full border-2 border-red-200 animate-pulse opacity-60" />
                    </>
                )}

                <div
                    className="relative flex h-32 w-32 items-center justify-center rounded-full bg-white"
                >

                    <div className="flex flex-col items-center">

                        {/* Eyes */}

                        <div className="flex items-center gap-5">

                            <span
                                className="h-2.5 w-2.5 rounded-full bg-slate-700 animate-[blink_5s_infinite]"
                            />

                            <span
                                className="h-2.5 w-2.5 rounded-full bg-slate-700 animate-[blink_5s_infinite]"
                            />

                        </div>

                        {/* Mouth */}

                        <div
                            className={`mt-5 rounded-full bg-slate-700 transition-all duration-150
                                 ${isSpeaking
                                    ? "h-4 w-5 animate-[talk_0.45s_infinite]"
                                    : "h-1.5 w-7"
                                }`}
                        />

                    </div>

                    {/* Speaking Indicator */}

                    {isSpeaking && (

                        <div className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white shadow-lg">

                            <Mic
                                size={12}
                                fill="white"
                            />

                            Speaking...

                        </div>

                    )}

                </div>

            </div>

            {/* Status */}

            <div className="mt-5 text-center">

                <h3 className="text-lg font-bold text-slate-900">

                    AI Interviewer

                </h3>

                <p
                    className={`mt-2 text-sm transition-colors duration-300

                        ${isSpeaking ? "text-red-600" : "text-slate-500"}

                    `}
                >

                    {isSpeaking ? "" : "Waiting for your response."}

                </p>

            </div>

        </div>

    );

};

export default AvatarFace;