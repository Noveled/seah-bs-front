import React, { useState } from 'react';
import ViewTable from './ViewTable';

const InputTable = () => {
  const [text, setText] = useState('');
  const [tableData, setTableData] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(text); // 텍스트를 제출 시 콘솔에 출력 (나중에 필요한 로직으로 대체)
    setTableData(text);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows="10"  // 세로 범위 (행 수)
          cols="50"  // 가로 범위 (열 수)
          placeholder="Type your text here"
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      <ViewTable htmlTableTag={tableData} />
    </div>
  );
};

export default InputTable;
