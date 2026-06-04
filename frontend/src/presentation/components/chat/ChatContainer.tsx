import { useEffect, useState } from "react";
import { useChat } from "../../../hooks/useChat";

import ChatHeader from "./ChatHeader";
import ChatEmptyState from "./ChatEmptyState";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";

type Props = {
    documentId: string;
};

const ChatContainer: React.FC<Props> = ({
    documentId,
}) => {

    const {
        messages,
        loading,
        sending,
        fetchChatHistory,
        askQuestion,
        resetChat,
    } = useChat();

    const [localMessages, setLocalMessages] = useState(messages);

    useEffect(() => {

        resetChat();

        fetchChatHistory(
            documentId,
            1,
            20
        );

        return () => {
            resetChat();
        };

    }, [documentId]);

    useEffect(() => {
        setLocalMessages(messages);
    }, [messages]);

    const handleSend = async (
        question: string
    ) => {

        const tempUserId =
            `user-${Date.now()}`;

        const tempAssistantId =
            `assistant-${Date.now()}`;

        setLocalMessages((prev) => [
            ...prev,

            {
                role: "USER",
                content: question,
                createdAt:
                    new Date().toISOString(),

                tempId: tempUserId,
            },

            {
                role: "ASSISTANT",
                content: "",
                createdAt:
                    new Date().toISOString(),

                tempId: tempAssistantId,

                pending: true,
            },
        ]);

        try {

            const response =
                await askQuestion(
                    documentId,
                    question
                );

            setLocalMessages((prev) =>
                prev.map((message) => {

                    if (
                        message.tempId ===
                        tempAssistantId
                    ) {
                        return {
                            ...message,
                            content:
                                response.answer,

                            pending: false,
                        };
                    }

                    return message;
                })
            );

        } catch {

            setLocalMessages((prev) =>
                prev.map((message) => {

                    if (
                        message.tempId ===
                        tempAssistantId
                    ) {
                        return {
                            ...message,
                            content:
                                "Something went wrong.",

                            pending: false,
                        };
                    }

                    return message;
                })
            );
        }
    };

    return (
        <div className="flex h-[750px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
            <ChatHeader />

            <div className="flex-1 overflow-y-auto p-5">
                {loading ? (
                    <div>
                        Loading...
                    </div>
                ) : localMessages.length === 0 ? (
                    <ChatEmptyState />
                ) : (
                    <div className="space-y-4">
                        {localMessages.map(
                            (
                                message
                            ) => (
                                <ChatMessage
                                    key={message.tempId ??
                                        `${message.role}-${message.createdAt}`}
                                    message={
                                        message
                                    }
                                />
                            )
                        )}
                    </div>
                )}
            </div>

            <ChatInput
                onSend={handleSend}
                sending={sending}
            />
        </div>
    );
};

export default ChatContainer;