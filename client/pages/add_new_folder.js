import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_ALL_FILE_REQUEST, ADD_FILE_REQUEST } from '../reducers/file';
import { Treebeard } from 'react-treebeard';
import { Layout, Form, Input, Button } from 'antd';
import { isEmpty } from '../utils';
const { Content, Sider } = Layout;

const NewFolder = () => {
  const dispatch = useDispatch();
  const { Files, fileAdded } = useSelector(state => state.file);
  const { userId } = useSelector(state => state.user);
  const [data, setData] = useState({});
  const [cursor, setCursor] = useState(false);
  const [filename, setFilename] = useState('');
  const [isFolder, setIsFolder] = useState(false);
  const [parentId, setParentId] = useState('');
  
  useEffect(() => {
    dispatch({
      type: LOAD_ALL_FILE_REQUEST
    })
    setData(Files);
    if (isEmpty(Files)) { // handle the edge case: there's no folder or file at all
      setParentId(0);
      setIsFolder(true);
    }
  }, [])

  useEffect(() => {
    if (fileAdded) {
      setFilename('');
      setData(Files);
    }
  }, [fileAdded]);

  const onToggle = (node, toggled) => {
    if (cursor) {
      cursor.active = false;
    }
    node.active = true;
    if (node.children) {
      node.toggled = toggled;
    }
    setCursor(node);
    setData(Object.assign({}, data))
    node.isFolder ? setIsFolder(true) : setIsFolder(false);
    setParentId(node.id);
  }

  const onChangeFileName = useCallback((e) => {
    setFilename(e.target.value);
  });

  const onSubmitHandler = useCallback((e) => {
    e.preventDefault();
    if (!isFolder) {
      alert("Please select the parent folder, not files");
      return;
    }

    // console.log("on submi handler: ", userId);
    dispatch({
      type: ADD_FILE_REQUEST,
      data: {
        parentId: parentId,
        name: filename,
        userId: userId,
        content: [],
        isFolder: true
      }
    })
  }, [parentId, filename, userId])

  return (
    <Layout hasSider={true}>
      <Sider>
        {Files && <Treebeard data={Files} onToggle={onToggle} />}
      </Sider>
      <Content style={{padding:'20px'}}>
        <h1>Folder Content</h1>
        <Form onSubmit={onSubmitHandler}>
          <label><strong>Folder Name</strong></label>
          <Input value={filename} onChange={onChangeFileName} />
          <Button htmlType='submit'>Save</Button>
        </Form>
      </Content>
    </Layout>
  );
};

export default NewFolder;
