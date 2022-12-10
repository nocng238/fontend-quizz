import React, { useEffect, useState } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Checkbox, Button, notification } from 'antd';

import IntlMessages from '@iso/components/utility/intlMessages';
import authAction from '@iso/redux/auth/actions';
import SignInStyleWrapper from './SignIn.styles';
import siteConfig from '@iso/config/site.config';

const { login, clearNotificationAction } = authAction;

export default function SignIn() {
  const [form] = Form.useForm();
  let location = useLocation();
  const dispatch = useDispatch();

  const { idToken } = useSelector((state) => state.Auth);

  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  useEffect(() => {
    if (idToken) {
      setRedirectToReferrer(true);
    }
  }, [idToken]);

  const handleLogin = async (values) => {
    console.log(values);
    await dispatch(login(values));
  };

  let { from } = location.state || { from: { pathname: '/' } };

  if (redirectToReferrer) {
    return <Redirect to={from} />;
  }
  return (
    <SignInStyleWrapper className='isoSignInPage'>
      <div className='isoLoginContentWrapper'>
        <div className='isoLoginContent'>
          <div className='isoLogoWrapper'>
            <Link to='/'>{siteConfig.siteName}</Link>
          </div>
          <div className='isoSignInForm'>
            <Form form={form} name='signin' onFinish={handleLogin}>
              <Form.Item
                name='userName'
                className='isoInputWrapper'
                rules={[
                  {
                    required: true,
                    message: 'Please input your username!',
                  },
                ]}
              >
                <Input placeholder='Username' />
              </Form.Item>
              <Form.Item
                name='password'
                className='isoInputWrapper'
                rules={[
                  {
                    required: true,
                    message: 'Please input your password',
                    whitespace: true,
                  },
                ]}
              >
                <Input.Password placeholder='Password' />
              </Form.Item>
              <Form.Item className='isoInputWrapper isoLeftRightComponent'>
                <Checkbox>
                  <IntlMessages id='page.signInRememberMe' />
                </Checkbox>
              </Form.Item>
              <Form.Item className='isoInputWrapper'>
                <Button type='primary' htmlType='submit'>
                  <IntlMessages id='page.signInButton' />
                </Button>
              </Form.Item>
            </Form>
            <div className='mt-10'>
              <Link to='/forgot-password'>
                <IntlMessages id='page.forgetPassSubTitle' />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SignInStyleWrapper>
  );
}
