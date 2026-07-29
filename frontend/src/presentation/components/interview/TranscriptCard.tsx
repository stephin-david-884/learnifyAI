import React from "react";
import { FileText } from "lucide-react";

type Props = {
    transcript: string;
};

const TranscriptCard: React.FC<Props> = ({
    transcript,
}) => {

    const hasTranscript =
        transcript.trim().length > 0;

    return (

        <div className="rounded-3xl border border-slate-200 bg-white p-5"
        >

            <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-red-50"
                >

                    <FileText
                        className="text-red-600"
                        size={20}
                    />

                </div>

                <div>

                    <h2 className="text-lg font-bold text-slate-900">
                        Live Transcript
                    </h2>

                    <p className="text-sm text-slate-500">
                        Your spoken answer will appear here.
                    </p>

                </div>

            </div>

            <div className={`mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4
                            ${hasTranscript ? "min-h-[140px]" : "min-h-[110px]"}`}
            >

                {hasTranscript ? (

                    <div className="max-h-80 overflow-y-auto whitespace-pre-wrap break-words text-[15px] leading-7 text-slate-700"
                    >
                        {transcript}
                    </div>

                ) : (

                    <div className="flex h-full min-h-[90px] flex-col items-center justify-center text-center"
                    >

                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100"
                        >

                            <FileText
                                size={24}
                                className="text-slate-400"
                            />

                        </div>

                        <h3
                            className="mt-3 text-base font-semibold text-slate-700"
                        >
                            Start recording to answer this question.
                        </h3>

                        <p className="mt-2 max-w-sm text-sm leading-5 text-slate-500">
                            Your spoken response will appear here in real time.
                        </p>

                    </div>

                )}

            </div>

        </div>

    );
};

export default TranscriptCard;