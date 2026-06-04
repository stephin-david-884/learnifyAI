import React from "react";
import { Sparkles } from "lucide-react";

const ChatEmptyState: React.FC = () => {
    return (
        <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="rounded-3xl bg-red-100 p-5">
                <Sparkles
                    size={40}
                    className="text-red-600"
                />
            </div>

            <h3 className="mt-5 text-lg font-semibold text-slate-900">
                Start Learning
            </h3>

            <p className="mt-2 max-w-md text-sm text-slate-500">
                Ask questions about this document and get
                AI-powered answers based on the content.
            </p>
        </div>
    );
};

export default ChatEmptyState;