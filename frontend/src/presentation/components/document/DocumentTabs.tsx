import React from 'react';

export type DocumentTab =
    | "OVERVIEW"
    | "READER"
    | "CHAT"
    | "LEARN_HUB";

interface DocumentTabsProps {
    activeTab: DocumentTab;
    onChange: (tab: DocumentTab) => void;
}

const tabs: {
    label: string;
    value: DocumentTab;
}[] = [
        {
            label: "Overview",
            value: "OVERVIEW",
        },
        {
            label: "Reader",
            value: "READER",
        },
        {
            label: "Chat",
            value: "CHAT",
        },
        {
            label: "Learn Hub",
            value: "LEARN_HUB",
        },
    ];

const DocumentTabs: React.FC<DocumentTabsProps> = ({ activeTab, onChange }) => {
    return (
        <div className="w-full">
            <div className="border-b border-slate-200">
                <nav className="flex gap-2 overflow-x-auto">

                    {tabs.map((tab) => (

                        <button
                            key={tab.value}
                            onClick={() =>
                                onChange(tab.value)
                            }
                            className={`
                                relative px-4 py-3 text-sm font-semibold whitespace-nowrap transition-colors
                                
                                ${activeTab === tab.value
                                    ? "text-red-600"
                                    : "text-slate-500 hover:text-slate-900"}
                            `}
                        >
                            {tab.label}

                            {activeTab === tab.value && (
                                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"/>
                            )}
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    )
}

export default DocumentTabs;
