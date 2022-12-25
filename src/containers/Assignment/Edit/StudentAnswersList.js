import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table } from 'antd';
import HelperText from '@iso/components/utility/helper-text';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import PageHeader from '@iso/components/utility/pageHeader';
import IntlMessages from '@iso/components/utility/intlMessages';
import CardWrapper, { BoxWrapper } from '../Assignment.styles';
import axios from '../../../library/helpers/axios';

export default function History() {
  const { assignmentId } = useParams();
  const { privateAxios } = axios;
  // const [selected, setSelected] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [options, setOptions] = useState({});
  useEffect(() => {
    const getData = async () => {
      const res = await privateAxios.get(
        `/quizz/getSubmissions/${assignmentId}`,
        { options }
      );
      setSubmissions(res.data);
    };
    getData();
  }, []);

  const handleTableChange = (pagination, filters, sorter) => {
    // let sortBy = '';
    // if (sorter.column) {
    //   console.log(sorter.field);
    //   sortBy = sorter.order === 'ascend' ? sorter.field : `-${sorter.field}`;
    // }
    setOptions({
      page: pagination.current,
      limit: pagination.pageSize,
    });
  };

  const columns = [
    {
      title: 'Id',
      dataIndex: ['studentId', 'userName'],
      rowKey: 'studentId',
      render: (text) => <span style={{}}>{text}</span>,
    },
    {
      title: 'Name',
      dataIndex: ['studentId', 'name'],
      rowKey: 'title',
      width: '20%',
      render: (text, row) => {
        return <span style={{}}>{text}</span>;
      },
    },
    {
      title: 'StartTime',
      dataIndex: 'timeStart',
      rowKey: 'startTime',
      // width: '15%',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'EndTime',
      dataIndex: 'timeEnd',
      rowKey: 'endTime',
      // width: '15%',
      render: (text) => <span style={{}}>{text}</span>,
    },
    {
      title: 'Questions',
      dataIndex: 'numberOfQuestions',
      rowKey: 'questions',
      width: '10%',
      render: (text) => <span style={{ marginLeft: '20px' }}>{text}</span>,
    },
    {
      title: 'Corect Answers',
      // width: '20%',
      dataIndex: 'corectAnswers',
      rowKey: 'corectAnswers',
      render: (text, row) => <span>{text}</span>,
    },
    {
      title: 'Score',
      // width: '20%',
      dataIndex: 'score',
      rowKey: 'score',
      render: (text, row) => <span>{Math.floor(text * 100) / 100}</span>,
    },
  ];

  return (
    <LayoutWrapper>
      <PageHeader>
        <IntlMessages id='assignment.listSubmissions' />
      </PageHeader>

      <BoxWrapper>
        <CardWrapper>
          {submissions?.length === 0 ? (
            <HelperText text='No Submmition Yet' />
          ) : (
            <Table
              columns={columns}
              dataSource={submissions}
              showSorterTooltip={false}
              rowKey='_id'
              onChange={handleTableChange}
              pagination={{
                pageSize: 50,
                showSizeChanger: true,
                pageSizeOptions: [1, 10, 20, 50, 100],
                // page: 1,
                // total: total,
              }}
            />
          )}
        </CardWrapper>
      </BoxWrapper>
    </LayoutWrapper>
  );
}
