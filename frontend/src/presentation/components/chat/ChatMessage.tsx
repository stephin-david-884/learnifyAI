import React from "react";
import type { ChatMessageItem } from "../../../types/chat";
import ReactMarkdown from "react-markdown";

type Props = {
    message: ChatMessageItem;
};

const ChatMessage: React.FC<Props> = ({
    message,
}) => {

    const isUser = message.role === "USER";

    return (
        <div
            className={`flex ${isUser
                ? "justify-end"
                : "justify-start"
                }`}
        >
            <div
                className={`max-w-[75%] rounded-3xl px-4 py-3 text-sm shadow-sm ${isUser
                    ? "bg-red-600 text-white"
                    : "bg-white border border-slate-200 text-slate-900"
                    }`}
            >
                {message.pending ? (
                    <div className="flex gap-1">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:150ms]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:300ms]" />
                    </div>
                ) : isUser ? (
                    <p>{message.content}</p>
                ) : (
                    <div className="space-y-2">
                        <ReactMarkdown>
                            {message.content}
                        </ReactMarkdown>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatMessage;