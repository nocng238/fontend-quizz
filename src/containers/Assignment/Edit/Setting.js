import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Button,
  notification,
  DatePicker,
  Switch,
  InputNumber,
} from 'antd';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import IntlMessages from '@iso/components/utility/intlMessages';
import { BoxWrapper } from '../Assignment.styles';
import axios from 'axios';
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

// const dateFormat = 'YYYY/MM/DD';

export default function Setting() {
  const [form] = Form.useForm();
  const { assignmentId } = useParams();
  const [isChange, setIsChange] = useState(false);
  const privateAxios2 = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
    timeout: 1000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: localStorage.getItem('id_token') || undefined,
    },
  });
  const onFinish = async (values) => {
    try {
      const { range, duration } = values;
      const timeStart = JSON.stringify(range[0]._d);
      const timeEnd = JSON.stringify(range[1]._d);
      console.log('timeStart: ', timeStart, '\ntimeEnd: ', timeEnd);
      if (isChange) {
        await privateAxios2.patch(`/assignment/${assignmentId}`, {
          timeEnd,
          timeStart,
          duration,
        });
      }
      setIsChange(false);
      notification.success({ message: 'Edit Successfully', duration: 2 });
    } catch (error) {
      notification.error({ message: error.message, duration: 2 });
    }
  };

  useEffect(() => {
    const getAssignment = async () => {
      const assignment = await privateAxios2.get(`/assignment/${assignmentId}`);
      const realAssignment = assignment.data.assignment;
      const { duration, timeStart, timeEnd } = realAssignment;
      const startTime = moment(timeStart, 'YYYY-MM-DD HH:mm');
      const endTime = moment(`${timeEnd}`, 'YYYY-MM-DD HH:mm');
      form.setFieldsValue({
        duration: duration,
        range: [startTime, endTime],
      });
    };
    getAssignment();
  }, [assignmentId]);
  const onChange = () => {
    setIsChange(true);
  };
  return (
    <LayoutWrapper>
      <BoxWrapper>
        <Form
          {...formItemLayout}
          form={form}
          name='setting'
          onFinish={onFinish}
          onChange={onChange}
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
          <Form.Item label='RangePicker' name='range'>
            <RangePicker
              format='YYYY-MM-DD HH:mm'
              showTime={{ format: 'HH:mm' }}
              onChange={() => setIsChange(true)}
            />
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
