import { useState, useEffect, useRef } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';

import 'react-pdf/dist/cjs/Page/TextLayer.css';
import 'react-pdf/dist/cjs/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PdfViewer = ({ fileUrl, page, boundingBox }) => {

  // 하이라이트 기능
  const [pageLoaded, setPageLoaded] = useState(false);
  const highlightRef = useRef(null); // 하이라이트 박스를 렌더링할 ref
  const [scale, setScale] = useState(0.48); // PDF 페이지의 스케일


  const onDocumentLoadSuccess = (page) => {
    console.log('page 갱신', page);
  };

  // 하이라이트 기능
  useEffect(() => {
    drawHighlightBoxes();
    console.log('박스 다시 그리기');
  }, [boundingBox]);

  const drawHighlightBoxes = () => {
    const container = highlightRef.current;
    container.innerHTML = ''; // 기존 박스 제거

    const box = document.createElement('div');
    box.classList.add('highlight-box');

    console.log('boundingBox', boundingBox);
    const formattedString = boundingBox.replace(/'/g, '"'); // 작은 따옴표를 큰 따옴표로 변환
    const jsonBoundingBox = JSON.parse(formattedString);

    // 구조 분해 할당을 사용하여 각 좌표 값 분리
    const [topLeft, topRight, , bottomLeft] = jsonBoundingBox;
    const x = topLeft.x * scale;
    const y = topLeft.y * scale;
    const width = (topRight.x - topLeft.x) * scale;
    const height = (bottomLeft.y - topLeft.y) * scale;

    box.style.left = `${x}px`;
    box.style.top = `${y}px`;
    box.style.width = `${width}px`;
    box.style.height = `${height}px`;

    container.appendChild(box);
  };

  return (
    <div>
      <div id="pdf-container" style={{ position: 'relative' }}>
        <Document
          file={fileUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={console.error}
        >
          <Page pageNumber={page}
                scale={1}
                onRenderSuccess={() => setPageLoaded(true)}
          />
        </Document>
        <div ref={highlightRef} style={{ position: 'absolute', top: 0, left: 0 }} />
        <p>
          Page : {page}
        </p>
      </div>
      
    </div>
  );
};

export default PdfViewer;
