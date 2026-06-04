import React from "react";
import type { ChatMessageItem } from "../../../types/chat";

type Props = {
    message: ChatMessageItem;
};

const ChatMessage: React.FC<Props> = ({
    message,
}) => {

    const isUser = message.role === "USER";

    return (
        <div
            className={`flex ${
                isUser
                    ? "justify-end"
                    : "justify-start"
            }`}
        >
            <div
                className={`max-w-[75%] rounded-3xl px-4 py-3 text-sm shadow-sm ${
                    isUser
                        ? "bg-red-600 text-white"
                        : "bg-white border border-slate-200 text-slate-900"
                }`}
            >
                {message.content}
            </div>
        </div>
    );
};

export default ChatMessage;