import React, { useState } from 'react'
import AuthForm from '../../components/resuable/AuthForm'
import { signInService } from '../../services/authServices';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {

  const navigate = useNavigate(null)
  const [loading, setLoading] = useState(false)

  const handleSignIn = async (values) => {
    try {
      setLoading(true)
      const response = await signInService(values);
      if (response) {
        sessionStorage.setItem('USER_AUTH_TOKEN', response.data.token);
        sessionStorage.setItem('USER_AUTH_ROLE', response.data.user.role);
        setLoading(false);
        message.success('Login success!');
        navigate('/')
      }
    } catch (err) {
      setLoading(false);
      message.error(err.response.data.data.error || err.message)
    }
  };

  return (
    <>
      <AuthForm
        type="signin"
        onFinish={handleSignIn}
        loading={loading}
      />
    </>
  )
}
