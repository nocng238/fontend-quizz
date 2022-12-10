import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { Button, Menu, Dropdown, notification, Table } from 'antd';
import { DownOutlined, EyeFilled } from '@ant-design/icons';
import Switch from '@iso/components/uielements/switch.js';
import HelperText from '@iso/components/utility/helper-text';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import PageHeader from '@iso/components/utility/pageHeader';
import IntlMessages from '@iso/components/utility/intlMessages';
import SearchInput from '@iso/components/SearchInput/SearchInput';
import Popconfirms from '@iso/components/Feedback/Popconfirm';
import CardWrapper, {
  BoxWrapper,
  BoxHeader,
  FiltersBar,
  StatusTag,
  ActionWrapper,
} from '../Assignment.styles';
import axios from 'axios';
import moment from 'moment';

export default function History() {
  const history = useHistory();
  const privateAxios2 = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
    timeout: 1000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: localStorage.getItem('id_token') || undefined,
    },
  });
  const [selected, setSelected] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const match = useRouteMatch();
  const [options, setOptions] = useState({ page: 1, limit: 5 });
  useEffect(() => {
    const getData = async () => {
      const res = await privateAxios2.get('/quizz/history', {
        params: { options },
      });
      setAssignments(res.data);
    };
    getData();
  }, [options]);

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
      title: 'Title',
      dataIndex: ['assignmentId', 'title'],
      rowKey: 'title',
      width: '30%',
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
      render: (text, row) => <span>{text}</span>,
    },
  ];

  return (
    <LayoutWrapper>
      <PageHeader>
        <IntlMessages id='assignment.listAssignments' />
      </PageHeader>

      <BoxWrapper>
        <CardWrapper>
          {assignments?.length === 0 ? (
            <HelperText text='No Assignment' />
          ) : (
            <Table
              columns={columns}
              dataSource={assignments}
              showSorterTooltip={false}
              rowKey='_id'
              onChange={handleTableChange}
              pagination={{
                // pageSize: limit,
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
