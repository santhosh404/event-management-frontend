import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { Link } from 'react-router-dom';

const AuthForm = ({ type, onFinish, loading }) => {
    return (
        <div className="max-w-md mx-auto bg-white p-6 shadow-lg rounded-md">
            <h2 className="text-2xl font-[900] text-center mb-4">
                {type === 'signup' ? 'Sign Up' : 'Sign In'}
            </h2>

            <Form
                name={type}
                onFinish={onFinish}
                layout="vertical"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input placeholder="Email" />
                </Form.Item>



                {type === 'signup' && (
                    <>
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            label="Phone Number"
                            name="phoneNumber"
                            rules={[{ required: true, message: 'Please input your phone number!' }]}
                        >
                            <Input placeholder="Phone number" />
                        </Form.Item>
                    </>
                )}

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password placeholder="Password" />
                </Form.Item>

                {
                    type === 'signin' && (
                        <Link to={'/forgot-password'} className='mb-5 flex justify-end text-blue-500 cursor-pointer underline'>Forgot Password?</Link> 
                    )
                }


                <Form.Item>
                    <Button type="primary" htmlType="submit" className="w-full" loading={loading}>
                        {type === 'signup' ? 'Sign Up' : 'Sign In'}
                    </Button>
                </Form.Item>

                {
                    type === "signup" ? (
                        <p className='flex justify-center my-2'>Already Have Account? <Link to={'/sign-in'} className='ml-2 text-blue-500 cursor-pointer underline'>sign in</Link> </p>
                    ) : (
                        <p className='flex justify-center my-2'>Don't Have Account? <Link to={'/sign-up'} className='ml-2 text-blue-500 cursor-pointer underline'>sign up</Link> </p>

                    )
                }
            </Form>
        </div>
    );
};

export default AuthForm;
