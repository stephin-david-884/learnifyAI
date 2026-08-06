import { useEffect, useState } from "react";
import { Document, Page, pdfjs,} from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

import ReaderToolbar from "./ReaderToolbar";
import ReaderSidebar from "./ReaderSidebar";
import { useDocument } from "../../../../hooks/useDocument";

pdfjs.GlobalWorkerOptions.workerSrc =
    new URL(
        "pdfjs-dist/build/pdf.worker.min.mjs",
        import.meta.url
    ).toString();

type Props = {
    documentId: string;
};

const DocumentReader: React.FC<Props> = ({
    documentId,
}) => {

    const {
        viewerUrl,
        viewerLoading,
        fetchViewerUrl,
    } = useDocument();

    const [numPages, setNumPages] = useState(0);

    const [pageNumber, setPageNumber] = useState(1);

    const [scale, setScale] = useState(1.2);

    useEffect(() => {

        fetchViewerUrl(
            documentId
        );

    }, [documentId, fetchViewerUrl]);

    const onDocumentLoadSuccess = ({
        numPages,
    }: {
        numPages: number;
    }) => {

        setNumPages(numPages);
    };

    if (
        viewerLoading || !viewerUrl
    ) {
        return (
            <div className="flex h-[700px] items-center justify-center">

                Loading PDF...

            </div>
        );
    }

    return (
        <div
            className=" overflow-hidden rounded-3xl border border-slate-200 bg-white"
        >

            <ReaderToolbar
                pageNumber={pageNumber}
                numPages={numPages}
                scale={scale}

                onPrev={() =>
                    setPageNumber((prev) =>
                        Math.max(
                            prev - 1,
                            1
                        )
                    )
                }

                onNext={() =>
                    setPageNumber((prev) =>
                        Math.min(
                            prev + 1,
                            numPages
                        )
                    )
                }

                onZoomIn={() =>
                    setScale(
                        (prev) =>
                            prev + 0.1
                    )
                }

                onZoomOut={() =>
                    setScale(
                        (prev) =>
                            Math.max(
                                prev - 0.1,
                                0.5
                            )
                    )
                }
            />

            <div className="flex h-[750px]">

                <ReaderSidebar
                    numPages={numPages}
                    currentPage={pageNumber}
                    onSelectPage={
                        setPageNumber
                    }
                />

                <div
                    className="flex-1 overflow-auto bg-slate-100 p-6"
                >

                    <Document
                        file={viewerUrl}
                        onLoadSuccess={
                            onDocumentLoadSuccess
                        }
                    >
                        <Page
                            pageNumber={
                                pageNumber
                            }
                            scale={scale}
                        />
                    </Document>

                </div>
            </div>
        </div>
    );
};

export default DocumentReader;    