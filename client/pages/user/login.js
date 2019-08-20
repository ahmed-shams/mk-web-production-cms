import React, { useState, useCallback } from 'react';
import { Input, Button, Form } from 'antd';


// custom hook for making useState easier
const useInput = (initialValue = null) => {
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
  const [password, onChangePassowrd] = useInput('');

  return (
    <Form>
      <div>
        <label htmlFor='user-id'>id</label>
        <br />
        <input name='user-id' value={id} onChange={onChangeId} required />
      </div>
      <div>
        <label htmlFor='user-password'>id</label>
        <br />
        <input name='user-password' value={password} onChange={onChangePassword} required />
      </div>
      <div style={{marginTop: '10px'}}>
        <Button type='primary' htmlType='submit'>Submit</Button>
        <Link href='/signup'><a><Button>Sign Up</Button></a></Link>
      </div>
    </Form>
  )
};

export default Login;