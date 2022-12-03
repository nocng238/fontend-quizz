import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Form,
  Input,
  Button,
  notification,
  Select,
  DatePicker,
  Switch,
  InputNumber,
} from 'antd';
import { Link, useHistory, useParams } from 'react-router-dom';

import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import PageHeader from '@iso/components/utility/pageHeader';
import IntlMessages from '@iso/components/utility/intlMessages';
import { BoxWrapper, BoxHeader } from '../Assignment.styles';
import userActions from '@iso/redux/user/actions';
const { RangePicker } = DatePicker;
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

export default function Setting() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <LayoutWrapper>
      <BoxWrapper>
        <Form
          {...formItemLayout}
          form={form}
          name='setting'
          onFinish={onFinish}
        >
          <Form.Item
            name='duration'
            label='Duration'
            // rules={[
            //   {
            //     required: true,
            //     message: 'Please input your name!',
            //     whitespace: true,
            //   },
            // ]}
          >
            <InputNumber />
          </Form.Item>

          {/* <Form.Item name='email' label='E-mail'>
            <Input />
          </Form.Item>

          <Form.Item name='phone' label='Phone Number'>
            <Input />
          </Form.Item> */}
          <Form.Item label='RangePicker' name='Range'>
            <RangePicker />
          </Form.Item>
          <Form.Item label='Status' name='status' valuePropName='checked'>
            <Switch />
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
