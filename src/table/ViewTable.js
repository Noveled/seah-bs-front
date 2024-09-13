const ViewTable = ({htmlTableTag}) => {
  return (
    <div>
      {htmlTableTag && (
        <div
          style={{ marginTop: '20px' }}
          dangerouslySetInnerHTML={{ __html: htmlTableTag }} // HTML을 직접 삽입하여 렌더링
        />
      )}
    </div>
  );
};

export default ViewTable;
