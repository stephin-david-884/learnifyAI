import React, {useEffect,useState,} from "react";
import { ArrowLeft, FileText,} from "lucide-react";
import {Link, useParams,} from "react-router-dom";
import Spinner from "../../components/common/Spinner";
import DocumentTabs, {
    type DocumentTab,
} from "../../components/document/DocumentTabs";

import { useDocument } from "../../../hooks/useDocument";

const DocumentDetailPage: React.FC = () => {

    const { documentId } = useParams();

    const {
        selectedDocument,
        loading,

        fetchDocumentById,
        clearDocument,
    } = useDocument();

    const [activeTab, setActiveTab] = useState<DocumentTab>("OVERVIEW");

    useEffect(() => {

        if (!documentId) {
            return;
        }

        fetchDocumentById(documentId);

        return () => {
            clearDocument();
        };

    }, [documentId]);

    if (loading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Spinner />
            </div>
        );
    }

    if (!selectedDocument) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <p className="text-slate-500">
                    Document not found
                </p>
            </div>
        );
    }

    const renderTabContent = () => {

        switch (activeTab) {

            case "OVERVIEW":
                return (
                    <div className="rounded-2xl border border-slate-200 bg-white p-6">
                        <h3 className="font-semibold text-slate-900">
                            Overview
                        </h3>

                        <p className="mt-2 text-sm text-slate-500">
                            Overview tab coming next.
                        </p>
                    </div>
                );

            case "READER":
                return (
                    <div className="rounded-2xl border border-slate-200 bg-white p-6">
                        <h3 className="font-semibold text-slate-900">
                            Reader
                        </h3>

                        <p className="mt-2 text-sm text-slate-500">
                            Reader tab coming next.
                        </p>
                    </div>
                );

            case "CHAT":
                return (
                    <div className="rounded-2xl border border-slate-200 bg-white p-6">
                        <h3 className="font-semibold text-slate-900">
                            Chat
                        </h3>

                        <p className="mt-2 text-sm text-slate-500">
                            Chat interface coming next.
                        </p>
                    </div>
                );

            case "LEARN_HUB":
                return (
                    <div className="rounded-2xl border border-slate-200 bg-white p-6">
                        <h3 className="font-semibold text-slate-900">
                            Learn Hub
                        </h3>

                        <p className="mt-2 text-sm text-slate-500">
                            Flashcards, quizzes and summaries coming soon.
                        </p>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="space-y-6">

            <Link
                to="/documents"
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
            >
                <ArrowLeft size={16} />

                Back to Documents
            </Link>

            <div
                className=" rounded-2xl border border-slate-200 bg-white p-6"
            >
                <div className="flex items-center gap-3">

                    <div
                        className=" flex h-12 w-12 items-center justify-center rounded-xl bg-red-50"
                    >
                        <FileText
                            size={22}
                            className="text-red-600"
                        />
                    </div>

                    <div>
                        <h1
                            className=" text-xl font-bold text-slate-900"
                        >
                            {selectedDocument.title}
                        </h1>

                        <p className="text-sm text-slate-500">
                            {selectedDocument.status}
                        </p>
                    </div>
                </div>
            </div>

            <DocumentTabs
                activeTab={activeTab}
                onChange={setActiveTab}
            />

            {renderTabContent()}
        </div>
    );
};

export default DocumentDetailPage;