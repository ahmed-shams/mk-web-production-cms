import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_ALL_FILE_REQUEST, ADD_FILE_REQUEST } from '../reducers/file';
import { Treebeard } from 'react-treebeard';
import { Layout, Form, Input, Button } from 'antd';
const { Content, Sider } = Layout;

const NewFile = () => {
  const dispatch = useDispatch();
  const { Files } = useSelector(state => state.file);
  const { userId } = useSelector(state => state.user);
  const [data, setData] = useState({});
  const [cursor, setCursor] = useState(false);
  const [filename, setFilename] = useState('');
  const [fileId, setFileId] = useState('');
  
  useEffect(() => {
    dispatch({
      type: LOAD_ALL_FILE_REQUEST
    })
    setData(Files);
  }, [Files])

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
    setFileId(node.fileId)
  }
  
  const onChangeFileName = useCallback((e) => {
    setFilename(e.target.value);
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: ADD_FILE_REQUEST,
      data: {
        parentId: fileId,
        name: filename,
        content: [],
        userId: userId,
        children: []
      }
    });
  };

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
