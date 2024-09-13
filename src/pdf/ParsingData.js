import React from 'react'

const ParsingDataList = ({ index, jsonData, searchContent }) => {
  // console.log(jsonData);
  return (
    <div>
      <div key={index} className='flex gap-3'>
        <p>key : {jsonData.Name}</p>
        <p>page : {jsonData.Page}</p>
        {/* <p>vlaue: {jsonData.Specification}</p> */}
        <button onClick={() => searchContent(jsonData.Page, jsonData.BoundingBox)}>위치 보기</button>
      </div>
    </div>
  )
}

export default ParsingDataList