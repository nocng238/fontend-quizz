import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, notification, Select } from 'antd';
import { Link, useHistory, useParams } from 'react-router-dom';

import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import PageHeader from '@iso/components/utility/pageHeader';
import IntlMessages from '@iso/components/utility/intlMessages';
import { BoxWrapper, BoxHeader } from '../User.styles';
import userActions from '@iso/redux/user/actions';

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

const { Option } = Select;

const { updateUserAction, getUserAction, clearNotificationAction } =
  userActions;

export default function UserEdit() {
  const { userId } = useParams();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();

  const { message, isSuccess, user } = useSelector((state) => state.User);

  useEffect(() => {
    if (!Object.keys(user).length) {
      dispatch(getUserAction(userId));
    }

    form.setFieldsValue({
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      status: user?.status,
    });
  }, [userId, user]);

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

  const onFinish = async (values) => {
    dispatch(updateUserAction(userId, values));
  };

  return (
    <LayoutWrapper>
      <PageHeader>
        <IntlMessages id='user.updateUser' />
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
          name='updateUser'
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

          <Form.Item name='email' label='E-mail'>
            <Input disabled />
          </Form.Item>

          <Form.Item name='phone' label='Phone Number'>
            <Input />
          </Form.Item>

          <Form.Item name='status' label='Status'>
            <Select>
              <Option value='active'>Active</Option>
              <Option value='inactive'>Inactive</Option>
            </Select>
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
