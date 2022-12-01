import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Input, Form, notification, Space, Radio } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
export default function Answer({ field, form, questionNumber }) {
  // handle when set the answer for question
  const handleSetAnswer = (index) => {
    const questions = form.getFieldValue('questions');
    if (questions[questionNumber].answers[index]?.isTrue) {
      questions[questionNumber].answers[index].isTrue =
        !questions[questionNumber].answers[index].isTrue;
    }
    form.setFieldsValue(questions);
  };
  return (
    <Form.List name={[field.name, 'answers']}>
      {(answers, { add, remove }) => {
        return (
          <div>
            {answers.map((answer, index) => (
              <Space
                key={'answer' + answer.key}
                align='start'
                style={{ display: 'flex', marginBottom: 8 }}
              >
                {/* <Form.Item
                                    {...answer}
                                    name={[answer.name, 'nickname']}
                                    fieldKey={[answer.fieldKey, 'nickname']}
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Missing nickname',
                                      },
                                    ]}
                                  >
                                    <Input placeholder='Nickname' />
                                  </Form.Item> */}
                <Form.Item
                  {...answer}
                  key={'radio' + answer.key}
                  fieldKey={[answer.fieldKey, 'isTrue']}
                  name={[answer.name, 'isTrue']}
                  valuePropName='checked'
                  // initialValue={false}
                >
                  <Radio onClick={() => handleSetAnswer(index)}></Radio>
                </Form.Item>
                <Form.Item
                  {...answer}
                  key={[answer, 'id']}
                  fieldKey={[answer, 'title']}
                  name={[answer.name, 'title']}
                  rules={[
                    {
                      required: true,
                      message: 'Missing answer description',
                    },
                  ]}
                >
                  <Input style={{ width: '350px' }} />
                </Form.Item>

                {/* <Form.Item>
                                    
                                    <Radio>
                                      <Input
                                        style={{ width: 100, marginLeft: 10 }}
                                      />
                                    </Radio>
                                  </Form.Item> */}

                <MinusCircleOutlined
                  onClick={() => {
                    remove(answer.name);
                  }}
                  style={{
                    marginLeft: '20px',
                    marginTop: '10px',
                  }}
                />
              </Space>
            ))}

            <Form.Item a>
              <Button
                type='dashed'
                onClick={() => {
                  add();
                }}
                style={{ width: '30%' }}
                block
              >
                <PlusOutlined /> Add Answer
              </Button>
            </Form.Item>
          </div>
        );
      }}
    </Form.List>
  );
}
