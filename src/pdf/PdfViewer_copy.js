import { useState, useEffect, useRef } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';

import 'react-pdf/dist/cjs/Page/TextLayer.css';
import 'react-pdf/dist/cjs/Page/AnnotationLayer.css';

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.min.mjs`;
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// const PdfViewer = ({ fileUrl, jsonData }) => {
const PdfViewer = ({ fileUrl, page, boundingBox }) => {
  // console.log(fileUrl);
  // console.log('data :', jsonData);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  // 하이라이트 기능
  const [pageLoaded, setPageLoaded] = useState(false);
  const highlightRef = useRef(null); // 하이라이트 박스를 렌더링할 ref
  const [scale, setScale] = useState(0.48); // PDF 페이지의 스케일


  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
      setPageLoaded(false);
    }
  };

  const goToPrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
      setPageLoaded(false);
    }
  };

  // 하이라이트 기능
  useEffect(() => {
    if (pageLoaded) {
        drawHighlightBoxes(jsonData);
    }
  }, [pageLoaded]);

  const drawHighlightBoxes = (elements) => {
    const container = highlightRef.current;
    container.innerHTML = ''; // 기존 박스 제거
    elements.forEach(element => {
        if (parseInt(element.Page) === pageNumber) { // 현재 페이지의 요소만 그리기
            const box = document.createElement('div');
            box.classList.add('highlight-box');
            // const [topLeft, topRight, , bottomLeft] = element.bounding_box;
            // 배열을 JSON 문자열로 변환
            // 문자열을 배열로 변환하기 위해 형식을 수정한 후 JSON.parse() 실행
            const formattedString = element.BoundingBox.replace(/'/g, '"'); // 작은 따옴표를 큰 따옴표로 변환
            const jsonBoundingBox = JSON.parse(formattedString);

            // 구조 분해 할당을 사용하여 각 좌표 값 분리
            // const [topLeft, topRight, bottomRight, bottomLeft] = boundingBox;
            const [topLeft, topRight, , bottomLeft] = jsonBoundingBox;
            // console.log('typeof(jsonBoundingBox)', typeof(jsonBoundingBox))
            // console.log(topLeft, topRight, bottomLeft)
            const x = topLeft.x * scale;
            const y = topLeft.y * scale;
            const width = (topRight.x - topLeft.x) * scale;
            const height = (bottomLeft.y - topLeft.y) * scale;
            // const x = topLeft.x;
            // const y = topLeft.y;
            // const width = (topRight.x - topLeft.x);
            // const height = (bottomLeft.y - topLeft.y);

            box.style.left = `${x}px`;
            box.style.top = `${y}px`;
            box.style.width = `${width}px`;
            box.style.height = `${height}px`;

            container.appendChild(box);
        }
    });
  };

  return (
    <div>
      <div id="pdf-container" style={{ position: 'relative' }}>
        <Document
          file={fileUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={console.error}
        >
          <Page pageNumber={pageNumber}
                scale={1}
                onRenderSuccess={() => setPageLoaded(true)}
          />
        </Document>
        <div ref={highlightRef} style={{ position: 'absolute', top: 0, left: 0 }} />
      </div>
      <div>
        <p>
          Page {pageNumber} of {numPages}
        </p>
        <button onClick={goToPrevPage} disabled={pageNumber <= 1}>
          Previous
        </button>
        <button onClick={goToNextPage} disabled={pageNumber >= numPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PdfViewer;
