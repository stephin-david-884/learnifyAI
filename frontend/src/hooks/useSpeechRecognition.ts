import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

type UseSpeechRecognitionReturn = {

    transcript: string;

    isRecording: boolean;

    browserSupported: boolean;

    error: string | null;

    startRecording: () => void;

    stopRecording: () => void;

    retryRecording: () => void;

    resetTranscript: () => void;

    loadTranscript: (text: string) => void;
};

export const useSpeechRecognition =
    (): UseSpeechRecognitionReturn => {

        const recognitionRef =
            useRef<SpeechRecognition | null>(null);

        const [transcript, setTranscript] =
            useState("");

        const [isRecording, setIsRecording] =
            useState(false);

        const browserSupported =
            typeof window !== "undefined" &&
            Boolean(
                window.SpeechRecognition ??
                window.webkitSpeechRecognition
            );

        const [error, setError] =
            useState<string | null>(null);

        /*
        Initialize Speech Recognition
        */

        useEffect(() => {

            const SpeechRecognitionAPI =
                window.SpeechRecognition ??
                window.webkitSpeechRecognition;

            if (!SpeechRecognitionAPI) {

                return;
            }

            const recognition =
                new SpeechRecognitionAPI();

            recognition.lang = "en-US";

            recognition.continuous = true;

            recognition.interimResults = true;

            recognition.maxAlternatives = 1;

            /*
            Transcript Updates
            */

            recognition.onresult = (
                event: SpeechRecognitionEvent
            ) => {

                let latestTranscript = "";

                for (
                    let i = event.resultIndex;
                    i < event.results.length;
                    i++
                ) {

                    latestTranscript +=
                        event.results[i][0].transcript;
                }

                setTranscript(latestTranscript.trim());

            };

            /*
            Recognition Started
            */

            recognition.onstart = () => {

                setIsRecording(true);

                setError(null);
            };

            /*
            Recognition Ended
            */

            recognition.onend = () => {

                setIsRecording(false);
            };

            /*
            Error Handling
            */

            recognition.onerror = (
                event: SpeechRecognitionErrorEvent
            ) => {

                setIsRecording(false);

                switch (event.error) {

                    case "not-allowed":

                        setError(
                            "Microphone permission denied."
                        );

                        break;

                    case "no-speech":

                        setError(
                            "No speech detected."
                        );

                        break;

                    case "audio-capture":

                        setError(
                            "No microphone available."
                        );

                        break;

                    case "network":

                        setError(
                            "Speech recognition network error."
                        );

                        break;

                    default:

                        setError(
                            "Speech recognition failed."
                        );
                }
            };

            recognitionRef.current =
                recognition;

            /*
            Cleanup
            */

            return () => {

                recognition.stop();

                recognition.abort();
            };

        }, []);

        /*
        Start Recording
        */

        const startRecording =
            useCallback(() => {

                if (
                    !browserSupported ||
                    !recognitionRef.current ||
                    isRecording
                ) {

                    return;
                }

                setError(null);

                recognitionRef.current.start();

            }, [
                browserSupported,
                isRecording,
            ]);

        /*
        Stop Recording
        */

        const stopRecording =
            useCallback(() => {

                recognitionRef.current?.stop();

            }, []);

        /*
        Retry Recording
        */

        const retryRecording =
            useCallback(() => {

                if (!recognitionRef.current) {

                    return;
                }

                recognitionRef.current.stop();

                setTranscript("");

                setError(null);

                setTimeout(() => {

                    recognitionRef.current?.start();

                }, 200);

            }, []);

        /*
        Reset Transcript
        */

        const resetTranscript =
            useCallback(() => {

                setTranscript("");

            }, []);

        /* 
        Load Transcript
        */

        const loadTranscript =
            useCallback((text: string) => {

                setTranscript(text);

            }, []);

        return {

            transcript,

            isRecording,

            browserSupported,

            error,

            startRecording,

            stopRecording,

            retryRecording,

            resetTranscript,

            loadTranscript,
        };
    };