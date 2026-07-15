import React from "react";
import { Mic, Square, RotateCcw } from "lucide-react";

type Props = {
    isRecording: boolean;
    hasTranscript: boolean;
    disabled?: boolean;
    onStart: () => void;
    onStop: () => void;
    onRetry: () => void;
};

const RecordingControls: React.FC<Props> = ({
    isRecording,
    hasTranscript,
    disabled = false,
    onStart,
    onStop,
    onRetry,
}) => {

    return (

        <div className="rounded-3xl border border-slate-200 bg-white p-6">

            <div className="flex items-center justify-between">

                <div>

                    <h2 className="text-lg font-bold text-slate-900">
                        Recording Controls
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">

                        {isRecording
                            ? "Speak clearly into your microphone."
                            : "Record your answer when you're ready."}

                    </p>

                </div>

                {isRecording && (

                    <div className="flex items-center gap-2">

                        <span className="relative flex h-3 w-3">

                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"/>

                            <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500"/>

                        </span>

                        <span className="text-sm font-semibold text-red-600">
                            Recording...
                        </span>

                    </div>

                )}

            </div>

            <div className="mt-6 flex flex-wrap gap-4">

                {!isRecording ? (

                    <button
                        disabled={disabled}
                        onClick={onStart}
                        className="
                            flex
                            items-center
                            gap-2
                            rounded-2xl
                            bg-gradient-to-r
                            from-red-500
                            to-rose-600
                            px-6
                            py-3
                            font-semibold
                            text-white
                            transition
                            hover:opacity-90
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >

                        <Mic size={20} />

                        Start Recording

                    </button>

                ) : (

                    <button
                        onClick={onStop}
                        className="
                            flex
                            items-center
                            gap-2
                            rounded-2xl
                            bg-slate-900
                            px-6
                            py-3
                            font-semibold
                            text-white
                            transition
                            hover:bg-slate-800
                        "
                    >

                        <Square size={20} />

                        Stop Recording

                    </button>

                )}

                <button
                    disabled={!hasTranscript || isRecording}
                    onClick={onRetry}
                    className="
                        flex
                        items-center
                        gap-2
                        rounded-2xl
                        border
                        border-slate-300
                        bg-white
                        px-6
                        py-3
                        font-semibold
                        text-slate-700
                        transition
                        hover:bg-slate-100
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                    "
                >

                    <RotateCcw size={18} />

                    Re-record

                </button>

            </div>

        </div>

    );

};

export default RecordingControls;