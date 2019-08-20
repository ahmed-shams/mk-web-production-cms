import React, { useState, useCallback } from 'react';
import { useInput } from './login';
import styled from 'styled-components';
import { Input, Checkbox, Form, Button } from 'antd';

// id, nickname, password, password confirm, terms of agreement, signup button, login button
const SignUp = () => {
  const [passwordCheck, setPasswordCheck] = useState('')
  const [term, setTerm] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [termError, setTermError] = useState(false);
  const [id, onChangeId] = useInput('');
  const [nick, onChangeNick] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    console.log({id, nick, password});
  }, [password, passwordCheck, term])

  const onChangePasswordCheck = useCallback((e) => {
    setPasswordError(e.target.value !== password);
    setPasswordCheck(e.target.value)
  }, [password]);

  const onChangeTerm = useCallback((e) => {
    setTermError(false);
    setTerm(e.target.checked);
  }, []);

  return (
    <SignUpContainer>
      <Form onSubmit={onSubmit}>
        <div>
          <label htmlFor='user-id'>Id</label>
          <br />
          <Input name='user-id' value={id} required onChange={onChangeId} />
        </div>
        <div>
          <label htmlFor="user-nick">Nickname</label>
            <br />
            <Input name="user-nick" value={nick} required onChange={onChangeNick} />
          </div>
        <div>
          <label htmlFor='user-password'>Password</label>
          <br />
          <Input name='user-password' type='passowrd' required value={password} onChange={onChangePassword} />
        </div>
        <div>
          <label htmlFor="user-password-check">Type your password again</label>
          <br />
          <Input name="user-password-check" type="password" value={passwordCheck} required onChange={onChangePasswordCheck} />
        </div>
        <div>
          <Checkbox name='use-term' value={term} onChange={onChangeTerm}>Agree to follow Sehwan's order</Checkbox>
        </div>
        <div>
          <Button type='primary' htmlType='submit'>Sign Up</Button>
        </div>
      </Form>
    </SignUpContainer>
  )
};

export default SignUp;

const SignUpContainer = styled.div`
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