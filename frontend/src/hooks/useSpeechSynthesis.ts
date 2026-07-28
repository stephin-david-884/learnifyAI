import { useCallback, useEffect, useRef, useState } from "react";

type UseSpeechSynthesisReturn = {

    browserSupported: boolean;
    isSpeaking: boolean;
    isPaused: boolean;
    selectedVoice: SpeechSynthesisVoice | null;

    speak: (text: string) => void;
    stop: () => void;
    pause: () => void;
    resume: () => void;
};

export const useSpeechSynthesis = (): UseSpeechSynthesisReturn => {

    const browserSupported = typeof window !== "undefined" && "speechSynthesis" in window;

    const [isSpeaking, setIsSpeaking] = useState(false);

    const [isPaused, setIsPaused] = useState(false);

    const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

    const voicesRef = useRef<SpeechSynthesisVoice[]>([]);

    /* Selecting Voice */

    const selectBestVoice = useCallback(() => {
        if (!browserSupported) {
            return null;
        }

        const voices = window.speechSynthesis.getVoices();

        voicesRef.current = voices;

        const priorities = ["Microsoft Aria", "Microsoft Jenny", "Google US English", "Google UK English Female",
            "Google UK English Male", "Alex", "Samantha"];

        for (const preferred of priorities) {
            const voice = voices.find(voice => voice.name.includes(preferred));

            if (voice) {

                setSelectedVoice(voice);

                return voice;

            }

            const englishVoice =

                voices.find(voice => voice.lang.startsWith("en"));

            if (englishVoice) {

                setSelectedVoice(englishVoice);
                return englishVoice;

            }

            setSelectedVoice(voices[0] ?? null);
            return voices[0] ?? null;
        }

    }, [browserSupported])

    /* Speak */

    const speak = useCallback((text: string) => {

        if (!browserSupported || !text.trim()) {
            return;
        }

        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);

        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 1;
        const voice = selectedVoice ?? selectBestVoice();

        if (voice) {

            utterance.voice = voice;
            utterance.lang = voice.lang;

        } else {
            utterance.lang = "en-US";
        }

        utterance.onstart = () => {
            setIsSpeaking(true);

            setIsPaused(false);
        };

        utterance.onend = () => {

            setIsSpeaking(false);

            setIsPaused(false);

        };

        utterance.onerror = () => {

            setIsSpeaking(false);

            setIsPaused(false);

        };

        utterance.onpause = () => {

            setIsPaused(true);
        };

        utterance.onresume = () => {

            setIsPaused(false);

        };

        utteranceRef.current = utterance;

        window.speechSynthesis.speak(
            utterance
        );
    }, [browserSupported]);

    /* Stop */

    const stop = useCallback(() => {
        if (!browserSupported) {
            return;
        }

        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        setIsPaused(false);
    }, [browserSupported]);

    /* Pause */

    const pause = useCallback(() => {
        if (!browserSupported) {
            return;
        }

        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.pause();
        }
    }, [browserSupported]);

    /* Resume */

    const resume = useCallback(() => {
        if (!browserSupported) {
            return;
        }

        if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
        }
    }, [browserSupported]);

    /* Load Voices */
    useEffect(() => {

        if (!browserSupported) {
            return;
        }

        const loadVoices = () => {
            selectBestVoice();
        };

        loadVoices();

        window.speechSynthesis.onvoiceschanged = loadVoices;

        return () => {

            window.speechSynthesis.onvoiceschanged = null;

        };

    }, [browserSupported, selectBestVoice]);

    /* Cleanup */

    useEffect(() => {

        return () => {
            if (browserSupported) {
                window.speechSynthesis.cancel();
            }
        };
    }, [browserSupported]);

    return {
        browserSupported,
        isSpeaking,
        isPaused,
        selectedVoice,
        speak,
        stop,
        pause,
        resume
    }
}