import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Input, Form, notification, Select } from 'antd';

import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import PageHeader from '@iso/components/utility/pageHeader';
import IntlMessages from '@iso/components/utility/intlMessages';
import { BoxWrapper, BoxHeader } from '@iso/containers/Styles/Common.styles';
import { UserOutlined } from '@ant-design/icons';
import axios from '@iso/lib/helpers/axios';
import { useEffect } from 'react';
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
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const studentData = await privateAxios.get('user/student', null);
      const teacherData = await privateAxios.get('user/teacher', null);
      setStudents(studentData.data);
      setTeachers(teacherData.data);
    };
    getData();
  }, []);
  const onFinish = async (values) => {
    try {
      //format values
      const students = values.students.map((student) => {
        const newStudent = student.split('/');
        //return student id only
        return newStudent[1];
      });
      let teacher = values.teacher.split('/');
      const teacherId = teacher[1];
      setLoading(true);
      await privateAxios.post('/class', {
        className: values.className,
        students,
        teacher: teacherId,
      });
      setLoading(false);
      history.push('/classes');
    } catch (error) {
      setLoading(false);
      notification.error({ message: error.response.data.message, duration: 2 });
    }
  };

  return (
    <LayoutWrapper>
      <PageHeader>
        <IntlMessages id='class.createClass' />
      </PageHeader>

      <BoxWrapper>
        <BoxHeader>
          <Link to='/classes'>
            <Button color='primary'>
              <IntlMessages id='commons.back' />
            </Button>
          </Link>
        </BoxHeader>

        <Form
          {...formItemLayout}
          form={form}
          name='createClass'
          onFinish={onFinish}
        >
          <Form.Item
            name='className'
            label='Class name'
            rules={[
              {
                required: true,
                message: 'Please enter class name!',
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='teacher'
            label='Lecture'
            rules={[
              {
                required: true,
                message: `Please select lecture for this class!`,
              },
            ]}
          >
            <Select placeholder='Please select lecture for this class!'>
              {teachers?.map((teacher) => {
                return (
                  <Option
                    key={teacher._id}
                    value={teacher.name + '/' + teacher._id}
                  >
                    {teacher.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item name='students' label='Students'>
            <Select
              mode='multiple'
              //   allowClear
              name='students'
              placeholder='Please add student into this class'
            >
              {students?.map((student) => {
                return (
                  <Option
                    key={student._id}
                    value={student.name + '/' + student._id}
                  >
                    {student.name}
                  </Option>
                );
              })}
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
