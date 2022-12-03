import React from 'react';
import { Row, Col } from 'antd';
import Radio, { RadioGroup } from '@iso/components/uielements/radio';
import CheckBox, { CheckboxGroup } from '@iso/components/uielements/checkbox';
import PageHeader from '@iso/components/utility/pageHeader';
import Box from '@iso/components/utility/box';
import LayoutWrapper from '@iso/components/utility/layoutWrapper.js';
import ContentHolder from '@iso/components/utility/contentHolder';
import IntlMessages from '@iso/components/utility/intlMessages';
import basicStyle from '@iso/assets/styles/constants';
import { direction } from '@iso/lib/helpers/rtl';

export default function ({ question, questionIndex, userAnswer }) {
  const [state, setState] = React.useState({
    value: 1,
  });
  console.log(userAnswer);
  const onRadioChange = (e) => {
    const { name, value } = e.target;
    userAnswer[question._id] = value;
    setState({
      ...state,
      [name]: value,
    });
  };
  const onCheckBoxChange = (value) => {
    userAnswer[question._id] = value;
  };

  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };
  const checkboxStyle = {
    lineHeight: '30px',
  };
  const { rowStyle, colStyle, gutter } = basicStyle;
  return (
    <Row style={rowStyle} gutter={gutter} justify='center'>
      <Col md={12} sm={12} xs={24} style={colStyle}>
        <Box
          title={
            <p>
              {' '}
              Cau {questionIndex}: <span> {question.title}</span>{' '}
            </p>
          }
        >
          <ContentHolder>
            {question.type === 'singleAnswer' ? (
              <RadioGroup onChange={onRadioChange} name='value'>
                {question?.answers.map((answer, index) => {
                  return (
                    <Radio
                      style={radioStyle}
                      value={answer._id}
                      key={answer._id}
                    >
                      {answer.title}
                    </Radio>
                  );
                })}
              </RadioGroup>
            ) : (
              <CheckboxGroup name='value' onChange={onCheckBoxChange}>
                {question?.answers.map((answer, index) => {
                  return (
                    <Row>
                      <CheckBox
                        style={checkboxStyle}
                        value={answer._id}
                        // key={answer._id}
                      >
                        {answer.title}
                      </CheckBox>
                    </Row>
                  );
                })}
              </CheckboxGroup>
            )}
          </ContentHolder>
        </Box>
      </Col>
    </Row>
  );
}
