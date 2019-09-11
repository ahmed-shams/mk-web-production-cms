import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_ALL_FILE_REQUEST, LOAD_FILE_REQUEST, EDIT_FILE_REQUEST } from '../reducers/file';
import { Treebeard } from 'react-treebeard';
import { Layout, Form, Input, Button } from 'antd';
const { Content, Sider } = Layout;
const { TextArea } = Input; 
import Modal from  '../components/app/Modal.jsx';

// TODO: LOAD ALL FILE AND RENDER TREE VIEW + TABLE VIEW + ADD CLICK EVENT
const AllFiles = () => {
  const dispatch = useDispatch();
  const { Files, revisions } = useSelector(state => state.file);
  const [data, setData] = useState({});
  const [cursor, setCursor] = useState(false);
  // const [json, setJson] = useState({});
  // const [filename, onChangeFileName] = useInput('');
  const [filename, setFilename] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [fileId, setFileId] = useState('');
  const [fileJson, setfileJson] = useState('');
  const [showModal, setShowModal] = useState(false);
  // const [revision, setRevision] = useState([]);
  useEffect(() => {
    dispatch({
      type: LOAD_ALL_FILE_REQUEST
    })
    setData(Files);
  }, [])

  const closeModal = (e) => {
    setfileJson(fileContent);
    setShowModal(false);  
  }

  const openModal = () => {
    if(!fileContent || fileContent==='') {
      alert('Please enter JSON');
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
    setData(Object.assign({}, data))
    setFilename(node.name);
    setFileId(node.id);
    if (node.content) { setFileContent(JSON.stringify(JSON.parse(node.content), null, 4));}


    console.log("fileid: ", node.id);
    // dispatch : LOAD_FILE_REQUEST then set revision 
    dispatch({
      type: LOAD_FILE_REQUEST,
      data: {
        fileId: node.id
      }
    });
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

  // const onSubmitHandler = (e) => {
  //   e.preventDefault();
  //   alert(e.target)
  // }

  const onSubmitHandler = useCallback((e) => {
    e.preventDefault();
    // TODO: add JSON validator logic here before SAVE + PREVIEW 
    // UserId will be '1' in the testing phase so we can pass fake userId to db

    // jsonValidator(fileContent)
    // if (!isFolder) {
    //   alert("Please select the parent folder, not files");
    //   return;
    // }

    console.log("file id: ", fileId);

    dispatch({
      type: EDIT_FILE_REQUEST,
      data: {
        name: filename,
        content: JSON.parse(fileContent),
        fileId: fileId
      }
    })
  }, [filename, fileContent, fileId])

  const renderDiffView = useCallback(content => () => {
    console.log(content);
  }, [])


  const quickPreview = useCallback(content => () => {
    if(!content || content==='') {
      alert('Please enter JSON');
      return;
    }
    setfileJson(content);
    setShowModal(true);  
  }, []);
  
  // for commit
  return (
    <div>
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
            <Button type='primary' style={{marginRight: '10px'}} onClick={openModal}>Preview</Button>
            <Button type='danger' style={{marginRight: '10px'}} onClick={copyText} >Copy JSON</Button>
            <Button htmlType='submit'>Save</Button>
          </Form>

          <h2 style={{paddingTop: '50px'}} >Revision History</h2>
          <div>
            {revisions.map(el => (
              <div key={el.id} style={{paddingBottom: '10px'}}>
                <span>{el.name} - updated at {new Date(el.updatedAt).toISOString().slice(0, 20)}</span>
                <Button type='primary' style={{marginLeft:'10px', marginRight: '10px'}} onClick={renderDiffView(el.content)}>See Difference</Button>
                <Button type='danger' style={{marginRight: '10px'}} onClick={quickPreview(el.content)}>Preview</Button>
                <Button style={{marginRight: '10px'}} onClick={copyText}>Revert to this version</Button>
              </div>
            ))}
          </div>
        </Content>
      </Layout>
      {showModal && <Modal onClose={closeModal} fileJson={fileJson} copyHtml={copyText} />}
    </div>
  );
};

export default AllFiles;
