import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Input, Form, notification, Select } from 'antd';

import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import PageHeader from '@iso/components/utility/pageHeader';
import IntlMessages from '@iso/components/utility/intlMessages';
import { BoxWrapper, BoxHeader } from '../User.styles';
import { UserOutlined } from '@ant-design/icons';
import axios from '../../../library/helpers/axios';
const { Option } = Select;
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

export default function UserCreate() {
  const [form] = Form.useForm();
  const { privateAxios } = axios;
  const history = useHistory();

  const onFinish = async (values) => {
    try {
      const { role, userName, name } = values;
      await privateAxios.post('/user', { role, userName, name });
      notification.success({
        message: 'User was created successfully',
        duration: 2,
      });
      history.push('/users');
    } catch (error) {
      notification.error({ message: error.response.data.message, duration: 2 });
    }
  };

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
            name='userName'
            label='Username'
            rules={[
              {
                required: true,
                message: 'Please enter username!',
                whitespace: true,
              },
            ]}
          >
            <Input prefix={<UserOutlined className='site-form-item-icon' />} />
          </Form.Item>
          <Form.Item
            name='name'
            label='Name'
            rules={[
              {
                required: true,
                message: `Please input User's name!`,
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item name='role' label='Role'>
            <Select
              // onChange={(value) => {
              //   alert(value);
              // }}
              name='category'
              placeholder='Please select a category'
            >
              <Option value={0}>Admin</Option>
              <Option value={1}>Teacher</Option>
              <Option value={2}>Student</Option>
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
