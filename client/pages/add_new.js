<<<<<<< HEAD
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { useInput } from './user/login';
import styled from 'styled-components';
import Modal from  './client/components/app/modal.jsx'
=======
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_ALL_FILE_REQUEST, ADD_FILE_REQUEST } from '../reducers/file';
import { Treebeard } from 'react-treebeard';
import { Layout, Form, Input, Button, Radio } from 'antd';
const { Content, Sider } = Layout;
const { TextArea } = Input; 
>>>>>>> master

const NewFile = () => {
  const dispatch = useDispatch();
  const [showModal, setModal] = useState(false);

  const onPreviewClick = useCallback((e) => {
    console.log('onPreviewClick in add_new');
    setModal(!showModal);
  }, [showModal]);

  const { Files } = useSelector(state => state.file);
  const [data, setData] = useState({});
  const [cursor, setCursor] = useState(false);
  const [importMode, setImportMode] = useState('json');
  const [filename, setFilename] = useState('');
  const [fileContent, setFileContent] = useState('');
  
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


    if (importMode === 'json') {
      console.log("json mode: --- do nothing")
    } else if (importMode === 'import') {
      console.log("import mode - get content.. not node")
      setFilename(node.name);
      setFileContent(JSON.stringify(node, null, 4));
    }

    // setJson(node);
    // dispatch({
    //   type: GET_A_FILE_REQUEST,
    //   data: node.id
    // })
  }
  
  const onChangeFileName = useCallback((e) => {
    setFilename(e.target.value);
  });


  const onChangeFileContent = useCallback((e) => {
    setFileContent(e.target.value);
  });

  const onChangeRadio = useCallback((e) => {
    alert(e.target.value);
    setImportMode(e.target.value);
  })

  const onSubmitHandler = (e) => {
    e.preventDefault();
    alert(e.target)
    dispatch({
      type: ADD_FILE_REQUEST,
      // data: {
      // }
    })
  }

  const copyText = () => {
    navigator.clipboard.writeText(fileContent).then(()=>{
      alert('Copying to clipboard was successful');
    }, (e) => {
      alert('error happened while trying to copy josn. please try again');
    })
  }

  useEffect(() => {
    if (me) {
      alert("Navigating back to main page after sign up");
      Router.push('/')
    }
  }, [me, me.id])

  return (
    <div>
      <h1>Add New File</h1>      
      <Layout>
        <Sider>
          {Files && <Treebeard data={data} onToggle={onToggle} />}
        </Sider>
        <Content style={{padding:'20px'}}>
          <h1>File Content</h1>
          <Form onSubmit={onSubmitHandler}>
            <label><strong>File Name</strong></label>
            <Input value={filename} onChange={onChangeFileName} />
            <label><strong>Content</strong></label>
            <div style={{padding: '10px 0'}}>
              <Radio.Group defaultValue="a" buttonStyle="solid" onChange={onChangeRadio}>
                <Radio.Button value="json">JSON MODE</Radio.Button>
                <Radio.Button value="import">Import Mode</Radio.Button>
              </Radio.Group>
            </div>
            <TextArea row={50} value={fileContent} onChange={onChangeFileContent} style={{minHeight: '500px'}} />
            <Button type='primary' style={{marginRight: '10px'}}>Preview</Button>
            <Button type='danger' style={{marginRight: '10px'}} onClick={copyText} >Copy JSON</Button>
            <Button htmlType='submit'>Save</Button>
          </Form>
        </Content>
      </Layout>
      <Modal show={showModal} /> 
    </div>
  );
};

export default NewFile;
