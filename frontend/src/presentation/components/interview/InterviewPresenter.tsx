import React, { useCallback, useEffect } from "react";
import type { InterviewDifficulty } from "../../../types/interview";
import { useSpeechSynthesis } from "../../../hooks/useSpeechSynthesis";

import AvatarFace from "./AvatarFace";
import QuestionBubble from "./QuestionBubble";

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
        speak,
        stop,
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

    /* Replay */

    const handleReplay = useCallback(() => {

        speak(question);

    }, [question, speak]);

    return (

        <div className="grid gap-6 lg:grid-cols-[180px_1fr] lg:items-start">

            <div className="flex justify-center lg:sticky lg:top-6">
                <AvatarFace isSpeaking={isSpeaking} />
            </div>

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