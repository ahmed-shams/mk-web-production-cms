import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_ALL_FILE_REQUEST } from '../reducers/file';
import { Treebeard } from 'react-treebeard';
import { Layout, Form, Input, Button } from 'antd';
const { Content, Sider } = Layout;
const { TextArea } = Input; 
import { useInput } from './user/login';
import Modal from  '../components/app/Modal.jsx';

// TODO: LOAD ALL FILE AND RENDER TREE VIEW + TABLE VIEW + ADD CLICK EVENT
const AllFiles = () => {
  const dispatch = useDispatch();
  const { Files } = useSelector(state => state.file);
  const [data, setData] = useState({});
  const [cursor, setCursor] = useState(false);
  // const [json, setJson] = useState({});
  // const [filename, onChangeFileName] = useInput('');
  const [filename, setFilename] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [fileJson, setfileJson] = useState('');
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    dispatch({
      type: LOAD_ALL_FILE_REQUEST
    })
    setData(Files);
  }, [Files])

  const toggleModal = (e) => {
    setfileJson(fileContent);
    setShowModal(!showModal);  
  }

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

    // setJson(node);
    // dispatch({
    //   type: GET_A_FILE_REQUEST,
    //   data: node.id
    // })
    setFilename(node.name);
    if (node.content) { setFileContent(JSON.stringify(node.content, null, 4));}
  }
  
  const onChangeFileName = useCallback((e) => {
    setFilename(e.target.value);
  });

  const onChangeFileContent = useCallback((e) => {
    setFileContent(e.target.value);
  });

  const copyText = () => {
    navigator.clipboard.writeText(fileContent).then(()=>{
      alert('Copying to clipboard was successful');
    }, (e) => {
      alert('error happened while trying to copy josn. please try again');
    })
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    alert(e.target)
  }
    
  return (
    <div>
      <h1>All Files</h1>      
      <Layout>
        <Sider>
          {Files && <Treebeard data={data} onToggle={onToggle} />}
        </Sider>
        <Content style={{padding:'20px'}}>
          <h1>File Content</h1>
          <Form onSubmit={onSubmitHandler}>
            <label>File Name --TODO: don't display anything if folder is clicked</label>
            <Input value={filename} onChange={onChangeFileName} />
            <label>Content</label>
            <TextArea row={50} value={fileContent} onChange={onChangeFileContent} style={{minHeight: '500px'}} />
            <Button type='primary' style={{marginRight: '10px'}} onClick={toggleModal}>Preview</Button>
            <Button type='danger' style={{marginRight: '10px'}} onClick={copyText} >Copy JSON</Button>
            <Button htmlType='submit'>Save</Button>
          </Form>

          <h2 style={{paddingTop: '50px'}} >Revision History</h2>
          <div>
            <p>Editted | </p>
          </div>
        </Content>

      </Layout>
      <Modal show={showModal} onClose={toggleModal} fileJson={fileJson}/> 
    </div>
  );
};

export default AllFiles;
