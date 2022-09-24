import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Input, Form, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import PageHeader from '@iso/components/utility/pageHeader';
import IntlMessages from '@iso/components/utility/intlMessages';
import userActions from '@iso/redux/user/actions';
import { BoxWrapper, BoxHeader } from '../User.styles';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
    lg: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
    lg: { span: 14 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 16, offset: 8 },
    lg: { span: 14, offset: 6 },
  },
};

const { createUserAction, clearNotificationAction } = userActions;

export default function UserCreate() {
  const [form] = Form.useForm();

  const history = useHistory();
  const dispatch = useDispatch();
  const { message, isSuccess } = useSelector((state) => state.User);

  const onFinish = async (values) => {
    dispatch(createUserAction(values));
  };

  useEffect(() => {
    if (message) {
      const notiType = isSuccess ? 'success' : 'error';
      const messageType = isSuccess ? 'Success' : 'Error';

      notification[notiType]({
        message: messageType,
        description: message,
      });
      dispatch(clearNotificationAction());
    }
    if (isSuccess) {
      history.push('/users');
    }
  }, [message]);

  return (
    <LayoutWrapper>
      <PageHeader>
        <IntlMessages id='user.createUser' />
      </PageHeader>

      <BoxWrapper>
        <BoxHeader>
          <Link to='/users'>
            <Button color='primary'>
              <IntlMessages id='commons.back' />
            </Button>
          </Link>
        </BoxHeader>

        <Form
          {...formItemLayout}
          form={form}
          name='createUser'
          onFinish={onFinish}
        >
          <Form.Item
            name='name'
            label='Name'
            rules={[
              {
                required: true,
                message: 'Please input your name!',
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name='email'
            label='E-mail'
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input autoComplete='true' />
          </Form.Item>

          <Form.Item name='phone' label='Phone Number' default=''>
            <Input autoComplete='true' />
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type='primary' htmlType='submit'>
              <IntlMessages id='commons.save' />
            </Button>
          </Form.Item>
        </Form>
      </BoxWrapper>
    </LayoutWrapper>
  );
}
