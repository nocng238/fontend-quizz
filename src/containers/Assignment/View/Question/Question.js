import React from 'react';
import { Row, Col, Checkbox, Divider } from 'antd';
import Radio, { RadioGroup } from '@iso/components/uielements/radio';
// import CheckBox, { CheckboxGroup } from '@iso/components/uielements/checkbox';
import Box from '@iso/components/utility/box';
// import LayoutWrapper from '@iso/components/utility/layoutWrapper.js';
import ContentHolder from '@iso/components/utility/contentHolder';
// import IntlMessages from '@iso/components/utility/intlMessages';
import basicStyle from '@iso/assets/styles/constants';

export default function ({ question, questionIndex, userAnswer, page }) {
  // const [state, setState] = React.useState({
  //   value: 1,
  // });
  const onRadioChange = (e) => {
    const { value } = e.target;
    userAnswer[question._id] = value;
    // setState({
    //   ...state,
    //   [name]: value,
    // });
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
            <div>
              <Divider>Question {questionIndex + 1 + page * 5}</Divider>
              <div dangerouslySetInnerHTML={{ __html: question.title }}></div>
            </div>
            // question.title
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
              <Checkbox.Group
                name='value'
                onChange={onCheckBoxChange}
                defaultValue={() => {
                  const arr = question?.answers.filter((answer) => {
                    return answer.isTrue === true;
                  });
                  return arr.map((answer) => answer._id);
                }}
                disabled
              >
                {question?.answers.map((answer, index) => {
                  return (
                    <Row>
                      <Checkbox
                        style={checkboxStyle}
                        value={answer._id}
                        key={answer._id}
                      >
                        {answer.title}
                      </Checkbox>
                    </Row>
                  );
                })}
              </Checkbox.Group>
            )}
          </ContentHolder>
        </Box>
      </Col>
    </Row>
  );
}
