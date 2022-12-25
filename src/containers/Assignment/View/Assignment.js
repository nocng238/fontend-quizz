import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import Question from './Question/Question';
import { Pagination, Row } from 'antd';
import { useState } from 'react';
import basicStyle from '@iso/assets/styles/constants';
import axios from '../../../library/helpers/axios';
// const { Countdown } = Statistic;
export default function () {
  const { assignmentId } = useParams();
  const [assignment, setAssignment] = useState({});
  const [questions, setQuestions] = useState([]);
  const [userAnswer, setUserAnswers] = useState({});
  const [page, setPage] = useState(0);
  // const deadline = Date.now() + assignment?.duration * 60 * 1000;
  const { privateAxios } = axios;
  useEffect(() => {
    const getAssignment = async () => {
      const { data } = await privateAxios.get(`/assignment/${assignmentId}`);
      data.assignment.questions.forEach((question) => {
        userAnswer[question._id] = [];
      });
      setAssignment(data.assignment);
      setQuestions(data.assignment.questions.slice(0, 5));
    };
    getAssignment();
  }, [assignmentId]);

  const onChange = (page) => {
    setQuestions(assignment.questions.slice((page - 1) * 5, page * 5));
    setPage(page - 1);
  };
  const { rowStyle, gutter } = basicStyle;

  return (
    <>
      <LayoutWrapper>
        <Row style={rowStyle} justify='space-evenly'>
          <h1 style={{ width: '90%', textAlign: 'center' }}>
            {' '}
            {assignment.title}
          </h1>
        </Row>

        {questions?.map((question, index) => {
          return (
            <Question
              question={question}
              key={question._id}
              questionIndex={index}
              userAnswer={userAnswer}
              page={page}
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
        ></Row>
      </LayoutWrapper>
    </>
  );
}
