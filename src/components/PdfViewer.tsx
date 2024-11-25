import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PdfViewerProps {
  url: string;
}

export default function PdfViewer({ url }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div className="flex flex-col items-center">
      <Document
        file={url}
        onLoadSuccess={onDocumentLoadSuccess}
        className="border border-gray-300 rounded-lg overflow-hidden"
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <div className="flex items-center gap-4 mt-4">
        <button
          onClick={() => setPageNumber(page => Math.max(page - 1, 1))}
          disabled={pageNumber <= 1}
          className="px-4 py-2 bg-primary text-white rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <p>
          Page {pageNumber} of {numPages}
        </p>
        <button
          onClick={() => setPageNumber(page => Math.min(page + 1, numPages || 1))}
          disabled={pageNumber >= (numPages || 1)}
          className="px-4 py-2 bg-primary text-white rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}