import React, { useState } from "react";
import { Send } from "lucide-react";

type Props = {
    onSend: (
        question: string
    ) => Promise<void>;

    sending: boolean;
};

const ChatInput: React.FC<Props> = ({
    onSend,
    sending,
}) => {

    const [question, setQuestion] =
        useState("");

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        if (!question.trim()) return;

        await onSend(question);

        setQuestion("");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="border-t border-slate-200 p-4"
        >
            <div className="flex gap-3">
                <input
                    value={question}
                    onChange={(e) =>
                        setQuestion(
                            e.target.value
                        )
                    }
                    placeholder="Ask anything..."
                    className="flex-1 rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-red-500"
                />

                <button
                    type="submit"
                    disabled={sending}
                    className="rounded-2xl bg-red-600 px-5 text-white transition hover:bg-red-700 disabled:opacity-50"
                >
                    <Send size={18} />
                </button>
            </div>
        </form>
    );
};

export default ChatInput;