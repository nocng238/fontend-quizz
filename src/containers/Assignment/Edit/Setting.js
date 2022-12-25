import React, { useEffect, useState } from 'react';
import {
  Form,
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
import customAxios from '../../../library/helpers/axios';
import { number } from 'prop-types';
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
  const { privateAxios } = customAxios;
  const onFinish = async (values) => {
    try {
      const { range, duration, status, shuffleQuestion } = values;
      const timeStart = JSON.stringify(range[0]._d);
      const timeEnd = JSON.stringify(range[1]._d);
      // console.log('timeStart: ', timeStart, '\ntimeEnd: ', timeEnd);
      if (isChange) {
        await privateAxios.patch(`/assignment/${assignmentId}`, {
          timeEnd,
          timeStart,
          duration,
          status,
          shuffleQuestion,
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
      const assignment = await privateAxios.get(`/assignment/${assignmentId}`);
      const realAssignment = assignment.data.assignment;
      const { duration, timeStart, timeEnd, status } = realAssignment;
      const startTime = moment(timeStart, 'YYYY-MM-DD HH:mm');
      const endTime = moment(`${timeEnd}`, 'YYYY-MM-DD HH:mm');
      form.setFieldsValue({
        duration: duration,
        range: [startTime, endTime],
        status: status,
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
            rules={[
              {
                required: true,
                message: 'Please input duration for the test!',
                type: number,
                default: 1,
              },
            ]}
          >
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item label='RangePicker' name='range'>
            <RangePicker
              format='YYYY-MM-DD HH:mm'
              showTime={{ format: 'HH:mm' }}
              onChange={() => setIsChange(true)}
            />
          </Form.Item>
          <Form.Item
            label='Shuffle Question'
            name='shuffleQuestion'
            valuePropName='checked'
          >
            <Switch />
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
