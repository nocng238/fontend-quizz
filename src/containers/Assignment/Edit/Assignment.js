import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Input, Form, notification, Divider } from 'antd';
import Editor2 from '../Create/editor';
// import Editor from '../../../components/uielements/editor';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
// import PageHeader from '@iso/components/utility/pageHeader';
// import IntlMessages from '@iso/components/utility/intlMessages';
import { BoxWrapper } from '../Assignment.styles';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import Answer from '../Create/Answer';
import { useForm } from 'antd/es/form/Form';
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const tailFormItemLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 16, offset: 8 },
    lg: { span: 14, offset: 6 },
  },
};
export default function Assignment({ assignment }) {
  const [isChange, setIsChange] = useState(false);
  const [form] = useForm();
  const history = useHistory();
  const privateAxios2 = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: localStorage.getItem('id_token') || undefined,
    },
  });
  const { assignmentId } = useParams();
  const onFinish = async (values) => {
    try {
      const { title, questions } = values;

      await privateAxios2.patch(`/assignment/${assignmentId}`, {
        title,
        questions,
      });
      console.log('call api');

      notification.success({ message: 'Edit Successfully', duration: 2 });
      setIsChange(false);
    } catch (error) {
      notification.error({ message: error.message, duration: 2 });
    }
    // console.log('values: ', values);
  };
  useEffect(() => {
    const getAssignment = async () => {
      const assignment = await privateAxios2.get(`/assignment/${assignmentId}`);
      const realAssignment = assignment.data.assignment;
      form.setFieldsValue({
        title: realAssignment.title,
        questions: realAssignment.questions,
      });
    };
    getAssignment();
  }, [assignmentId]);

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
      {/* <PageHeader>
        <IntlMessages id='assignment.createAssignment' />
      </PageHeader> */}

      <BoxWrapper>
        <Form
          form={form}
          name='dynamic_form_nest_item'
          onFinish={onFinish}
          autoComplete='off'
          // initialValues={assignment ? assignment : initalValue2}
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

          <Form.Item {...tailFormItemLayout}>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </BoxWrapper>
    </LayoutWrapper>
  );
}
