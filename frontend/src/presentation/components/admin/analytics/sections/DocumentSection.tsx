import type { DocumentAnalytics } from "../../../../../types/admin/analytics";
import ChartCard from "../common/ChartCard";
import SectionHeader from "../common/SectionHeader";
import DocumentUploadChart from "../charts/DocumentUploadChart";

interface DocumentSectionProps {
    documents: DocumentAnalytics | null;
    loading?: boolean;
}

const DocumentSection = ({
    documents,
    loading = false,
}: DocumentSectionProps) => {

    if (loading) {

        return (

            <section className="space-y-6">

                <SectionHeader
                    title="Document Analytics"
                    description="Monitor uploads, processing status and storage usage."
                />

                <div className="grid gap-6 lg:grid-cols-2">

                    {Array.from({ length: 3 }).map((_, index) => (

                        <div
                            key={index}
                            className="
                                h-96
                                animate-pulse
                                rounded-xl
                                border
                                border-gray-200
                                bg-gray-100
                            "
                        />

                    ))}

                </div>

            </section>

        );

    }

    if (!documents) {

        return (

            <section className="space-y-6">

                <SectionHeader
                    title="Document Analytics"
                    description="Monitor uploads, processing status and storage usage."
                />

                <ChartCard title="Document Analytics">

                    <div
                        className="
                            flex
                            h-72
                            items-center
                            justify-center
                            text-gray-500
                        "
                    >
                        No document analytics available.
                    </div>

                </ChartCard>

            </section>

        );

    }

    const overview = documents.overview;

    const formatBytes = (bytes: number) => {

        if (bytes === 0) return "0 Bytes";

        const units = ["Bytes", "KB", "MB", "GB", "TB"];

        const index = Math.floor(
            Math.log(bytes) / Math.log(1024)
        );

        return `${(
            bytes /
            Math.pow(1024, index)
        ).toFixed(2)} ${units[index]}`;

    };

    return (

        <section className="space-y-6">

            <SectionHeader
                title="Document Analytics"
                description="Track uploads, storage usage and document processing."
            />

            <div className="grid gap-6 lg:grid-cols-2">

                <ChartCard
                    title="Upload Trend"
                    subtitle="Daily document uploads."
                >

                    {/* DocumentUploadChart */}

                    <DocumentUploadChart
                        data={documents.uploadTrend}
                        loading={loading}
                    />

                </ChartCard>

                <ChartCard
                    title="Document Overview"
                    subtitle="Current document statistics."
                >

                    <div className="grid grid-cols-2 gap-4">

                        <div className="rounded-lg border border-gray-200 p-4">

                            <p className="text-sm text-gray-500">
                                Total Documents
                            </p>

                            <p className="mt-2 text-2xl font-bold text-gray-900">
                                {overview.totalDocuments}
                            </p>

                        </div>

                        <div className="rounded-lg border border-gray-200 p-4">

                            <p className="text-sm text-gray-500">
                                Ready
                            </p>

                            <p className="mt-2 text-2xl font-bold text-green-600">
                                {overview.readyDocuments}
                            </p>

                        </div>

                        <div className="rounded-lg border border-gray-200 p-4">

                            <p className="text-sm text-gray-500">
                                Processing
                            </p>

                            <p className="mt-2 text-2xl font-bold text-yellow-600">
                                {overview.processingDocuments}
                            </p>

                        </div>

                        <div className="rounded-lg border border-gray-200 p-4">

                            <p className="text-sm text-gray-500">
                                Failed
                            </p>

                            <p className="mt-2 text-2xl font-bold text-red-600">
                                {overview.failedDocuments}
                            </p>

                        </div>

                        <div className="rounded-lg border border-gray-200 p-4">

                            <p className="text-sm text-gray-500">
                                Uploading
                            </p>

                            <p className="mt-2 text-2xl font-bold text-blue-600">
                                {overview.uploadingDocuments}
                            </p>

                        </div>

                        <div className="rounded-lg border border-gray-200 p-4">

                            <p className="text-sm text-gray-500">
                                Total Pages
                            </p>

                            <p className="mt-2 text-2xl font-bold text-gray-900">
                                {overview.totalPages}
                            </p>

                        </div>

                    </div>

                </ChartCard>

                <ChartCard
                    title="Storage Usage"
                    subtitle="Overall storage statistics."
                    className="lg:col-span-2"
                >

                    <div className="grid gap-4 md:grid-cols-2">

                        <div className="rounded-lg border border-gray-200 p-5">

                            <p className="text-sm text-gray-500">
                                Total Storage
                            </p>

                            <p className="mt-2 text-3xl font-bold text-gray-900">
                                {formatBytes(overview.totalStorageBytes)}
                            </p>

                        </div>

                        <div className="rounded-lg border border-gray-200 p-5">

                            <p className="text-sm text-gray-500">
                                Average File Size
                            </p>

                            <p className="mt-2 text-3xl font-bold text-gray-900">
                                {formatBytes(
                                    overview.averageFileSizeBytes
                                )}
                            </p>

                        </div>

                    </div>

                </ChartCard>

            </div>

        </section>

    );

};

export default DocumentSection;