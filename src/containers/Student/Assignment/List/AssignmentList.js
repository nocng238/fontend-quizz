import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Table } from 'antd';
// import { DownOutlined, EyeFilled } from '@ant-design/icons';
// import Switch from '@iso/components/uielements/switch.js';
import HelperText from '@iso/components/utility/helper-text';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import PageHeader from '@iso/components/utility/pageHeader';
import IntlMessages from '@iso/components/utility/intlMessages';
// import SearchInput from '@iso/components/SearchInput/SearchInput';
// import Popconfirms from '@iso/components/Feedback/Popconfirm';
import CardWrapper, {
  BoxWrapper,
  ActionWrapper,
} from '../../Assignment.styles';
import moment from 'moment';
import axios from 'axios';

export default function AssignmentList() {
  const privateAxios2 = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
    timeout: 1000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: localStorage.getItem('id_token') || undefined,
    },
  });
  const history = useHistory();
  // const [selected, setSelected] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [options, setOptions] = useState({ page: 1, limit: 5 });
  useEffect(() => {
    const getData = async () => {
      const res = await privateAxios2.get('/quizz', {
        params: { options },
      });
      setAssignments(res.data);
    };
    getData();
  }, [options]);

  const handleTableChange = (pagination, filters, sorter) => {
    let sortBy = '';
    if (sorter.column) {
      console.log(sorter.field);
      sortBy = sorter.order === 'ascend' ? sorter.field : `-${sorter.field}`;
    }

    setOptions({
      sort: sortBy,
      page: pagination.current,
      limit: pagination.pageSize,
    });
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      rowKey: 'title',
      width: '30%',
      render: (text, row) => {
        return <span style={{}}>{text}</span>;
      },
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      rowKey: 'duration',
      width: '10%',
      render: (text) => <span>{text}m</span>,
    },
    {
      title: 'Questions',
      dataIndex: 'questions',
      rowKey: 'questions',
      width: '10%',
      render: (text) => <span style={{ marginLeft: '20px' }}>{text}</span>,
    },
    {
      title: 'StartTime',
      dataIndex: 'timeStart',
      rowKey: 'startTime',
      // width: '15%',
      render: (text) => (
        <span>
          {moment(text, 'YYYY-MM-DD HH:mm' || null)._d.toLocaleString()}
        </span>
      ),
    },
    {
      title: 'EndTime',
      dataIndex: 'timeEnd',
      rowKey: 'endTime',
      // width: '15%',
      render: (text) => (
        <span style={{}}>
          {moment(text, 'YYYY-MM-DD HH:mm')._d.toLocaleString() || null}
        </span>
      ),
    },
    {
      title: 'Actions',
      // width: '20%',
      rowKey: 'action',
      render: (text, row) => {
        const now = moment();
        const isAfterStarttime = now.isAfter(moment(row.timeStart).format());
        const isBeforeEndtime = now.isBefore(moment(row.timeEnd).format());
        const isAble = isAfterStarttime && isBeforeEndtime;
        console.log(row.title);
        console.log('start : ', row.timeStart, '\nend: ', row.timeEnd);
        console.log('isAfterStarttime: ', isAfterStarttime);
        console.log('isBeforeEndtime', isBeforeEndtime);
        return (
          <ActionWrapper>
            <Button
              type='primary'
              disabled={isAble}
              onClick={() => history.push(`/quizz/${row.id}`)}
            >
              Do assignment
            </Button>
          </ActionWrapper>
        );
      },
    },
  ];

  return (
    <LayoutWrapper>
      <PageHeader>
        <div></div>
        <IntlMessages id='assignment.listAssignments' />
        <div></div>
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
