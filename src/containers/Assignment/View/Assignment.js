import React from 'react';
import Input from '@iso/components/uielements/input';
import Button from '@iso/components/uielements/button';
import Image from '@iso/assets/images/rob.png';
import IntlMessages from '@iso/components/utility/intlMessages';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import PageHeader from '@iso/components/utility/pageHeader';
import { BoxWrapper, BoxHeader } from '../Assignment.styles';
import { useForm } from 'antd/es/form/Form';
import Question from './Question/Question';
import { Form, Pagination, Row, Statistic, Col, Affix } from 'antd';
import { useState } from 'react';
import basicStyle from '@iso/assets/styles/constants';

const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Dayjs is also OK
export default function () {
  const initalValue = {
    questions: [
      {
        _id: 'question1-ID',
        title: 'question 1',
        type: 'singleAnswer',
        answers: [
          {
            _id: 'answer11',
            title: 'answer 1',
          },
          { _id: 'answer12', title: 'answer 2' },
        ],
      },
      {
        _id: 'question2-ID',
        type: 'mutilAnswer',
        title:
          'question 2 asdfjkahs dfkjahskdjfha ksjdhfkajhsd kfjhaskdjhfk la js h d  fkjhaskldjfhkajfkajshdfkjahsdkjfhakjsdhfkjahsdkjfhakjshd fkjhasdkjhfkasjhdfkjh',
        answers: [
          {
            _id: 'answer21',
            title: 'answer 1',
          },
          {
            _id: 'answer22',
            title: 'answer 2',
          },
        ],
      },
      {
        _id: 'question3-ID',
        type: 'mutilAnswer',
        title:
          'question 4 asdfjkahs dfkjahskdjfha ksjdhfkajhsd kfjhaskdjhfk la js h d  fkjhaskldjfhkajfkajshdfkjahsdkjfhakjsdhfkjahsdkjfhakjshd fkjhasdkjhfkasjhdfkjh',
        answers: [
          {
            _id: 'answer31',
            title: 'answer 1',
          },
          {
            _id: 'answer32',
            title: 'answer 2',
          },
        ],
      },
      {
        _id: 'question4-ID',
        type: 'mutilAnswer',
        title:
          'question 4 asdfjkahs dfkjahskdjfha ksjdhfkajhsd kfjhaskdjhfk la js h d  fkjhaskldjfhkajfkajshdfkjahsdkjfhakjsdhfkjahsdkjfhakjshd fkjhasdkjhfkasjhdfkjh',
        answers: [
          {
            _id: 'answer41',
            title: 'answer 1',
          },
          {
            _id: 'answer42',
            title: 'answer 2',
          },
          {
            _id: 'answer43',
            title: 'answer 2',
          },
          {
            _id: 'answer45',
            title: 'answer 2',
          },
          {
            _id: 'answer46',
            title: 'answer 2',
          },
          {
            _id: 'answer47',
            title: 'answer 2',
          },
          {
            _id: 'answer48',
            title: 'answer 2',
          },
          {
            _id: 'answer49',
            title: 'answer 2',
          },
        ],
      },
    ],
  };
  const [assignment, setAssignment] = useState(initalValue);
  const userAnswer = {};
  assignment.questions.forEach((question) => {
    userAnswer[question._id] = [];
  });
  console.log(userAnswer);
  const selectAnswer = () => {};
  const onSubmit = () => {
    // const { title, questions } = values;
    // await privateAxios.post('/assignment', { title, questions });
    console.log('values: ', userAnswer);
  };
  const { rowStyle, colStyle, gutter } = basicStyle;

  return (
    <>
      <LayoutWrapper>
        <Row style={rowStyle} justify='space-evenly'>
          <h1 style={{ width: '90%', textAlign: 'center' }}> JAVA01</h1>
          <Affix offsetTop={20}>
            <Countdown value={deadline}></Countdown>
          </Affix>
        </Row>

        {assignment?.questions.map((question, index) => {
          return (
            <Question
              question={question}
              key={question._id}
              questionIndex={index}
              userAnswer={userAnswer}
            ></Question>
          );
        })}

        <Row style={rowStyle} gutter={gutter} justify='center' key='random'>
          <Pagination></Pagination>
        </Row>
        <Row
          style={{
            marginLeft: '-8px',
            marginRight: '-8px',
            width: '100%',
            display: 'flex',
            flexFlow: 'row wrap',
            marginTop: '20px',
          }}
          gutter={gutter}
          justify='center'
        >
          <Button type='primary' onClick={onSubmit}>
            Submit
          </Button>
        </Row>
      </LayoutWrapper>
    </>
  );
}
