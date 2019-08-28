import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_ALL_FILE_REQUEST } from '../reducers/file';
import { Treebeard } from 'react-treebeard';
import { Layout, Form, Input, Button } from 'antd';
const { Content, Sider } = Layout;
const { TextArea } = Input; 


// TODO: LOAD ALL FILE AND RENDER TREE VIEW + TABLE VIEW + ADD CLICK EVENT
const AllFiles = () => {
  const dispatch = useDispatch();
  const { Files } = useSelector(state => state.file);
  const [data, setData] = useState({});
  const [cursor, setCursor] = useState(false);
  const [json, setJson] = useState({});
  
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

    setJson(node);
    // dispatch({
    //   type: GET_A_FILE_REQUEST,
    //   data: node.id
    // })
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    alert(e.target)
  }
    
  return (
    <div>
      <h1>All Files</h1>
      <hr />
      
      <Layout>
        <Sider>
          {Files && <Treebeard data={data} onToggle={onToggle} />}
        </Sider>
        <Content style={{padding:'20px'}}>
          <h1>File Content</h1>
          <Form onSubmit={onSubmitHandler}>
            <label>File Name --TODO: don't display anything if folder is clicked</label>
            <Input value={json.name} />
            <label>Content</label>
            <TextArea row={50} value={JSON.stringify(json)} style={{minHeight: '500px'}}/>
          </Form>
          <Button type='primary' htmlType='submit' style={{marginRight: '10px'}}>Preview</Button>
          <Button>Save</Button>
        </Content>
      </Layout>
    </div>
  );
};

export default AllFiles;
