import React, { useState } from 'react'
import AuthForm from '../../components/resuable/AuthForm'
import { signUpService } from '../../services/authServices';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {

  const navigate = useNavigate(null);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (values) => {
    setLoading(true);
    try {
      const response = await signUpService(values);
      if (response) {
        setLoading(false);
        message.success('User created successfully!');
        navigate('/sign-in');
      }
    } catch (err) {
      setLoading(false);
      message.error(err.response.data.data.error || err.message)
    }
  };

  return (
    <>
      <AuthForm
        type="signup"
        onFinish={handleSignUp}
      />
    </>
  )
}
