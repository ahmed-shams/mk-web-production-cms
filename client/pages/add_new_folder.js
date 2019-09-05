import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_ALL_FILE_REQUEST, ADD_FILE_REQUEST } from '../reducers/file';
import { Treebeard } from 'react-treebeard';
import { Layout, Form, Input, Button } from 'antd';
const { Content, Sider } = Layout;

const NewFile = () => {
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
  }, [Files])

  useEffect(() => {
    if (fileAdded) {
      setFilename('');
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
    node.children ? setIsFolder(true) : setIsFolder(false);
    setParentId(node.fileId);
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

    dispatch({
      type: ADD_FILE_REQUEST,
      data: {
        parentId: parentId,
        name: filename,
        fileId: 100,
        userId: 1,
        content: [],
        children: []
      }
    })
  }, [parentId, filename, userId])

  return (
    <div>
      <Layout>
        <Sider>
          {Files && <Treebeard data={data} onToggle={onToggle} />}
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
    </div>
  );
};

export default NewFile;
