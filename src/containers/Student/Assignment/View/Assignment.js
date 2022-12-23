import React, { useEffect } from 'react';
import Button from '@iso/components/uielements/button';
import IntlMessages from '@iso/components/utility/intlMessages';
import siteConfig from '@iso/config/site.config';
import { Link, useHistory, useParams } from 'react-router-dom';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import Question from './Question/Question';
import { Pagination, Row, Statistic, Affix, notification } from 'antd';
import { useState } from 'react';
import basicStyle from '@iso/assets/styles/constants';
import axios from 'axios';
const { Countdown } = Statistic;
export default function () {
  const privateAxios2 = axios.create({
    baseURL: siteConfig.apiUrl || 'http://localhost:8000/api/v1',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: localStorage.getItem('id_token') || undefined,
    },
  });
  const history = useHistory();
  const { assignmentId } = useParams();
  const [assignment, setAssignment] = useState({});
  const [questions, setQuestions] = useState([]);
  const [userAnswer, setUserAnswers] = useState({});
  const [page, setPage] = useState(0);
  const [deadline, SetDeadline] = useState(null);
  const startTime = new Date();
  useEffect(() => {
    const getAssignment = async () => {
      const { data } = await privateAxios2.get(`/assignment/${assignmentId}`);
      data.questions.forEach((question) => {
        userAnswer[question._id] = [];
      });
      setAssignment(data);
      setQuestions(data.questions.slice(0, 5));
      SetDeadline(Date.now() + data?.duration * 60 * 1000);
    };
    getAssignment();
  }, []);

  const onChange = (page) => {
    setQuestions(assignment.questions.slice((page - 1) * 5, page * 5));
    setPage(page - 1);
  };
  const onSubmit = async () => {
    try {
      const endTime = new Date();
      await privateAxios2.post('/quizz', {
        answers: userAnswer,
        assignmentId,
        timeStart: startTime.toLocaleString(),
        timeEnd: endTime.toLocaleString(),
      });
      //navigate to history
      history.push('/history');
    } catch (error) {
      notification.error({ message: error.message, duration: 2 });
    }
  };

  const { rowStyle, gutter } = basicStyle;

  return (
    <div
      style={{
        borderColor: 'red',
        borderStyle: 'solid',
        boxSizing: 'border-box',
        position: 'sticky',
        borderCollapse: 'collapse',
      }}
    >
      <LayoutWrapper>
        <Row style={rowStyle} justify='space-evenly'>
          <h1 style={{ width: '90%', textAlign: 'center' }}>
            {assignment.title}{' '}
          </h1>
          {assignment.duration !== 0 ? (
            <Affix offsetTop={20}>
              <Countdown value={deadline} onFinish={onSubmit}></Countdown>
            </Affix>
          ) : null}
        </Row>

        {questions?.map((question, index) => {
          return (
            <Question
              question={question}
              key={question._id}
              questionIndex={index}
              userAnswer={userAnswer}
              page={page}
              setUserAnswers={setUserAnswers}
            ></Question>
          );
        })}

        <Row style={rowStyle} gutter={gutter} justify='center' key='random'>
          <Pagination
            total={assignment?.questions?.length}
            onChange={onChange}
            defaultPageSize={5}
          ></Pagination>
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
    </div>
  );
}
