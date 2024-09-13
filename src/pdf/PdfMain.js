import ParsingDataList from './ParsingData';
import PdfViewer from './PdfViewer'; // PdfViewer 파일 경로에 맞게 조정
import test_pdf from './docs/38B3_502020_F(130122).pdf'; // pdf 데이터

import { useState, useEffect } from 'react';

const PdfMain = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [boundingBox, setBoundingBox] = useState("[{'x': 227, 'y': 1330}, {'x': 1119, 'y': 1330}, {'x': 1119, 'y': 1382}, {'x': 227, 'y': 1382}]");

  useEffect(() => {
      const fetchData = async () => {
      try {
          const response = await fetch('/data/steel_data.jsonl');
          const text = await response.text();

          // 각 줄을 개별 JSON 객체로 변환
          const jsonObjects = text
          .split('\n')           // 줄 단위로 분할
          .filter(line => line)  // 빈 줄 필터링
          .map(line => JSON.parse(line));  // 각 줄을 JSON으로 파싱

          setData(jsonObjects);
      } catch (error) {
          console.error('Error fetching the JSONL file:', error);
      }
  };

  fetchData();
  }, []);

  const searchContent = (page, boundingBox) => {
    setPage(Number(page));
    setBoundingBox(boundingBox);
    console.log('page', page, 'boundingBox', boundingBox);
  }

  return (
    <div>
      <h1 className='text-lg font-semibold'>PDF Viewer Example</h1>
      {/* <PdfViewer fileUrl={test_pdf} jsonData={data} /> */}
      <PdfViewer fileUrl={test_pdf} page={page} boundingBox={boundingBox} />

      <hr />

      {
        data.map((item, index) => {
          return (
            <ParsingDataList index={index} jsonData={item} searchContent={searchContent} />
          );
        })
      }

    </div>
  );
}

export default PdfMain