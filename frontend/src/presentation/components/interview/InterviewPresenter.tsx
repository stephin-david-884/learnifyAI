import React, { useCallback, useEffect } from "react";
import type { InterviewDifficulty } from "../../../types/interview";
import { useSpeechSynthesis } from "../../../hooks/useSpeechSynthesis";

import AvatarFace from "./AvatarFace";
import QuestionBubble from "./QuestionBubble";
import { Volume2, VolumeX } from "lucide-react";

type Props = {

    question: string;

    difficulty: InterviewDifficulty;

    onSpeakingChange?: (speaking: boolean) => void;

};

const InterviewPresenter: React.FC<Props> = ({

    question,
    difficulty,
    onSpeakingChange,

}) => {

    const {
        browserSupported,
        isSpeaking,
        isPaused,
        speak,
        stop,
        pause,
        resume,
    } = useSpeechSynthesis();

    /* Notify Parent*/

    useEffect(() => {

        onSpeakingChange?.(isSpeaking);

    }, [isSpeaking, onSpeakingChange]);

    /*Automatically Read New Question*/

    useEffect(() => {

        if (!browserSupported) {
            return;
        }

        if (!question.trim()) {
            return;
        }

        const timeout = window.setTimeout(() => {

            speak(question);

        }, 500);

        return () => {
            clearTimeout(timeout);
            stop();
        };

    }, [browserSupported, question, speak, stop]);

    const handleMuteToggle = useCallback(() => {

        if (isPaused) {

            resume();

            return;
        }

        pause();

    }, [isPaused, pause, resume]);

    /* Replay */

    const handleReplay = useCallback(() => {

        speak(question);

    }, [question, speak]);

    return (

        <div className="grid gap-6 lg:grid-cols-[180px_1fr] lg:items-start">

            {/* Interviewer */}

            <div className="flex justify-center lg:sticky lg:top-6">

                <div className="relative">

                    <AvatarFace
                        isSpeaking={isSpeaking}
                    />

                    {isSpeaking && (
                        <button
                            type="button"
                            onClick={handleMuteToggle}
                            title={
                                isPaused
                                    ? "Resume interviewer"
                                    : "Mute interviewer"
                            }
                            aria-label={
                                isPaused
                                    ? "Resume interviewer"
                                    : "Mute interviewer"
                            }
                            className="
                                absolute
                                -top-1
                                -right-1
                                z-20
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-white
                                bg-white
                                text-slate-600
                                shadow-md
                                ring-1
                                ring-slate-200
                                transition-all
                                duration-200
                                hover:scale-105
                                hover:bg-slate-50
                                hover:text-red-500
                                focus:outline-none
                                focus:ring-2
                                focus:ring-red-300
                                active:scale-95
                            "
                        >
                            {isPaused ? (
                                <VolumeX
                                    size={17}
                                    strokeWidth={2}
                                />
                            ) : (
                                <Volume2
                                    size={17}
                                    strokeWidth={2}
                                />
                            )}
                        </button>
                    )}

                </div>

            </div>

            {/* Question */}

            <div className="min-w-0">

                <QuestionBubble
                    question={question}
                    difficulty={difficulty}
                    isSpeaking={isSpeaking}
                    onReplay={handleReplay}
                />

            </div>

        </div>

    );

};

export default InterviewPresenter;