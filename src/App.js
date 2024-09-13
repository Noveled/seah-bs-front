import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// 각 페이지의 컴포넌트 불러오기
import PdfMain from './pdf/PdfMain';
import InputTable from './table/InputTable';
import ViewTable from './table/ViewTable';

function App() {
  return (
    <div className="App">

    <Router>
      {/* 앱 이동을 위한 Navi */}
      <nav>
        <ul className='flex gap-4'>
          <li><Link to="/">PDF Main</Link></li>
          <li><Link to="/input-table">Input Table</Link></li>
          {/* <li><Link to="/view-table">View Table</Link></li> */}
        </ul>
      </nav>

      {/* 실제 앱 컴포넌트 */}
      <Routes>
          {/* 각각의 페이지를 설정 */}
          <Route path="/" element={<PdfMain />} />
          <Route path="/input-table" element={<InputTable />} />
          {/* <Route path="/view-table" element={<ViewTable />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
