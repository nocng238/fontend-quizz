import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Input, Form, notification, Space, Divider, Radio } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Editor2 from './editor';
import Editor from '../../../components/uielements/editor';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import PageHeader from '@iso/components/utility/pageHeader';
import IntlMessages from '@iso/components/utility/intlMessages';
import userActions from '@iso/redux/user/actions';
import { BoxWrapper, BoxHeader } from '../Assignment.styles';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import Answer from './Answer';
import { useForm } from 'antd/es/form/Form';
import { useState } from 'react';
import axios from '../../../library/helpers/axios';
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
export default function AssignmentCreate() {
  const [isChange, setIsChange] = useState(false);
  const [form] = useForm();
  const history = useHistory();
  const { privateAxios } = axios;
  // const onFinish = async (values) => {
  //   const { title, questions } = values;
  //   await privateAxios.post('/assignment', { title, questions });
  //   console.log('values: ', values);
  // };
  const onFinish = (values) => {
    // const { title, questions } = values;
    // await privateAxios.post('/assignment', { title, questions });
    console.log('values: ', values);
  };

  // const initalValue = {
  //   questions: [
  //     { answers: [{ title: 'Cau1 asd', isDefault: true }], title: 'Java01' },
  //     { answers: [{ title: 'Cau2 asd', isDefault: true }], title: 'Java02' },
  //   ],
  //   title: 'JAVA 01',
  // };

  const onChange = () => {
    setIsChange(true);
  };
  const redirect = () => {
    history.push('/assignments');
    notification.destroy({ key: 'notifications' });
  };
  const openNotification = (title, type) => {
    notification.warning({
      message: (
        <div style={{ color: 'blue' }}>
          <p style={{ textAlign: 'center' }}>Your works haven't been saved</p>
          <p style={{ textAlign: 'center' }}>You sure to exit?</p>
        </div>
      ),
      description: (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={redirect}>Click me</Button>
        </div>
      ),
      placement: 'top',
      style: { backgroundColor: type === 'error' ? 'red' : 'white' },
      duration: 0,
      key: 'notifications',
    });
  };
  return (
    <LayoutWrapper>
      <PageHeader>
        <IntlMessages id='assignment.createAssignment' />
      </PageHeader>

      <BoxWrapper>
        <BoxHeader>
          {/* <Link to='/assignments'> */}
          <Button
            color='primary'
            onClick={isChange === true ? openNotification : redirect}
          >
            <IntlMessages id='commons.back' />
          </Button>
          {/* </Link> */}
        </BoxHeader>
        <Form
          form={form}
          name='dynamic_form_nest_item'
          onFinish={onFinish}
          autoComplete='off'
          // initialValues={initalValue}
          onChange={onChange}
        >
          <Form.Item
            name='title'
            label={<p style={{ fontSize: '20px' }}>Title</p>}
            rules={[{ required: true }]}
          >
            <Input size='large' />
          </Form.Item>
          <Form.List name='questions'>
            {(fields, { add, remove }) => {
              return (
                <div>
                  {/* Questions */}
                  {fields.map((field, index) => (
                    <div key={'question' + index}>
                      <Divider>
                        Question {index + 1}{' '}
                        <MinusCircleOutlined
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      </Divider>

                      {/* <Space
                        key={field.key}
                        style={{ display: 'flex', marginBottom: 8 }}
                        align='start'
                      > */}
                      <Form.Item
                        {...field}
                        name={[field.name, 'title']}
                        key={'question' + field.key}
                        fieldKey={[field.fieldKey, 'title']}
                        // rules={[
                        //   { required: true, message: 'Missing the anser' },
                        // ]}
                      >
                        <Editor2></Editor2>
                        {/* <Input.TextArea placeholder='Question Description' /> */}
                      </Form.Item>

                      {/* </Space> */}

                      {/* Answers */}
                      <Answer
                        field={field}
                        form={form}
                        questionNumber={index}
                      ></Answer>
                    </div>
                  ))}

                  <Form.Item
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <Button
                      type='dashed'
                      onClick={() => {
                        add();
                      }}
                      style={{ width: '400px ' }}
                      block
                    >
                      <PlusOutlined /> Add Question
                    </Button>
                  </Form.Item>
                </div>
              );
            }}
          </Form.List>

          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </BoxWrapper>
    </LayoutWrapper>
  );
}