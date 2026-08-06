import { useEffect, useMemo, useState, useRef } from "react";
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
        page,
        limit,
        hasMore,
        fetchChatHistory,
        askQuestion,
        resetChat,
    } = useChat();

    const [pendingAssistant, setPendingAssistant] = useState<
        (typeof messages)[number] | null
    >(null);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const displayMessages = useMemo(() => {
        if (!pendingAssistant) {
            return messages;
        }

        return [
            ...messages,
            pendingAssistant,
        ];
    }, [messages, pendingAssistant]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [displayMessages]);

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
    }, [documentId, fetchChatHistory, resetChat]);

    const handleSend = async (
        question: string
    ) => {
        setPendingAssistant({
            role: "ASSISTANT",
            content: "",
            createdAt: new Date().toISOString(),
            tempId: `assistant-${Date.now()}`,
            pending: true,
        });

        try {
            await askQuestion(
                documentId,
                question
            );

            // Redux has already been updated by askQuestion()
            setPendingAssistant(null);

        } catch {
            setPendingAssistant({
                role: "ASSISTANT",
                content: "Something went wrong.",
                createdAt: new Date().toISOString(),
                pending: false,
            });
        }
    };

    const handleScroll = () => {
        if (
            !containerRef.current ||
            loading ||
            !hasMore
        ) {
            return;
        }

        if (
            containerRef.current.scrollTop < 50
        ) {
            fetchChatHistory(
                documentId,
                page + 1,
                limit
            );
        }
    };

    return (
        <div className="flex h-[750px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
            <ChatHeader />

            <div
                ref={containerRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto p-5"
            >
                {loading ? (
                    <div>
                        Loading...
                    </div>
                ) : displayMessages.length === 0 ? (
                    <ChatEmptyState />
                ) : (
                    <div className="space-y-4">
                        {displayMessages.map(
                            (message) => (
                                <ChatMessage
                                    key={
                                        message.tempId ??
                                        `${message.role}-${message.createdAt}`
                                    }
                                    message={message}
                                />
                            )
                        )}
                        <div ref={messagesEndRef} />
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