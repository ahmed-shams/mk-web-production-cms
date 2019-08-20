import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { Input, Button, Form } from 'antd';
import styled from 'styled-components';


// custom hook for making useState easier
export const useInput = (initialValue = null) => {
  const [value, setter] = useState(initialValue);
  const handler = useCallback(
    (e) => { 
      setter(e.target.value);
    }, []
  )
  return [value, handler]
}

const Login = () => {
  const [id, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onSubmitForm = useCallback((e) => {
    e.preventDefault();
    console.log({id, password});
  }, [id, password])

  return (
    <LoginContainer>
      <Form onSubmit={onSubmitForm} styled={{ padding: '10px' }}>
        <div>
          <label htmlFor='user-id'>id</label>
          <br />
          <Input name='user-id' value={id} onChange={onChangeId} required />
        </div>
        <div>
          <label htmlFor='user-password'>Password</label>
          <br />
          <Input name='user-password' value={password} onChange={onChangePassword} required />
        </div>
        <div style={{marginTop: '10px'}}>
          <Button type='primary' htmlType='submit'>Login</Button>
          <Link href='/signup'><a><Button>Sign Up</Button></a></Link>
        </div>
      </Form>
    </LoginContainer>
  )
};

export default Login;

const LoginContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;