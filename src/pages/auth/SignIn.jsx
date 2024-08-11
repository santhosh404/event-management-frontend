import React from 'react'
import AuthForm from '../../components/resuable/AuthForm'
import { signInService } from '../../services/authServices';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {

  const navigate = useNavigate(null)

  const handleSignIn = async (values) => {
    try {
      const response = await signInService(values);
      if (response) {
        sessionStorage.setItem('USER_AUTH_TOKEN', response.data.token);
        sessionStorage.setItem('USER_AUTH_ROLE', response.data.user.role);
        message.success('Login success!');
        navigate('/')
      }
    } catch (err) {
      message.error(err.response.data.data.error || err.message)
    }
  };

  return (
    <>
      <AuthForm
        type="signin"
        onFinish={handleSignIn}
      />
    </>
  )
}
