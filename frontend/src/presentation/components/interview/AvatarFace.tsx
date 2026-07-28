import React from "react";
import { UserRound, Mic } from "lucide-react";

type Props = {
    isSpeaking: boolean;
};

const AvatarFace: React.FC<Props> = ({
    isSpeaking,
}) => {

    return (

        <div className="flex flex-col items-center">

            <div
                className={`relative flex h-44 w-44 items-center justify-center rounded-full border-4 bg-gradient-to-br from-red-100 via-rose-50 to-white shadow-xl transition-all duration-500

                    ${
                        isSpeaking
                            ? "border-red-500 shadow-red-400/40 scale-105"
                            : "border-slate-200"
                    }

                `}
            >

                {isSpeaking && (

                    <div className="absolute inset-0 rounded-full border-4 border-red-300 animate-ping opacity-30" />

                )}

                <div
                    className={`relative flex h-32 w-32 items-center justify-center rounded-full bg-white transition-transform duration-300

                        ${ isSpeaking ? "animate-pulse" : ""}

                    `}
                >

                    <UserRound size={70} className="text-red-500" strokeWidth={1.8}/>

                    {/* Speaking Indicator */}

                    {isSpeaking && (

                        <div className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white shadow-lg">

                            <Mic
                                size={12}
                                fill="white"
                            />

                            Speaking

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

                        ${
                            isSpeaking ? "text-red-600" : "text-slate-500"
                        }

                    `}
                >

                    {isSpeaking ? "Please listen carefully..." : "Waiting for your response."}

                </p>

            </div>

        </div>

    );

};

export default AvatarFace;