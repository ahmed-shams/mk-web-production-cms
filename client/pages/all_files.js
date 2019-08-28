import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_ALL_FILE_REQUEST } from '../reducers/file';

// TODO: LOAD ALL FILE AND RENDER TREE VIEW + TABLE VIEW + ADD CLICK EVENT
const AllFiles = () => {
  const dispatch = useDispatch();
  const { Files } = useSelector(state => state.file);

  useEffect(() => {
    dispatch({
      type: LOAD_ALL_FILE_REQUEST
    })
  }, [])
  console.log("files: ", Files);

  return (
    <div>
      <h1>All Files</h1>
    </div>
  );
};

export default AllFiles;
