import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_ALL_FILE_REQUEST, ADD_FILE_REQUEST } from '../reducers/file';
import { Treebeard } from 'react-treebeard';
import { Layout, Form, Input, Button, Radio } from 'antd';
import Modal from  '../components/app/Modal.jsx';
const { Content, Sider } = Layout;
const { TextArea } = Input; 
import { jsonValidator } from '../utils';

const NewFile = () => {
  const dispatch = useDispatch();
  const { Files, fileAdded } = useSelector(state => state.file);
  const { userId } = useSelector(state => state.user);
  const [cursor, setCursor] = useState(false);
  const [importMode, setImportMode] = useState('1');
  const [filename, setFilename] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [parentId, setParentId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [fileJson, setfileJson] = useState('');
  const [isFolder, setIsFolder] = useState(false);

  useEffect(() => {
    if (fileAdded) {
      setFileContent('');
      setFilename('');
    }
  }, [fileAdded === true]);

  const closeModal = (e) => {
    setfileJson('')
    setShowModal(false);  
  }

  const openModal = (e) => {
    if(!fileContent || fileContent==='') {
      alert('Please enter JSON');
      return;
    }
    if(!jsonValidator(fileContent)) {
      alert("there is error in JSON");
      return;
    } 
    
    setfileJson(fileContent);
    setShowModal(true);  
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
    // setData(Object.assign({}, data))
    node.isFolder ? setIsFolder(true) : setIsFolder(false);

    if (importMode === '1') {
      setParentId(node.id);
      console.log("parentId: ", parentId);
    } else if (importMode === '2') {
      if (node.content.length === 0) {
        setParentId(node.id);
        console.log("parentId: ", parentId);
        return 
      }
      if (confirm(`import ${node.name}?`)) { // ok
        if (fileContent === '') { // we wont' check the validity of JSON here when importing it. We can assume it's valid because we are checking it when we save it.
          // setFileContent(JSON.stringify(node.content, null, 4));
          setFileContent(JSON.stringify(JSON.parse(node.content), null, 4));
        } else {
          const prev = JSON.parse(fileContent);

          JSON.parse(node.content).forEach(el => {
            prev.push(el)
          })
          setFileContent(JSON.stringify(prev, null, 4));
        }
      }
      return
    }
  }
  
  const onChangeFileName = useCallback((e) => {
    setFilename(e.target.value);
  });

  const onChangeFileContent = useCallback((e) => {
    setFileContent(e.target.value);
  });

  const onChangeRadio = useCallback((e) => {
    setImportMode(e.target.value);
  });

  const onSubmitHandler = useCallback((e) => {
    e.preventDefault();
    if(!jsonValidator(fileContent)) {
      alert("there is error in JSON");
      return;
    } 

    dispatch({
      type: ADD_FILE_REQUEST,
      data: {
        parentId: parentId,
        name: filename,
        content: JSON.parse(fileContent),
        userId: userId,
        isFolder: false
      }
    })
  }, [parentId, filename, fileContent, userId])

  
  const copyText = () => {
    navigator.clipboard.writeText(fileContent).then(()=>{
      alert('Copying to clipboard was successful');
    }, (e) => {
      alert('error happened while trying to copy josn. please try again');
    })
  }

  return (
    <Layout hasSider={true}>
      <Sider>
        {Files && <Treebeard data={Files} onToggle={onToggle} />}
      </Sider>
      <Content style={{padding:'20px'}}>
        <h1>File Content</h1>
        <Form onSubmit={onSubmitHandler}>
          <label><strong>File Name</strong></label>
          <Input value={filename} onChange={onChangeFileName} required />
          <label><strong>Content</strong></label>
          <div style={{padding: '10px 0'}}>
            <Radio.Group defaultValue="1" buttonStyle="solid" onChange={onChangeRadio}>
              <Radio.Button value="1">JSON MODE</Radio.Button>
              <Radio.Button value="2">Import Mode</Radio.Button>
            </Radio.Group>
          </div>
          <TextArea row={50} value={fileContent} onChange={onChangeFileContent} style={{minHeight: '600px'}} />
          <Button type='primary' style={{marginRight: '10px'}} onClick={openModal}>Preview</Button>
          <Button type='danger' style={{marginRight: '10px'}} onClick={copyText} >Copy JSON</Button>
          <Button htmlType='submit'>Save</Button>
        </Form>
      </Content>
      {showModal && <Modal onClose={closeModal} fileJson={fileJson} />}
    </Layout>
  );
};

NewFile.getInitialProps = (context) => {
  context.store.dispatch({
    type: LOAD_ALL_FILE_REQUEST
  })
}

export default NewFile;
