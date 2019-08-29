import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_ALL_FILE_REQUEST, ADD_FILE_REQUEST } from '../reducers/file';
import { Treebeard } from 'react-treebeard';
import { Layout, Form, Input, Button, Radio } from 'antd';
import Modal from  '../components/app/Modal.jsx';
const { Content, Sider } = Layout;
const { TextArea } = Input; 

const NewFile = () => {
  const dispatch = useDispatch();
  const { Files } = useSelector(state => state.file);
  const { userId } = useSelector(state => state.user);
  const [data, setData] = useState({});
  const [cursor, setCursor] = useState(false);
  const [importMode, setImportMode] = useState('1');
  const [filename, setFilename] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [fileId, setFileId] = useState('');
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    dispatch({
      type: LOAD_ALL_FILE_REQUEST
    })
    setData(Files);
  }, [Files])

  const toggleModal = (e) => {
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

    if (importMode === '1') {
      console.log("json mode")
    } else if (importMode === '2') {
      console.log("import mode - set content")
      setFilename(node.name);
      setFileContent(JSON.stringify(node.content, null, 4));
      setFileId(node.fileId);
    }
  }
  
  const onChangeFileName = useCallback((e) => {
    setFilename(e.target.value);
  });

  const onChangeFileContent = useCallback((e) => {
    setFileContent(e.target.value);
  });

  const onChangeRadio = useCallback((e) => {
    if (e.target.value === '1') {
      alert("JSON mode selected");
    } else if (e.target.value === '2') {
      alert("Import mode selected")
    }
    setImportMode(e.target.value);
  })

  const onSubmitHandler = useCallback((e) => {
    e.preventDefault();
    // TODO: add JSON validator logic here before SAVE + PREVIEW
    // UserId will be '1' in the testing phase so we can pass fake userId to db
    // jsonValidator()
    dispatch({
      type: ADD_FILE_REQUEST,
      data: {
        parentId: fileId,
        name: filename,
        content: [fileContent],
        userId: '1'
      }
    })
  }, [fileId, filename, fileContent, userId])

  // const jsonValidator = (content) => {
  //   console.log(content)
  // }

  const copyText = () => {
    navigator.clipboard.writeText(fileContent).then(()=>{
      alert('Copying to clipboard was successful');
    }, (e) => {
      alert('error happened while trying to copy josn. please try again');
    })
  }

  return (
    <div>
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
                <Radio.Button value="1">JSON MODE</Radio.Button>
                <Radio.Button value="2">Import Mode</Radio.Button>
              </Radio.Group>
            </div>
            <TextArea row={50} value={fileContent} onChange={onChangeFileContent} style={{minHeight: '500px'}} />
            <Button type='primary' style={{marginRight: '10px'}} onClick={toggleModal}>Preview</Button>
            <Button type='danger' style={{marginRight: '10px'}} onClick={copyText} >Copy JSON</Button>
            <Button htmlType='submit'>Save</Button>
          </Form>
        </Content>
      </Layout>
      <Modal show={showModal} onClose={toggleModal} fileContent={fileContent}/> 
    </div>
  );
};

export default NewFile;
