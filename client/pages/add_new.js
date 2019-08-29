import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { useInput } from './user/login';
import styled from 'styled-components';
import Modal from  './client/components/app/modal.jsx'

const NewFile = () => {
  const [filename, onChangeFilename] = useInput('');
  const [json, onChangeJson] = useInput('');
  const [category, onChangeCategory] = useInput('');
  const dispatch = useDispatch();
  const [showModal, setModal] = useState(false);

  const onPreviewClick = useCallback((e) => {
    console.log('onPreviewClick in add_new');
    setModal(!showModal);
  }, [showModal]);

  const onSubmitHandler = useCallback((e) => {
    e.preventDefault();
    dispatch({
      type: ADD_POST_REQUEST,
      data: {
        filename,
        json,
        category
      }
    })
  }, [filename, json, category]);

  useEffect(() => {
    if (me) {
      alert("Navigating back to main page after sign up");
      Router.push('/')
    }
  }, [me, me.id])

  return (
    <Container>
      <Form onSubmit={onSubmitHandler} id="text-form">
        <div>
          <label htmlFor='filename' >File name: </label>
          <Input name='filename' value={filename} onChange={onChangeFilename} />
        </div>
        <div>
          <label htmlFor='json'>CONTENT</label>
          <br />
          <Input name='json' value={json} onChange={onChangeJson} />
        </div>

        <div>
          <label htmlFor='category'>Category</label>
          <br />
          <Input name='category' value={category} onChange={onChangeCategory} />
        </div>
        <div style={{marginTop: '15px'}}>
          <Button type='primary' htmlType='submit'>Save</Button>
          <Button onClick={onPreviewClick} showModal={showModal}>Preview</Button>
        </div>
      </Form>
    </Container>
    <Modal show={showModal}> 
    </Modal>
  )
};

export default NewFile;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
