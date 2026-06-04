import { useEffect } from "react";
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

    const handleSend = async (
        question: string
    ) => {

        await askQuestion(
            documentId,
            question
        );
    };

    return (
        <div className="flex h-[750px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
            <ChatHeader />

            <div className="flex-1 overflow-y-auto p-5">
                {loading ? (
                    <div>
                        Loading...
                    </div>
                ) : messages.length === 0 ? (
                    <ChatEmptyState />
                ) : (
                    <div className="space-y-4">
                        {messages.map(
                            (
                                message,
                                index
                            ) => (
                                <ChatMessage
                                    key={index}
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