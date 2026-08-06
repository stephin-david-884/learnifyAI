export {};

declare global {
    interface Window {
        SpeechRecognition: SpeechRecognitionConstructor;
        webkitSpeechRecognition: SpeechRecognitionConstructor;
    }

    interface SpeechRecognitionConstructor {
        new (): SpeechRecognition;
    }

    interface SpeechRecognition extends EventTarget {
        lang: string;
        continuous: boolean;
        interimResults: boolean;
        maxAlternatives: number;

        start(): void;
        stop(): void;
        abort(): void;

        onstart: ((this: SpeechRecognition, ev: Event) => void) | null;
        onend: ((this: SpeechRecognition, ev: Event) => void) | null;

        onresult:
            | ((
                  this: SpeechRecognition,
                  ev: SpeechRecognitionEvent
              ) => void)
            | null;

        onerror:
            | ((
                  this: SpeechRecognition,
                  ev: SpeechRecognitionErrorEvent
              ) => void)
            | null;
    }

    interface SpeechRecognitionEvent extends Event {
        resultIndex: number;
        results: SpeechRecognitionResultList;
    }

    interface SpeechRecognitionResultList {
        readonly length: number;
        [index: number]: SpeechRecognitionResult;
    }

    interface SpeechRecognitionResult {
        readonly length: number;
        readonly isFinal: boolean;
        [index: number]: SpeechRecognitionAlternative;
    }

    interface SpeechRecognitionAlternative {
        transcript: string;
        confidence: number;
    }

    interface SpeechRecognitionErrorEvent extends Event {
        error:
            | "no-speech"
            | "aborted"
            | "audio-capture"
            | "network"
            | "not-allowed"
            | "service-not-allowed"
            | "bad-grammar"
            | "language-not-supported";

        message: string;
    }
}