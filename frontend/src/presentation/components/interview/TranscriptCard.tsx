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

        <div className="rounded-3xl border border-slate-200 bg-white p-6"
        >

            <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-50"
                >

                    <FileText
                        className="text-red-600"
                        size={22}
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

            <div className="mt-5 min-h-[180px] rounded-2xl border border-slate-200 bg-slate-50 p-5"
            >

                {hasTranscript ? (

                    <div className="max-h-72 overflow-y-auto whitespace-pre-wrap break-words text-[15px] leading-7 text-slate-700"
                    >
                        {transcript}
                    </div>

                ) : (

                    <div className="flex h-full min-h-[140px] flex-col items-center justify-center text-center"
                    >

                        <div  className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100"
                        >

                            <FileText
                                size={30}
                                className="text-slate-400"
                            />

                        </div>

                        <h3
                            className="mt-4 text-base font-semibold text-slate-700"
                        >
                            Waiting for your answer...
                        </h3>

                        <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                            Once recording starts, your speech
                            will be converted into text in real
                            time. Review it before moving to the
                            next question.
                        </p>

                    </div>

                )}

            </div>

        </div>

    );
};

export default TranscriptCard;