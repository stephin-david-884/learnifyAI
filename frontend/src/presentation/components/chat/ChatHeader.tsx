import React from "react";
import { MessageSquare } from "lucide-react";

const ChatHeader: React.FC = () => {
    return (
        <div className="border-b border-slate-200 p-4">
            <div className="flex items-center gap-3">
                <div className="rounded-xl bg-red-100 p-2">
                    <MessageSquare
                        size={18}
                        className="text-red-600"
                    />
                </div>

                <div>
                    <h2 className="font-semibold text-slate-900">
                        AI Chat
                    </h2>

                    <p className="text-sm text-slate-500">
                        Ask questions about this document
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ChatHeader;