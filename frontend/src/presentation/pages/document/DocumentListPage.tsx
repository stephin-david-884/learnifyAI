import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDocument } from '../../../hooks/useDocument'
import toast from 'react-hot-toast';
import UploadDocumentModal from '../../components/document/UploadDocumentModal';
import Pagination from '../../components/common/pagination/Pagination';
import DocumentCard from '../../components/document/DocumentCard';
import { Upload } from 'lucide-react';

const DocumentListPage: React.FC = () => {

    const { documents, loading, totalPages, error, fetchUserDocuments, uploadUserDocument, removeDocument } = useDocument();

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(3);
    const [modalOpen, setModalOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetchUserDocuments({ page, limit });
    }, [page, limit, fetchUserDocuments]);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    const hasProcessingDocs = documents.some((doc) => doc.status === "PROCESSING");

    useEffect(() => {
        if (!hasProcessingDocs) return;

        const interval = setInterval(() => {
            fetchUserDocuments({ page, limit })
        }, 3000)

        return () => clearInterval(interval)

    }, [hasProcessingDocs, page, limit, fetchUserDocuments]);

    const handleUpload = async (title: string, file: File) => {

        await uploadUserDocument({ title, file });

        toast.success("Document uploaded successfully");
    }

    const handleDelete = async (documentId: string) => {

        await removeDocument(documentId);

        toast.success(
            "Document deleted successfully"
        );
    };

    return (
        <div className="mx-auto max-w-7xl">

            <div className="mb-10 flex items-center justify-between">

                <div>
                    <h1 className="text-3xl font-bold text-slate-900">
                        My Documents
                    </h1>

                    <p className="mt-2 text-slate-600">
                        Manage and organize your learning documents
                    </p>
                </div>

                <button
                    onClick={() =>
                        setModalOpen(true)
                    }
                    className="flex items-center gap-2 rounded-2xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
                >
                    <Upload className="h-4 w-4" />

                    Upload Document
                </button>
            </div>

            {loading &&
                documents.length === 0 ? (
                <div className="flex justify-center py-20">
                    <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-red-500"></div>
                </div>
            ) : documents.length === 0 ? (

                <div className="rounded-3xl border border-dashed border-slate-300 bg-white py-24 text-center">

                    <h2 className="text-2xl font-bold text-slate-800">
                        No documents uploaded
                    </h2>

                    <p className="mt-3 text-slate-500">
                        Upload your first PDF to begin learning
                    </p>
                </div>

            ) : (

                <div className="space-y-8">

                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                        {documents.map((document) => (
                            <DocumentCard
                                key={document.id}
                                document={document}
                                onDelete={handleDelete}
                                onOpen={(id) =>
                                    navigate(`/documents/${id}`)
                                }
                            />
                        ))}
                    </div>

                    <Pagination
                        page={page}
                        totalPages={totalPages}
                        limit={limit}
                        onPageChange={setPage}
                        onLimitChange={setLimit}
                    />
                </div>
            )}

            <UploadDocumentModal
                open={modalOpen}
                onClose={() =>
                    setModalOpen(false)
                }
                onSubmit={handleUpload}
            />
        </div>
    )
}

export default DocumentListPage
