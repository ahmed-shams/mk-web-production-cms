import React from 'react';

const FileDetail = ({ fileId }) => {
  return (
    <div>
      <h1>FILE DETAIL</h1>
      <h2>FILE ID: {fileId} </h2>
    </div>
  )
}

export default FileDetail;

FileDetail.getInitialProps = async (context) => {
  return { fileId: context.query.id }
}

  