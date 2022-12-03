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
import userActions from '@iso/redux/user/actions';
import SearchInput from '@iso/components/SearchInput/SearchInput';
import Popconfirms from '@iso/components/Feedback/Popconfirm';
import CardWrapper, {
  BoxWrapper,
  BoxHeader,
  FiltersBar,
  StatusTag,
  ActionWrapper,
} from '../Assignment.styles';
import axios from '../../../library/helpers/axios';
// import UserFilter from './UserFilter';
//Redux actions
// const {
//   getUsersAction,
//   setParamsUserListAction,
//   getUserAction,
//   clearNotificationAction,
//   resetPasswordAction,
//   deleteUserAction,
// } = userActions;
const { privateAxios } = axios;

export default function AssignmentList() {
  const history = useHistory();
  const [count, setCount] = useState(1);

  const [selected, setSelected] = useState([]);
  //   let { users, total, page, limit, sort, status, message, isSuccess } =
  //     useSelector((state) => state.User);
  const dispatch = useDispatch();
  const [assignments, setAssignments] = useState([]);
  const match = useRouteMatch();
  // const assignments = [
  //   {
  //     id: '63876b8fff09385211e92041',
  //     title: 'Bai kiem tra giua ky 16 thanh 17',
  //     questions: 2,
  //     duration: 0,
  //     status: false,
  //   },
  //   {
  //     id: '63876a1773624d3f9e7041c0',
  //     title: 'Bai kiem tra giua ky 2',
  //     questions: 0,
  //     duration: 0,
  //     status: false,
  //   },
  // ];
  const [searchText, setSearchText] = useState('');
  const [options, setOptions] = useState({ page: 1, limit: 5 });
  useEffect(() => {
    const getData = async () => {
      const res = await privateAxios.get('/assignment', {
        params: { options },
      });
      console.log('use effect run');
      setAssignments(res.data);
    };
    getData();
  }, [options]);

  //   useEffect(() => {
  //     dispatch(
  //       getUsersAction({
  //         search: searchText,
  //         page,
  //         limit,
  //         sort,
  //         status,
  //       })
  //     );
  //   }, [searchText, page, sort, limit, status]);

  //   useEffect(() => {
  //     if (message) {
  //       const notiType = isSuccess ? 'success' : 'error';
  //       const messageType = isSuccess ? 'Success' : 'Error';

  //       notification[notiType]({
  //         message: messageType,
  //         description: message,
  //       });
  //       dispatch(clearNotificationAction());
  //     }
  //   }, [message]);

  const rowSelection = {
    hideDefaultSelections: true,
    selectedRowKeys: selected,
    onChange: (selected) => setSelected(selected),
  };

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

  // const handleFilter = (value) => {
  //   dispatch(
  //     setParamsUserListAction({
  //       status: value,
  //     })
  //   );
  // };
  // const handleDeleteAssignment = ()

  const handleActions = ({ key }) => {
    switch (
      key
      //   case 'detail':
      //     history.push(`/users/${selected[0]}`);
      //     // dispatch(getUserAction(selected[0]));
      //     break;
      //   case 'edit':
      //     history.push(`/users/edit/${selected[0]}`);
      //     // dispatch(getUserAction(selected[0]));
      //     break;
      //   case 'reset':
      //     dispatch(resetPasswordAction(selected[0]));
      //     // dispatch(clearNotificationAction());
      //     break;
      //   case 'delete':
      //     dispatch(deleteUserAction(selected[0]));
      //     // dispatch(clearNotificationAction());
      //     break;

      //   default:
      //     break;
    ) {
    }
  };

  const actions = (
    <Menu onClick={handleActions}>
      <Menu.Item
        key='detail'
        disabled={selected.length > 1 || !selected.length}
      >
        <IntlMessages id='commons.detail' />
      </Menu.Item>
      <Menu.Item key='edit' disabled={selected.length > 1 || !selected.length}>
        <IntlMessages id='commons.edit' />
      </Menu.Item>
      <Menu.Item key='reset' disabled={selected.length > 1 || !selected.length}>
        <IntlMessages id='user.resetPassword' />
      </Menu.Item>
      <Menu.Item
        key='delete'
        disabled={selected.length > 1 || !selected.length}
      >
        <IntlMessages id='commons.delete' />
      </Menu.Item>
    </Menu>
  );
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      rowKey: 'title',
      width: '30%',
      sorter: true,
      render: (text, record) => {
        //   return <Link to={`/assignments/${record._id}`}>{text}</Link>;
        return <span>{text}</span>;
      },
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      rowKey: 'duration',
      sorter: true,
      width: '10%',
      render: (text) => <span>{text}m</span>,
    },
    {
      title: 'Questions',
      dataIndex: 'questions',
      rowKey: 'questions',
      sorter: true,
      width: '15%',
      render: (text) => <span style={{ marginLeft: '20px' }}>{text}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      rowKey: 'status',
      width: '20%',
      sorter: true,
      render: (text) => {
        return (
          <Switch
            checkedChildren='Active'
            unCheckedChildren='Unactive'
            defaultChecked={text === true}
            onChange={() => {
              setCount(2);
            }}
          ></Switch>
        );
      },
    },
    {
      title: 'Actions',
      width: '60px',
      rowKey: 'action',
      render: (text, row) => {
        return (
          <ActionWrapper>
            <Link to={`/assignments/edit/${row.id}`}>
              {/* <Link to={`/assignments/edit`}> */}
              <i className='ion-android-create' />
            </Link>

            <Popconfirms
              title='Are you sure to delete this record?'
              okText='Yes'
              cancelText='No'
              placement='topRight'
              onConfirm={async () => {
                await privateAxios.delete(`/assignment/${row.id}`);
                setAssignments(
                  assignments.filter((assignment) => assignment.id !== row.id)
                );
              }}
            >
              <a className='deleteBtn' href='# '>
                <i className='ion-android-delete' />
              </a>
            </Popconfirms>
          </ActionWrapper>
        );
      },
    },
  ];

  return (
    <LayoutWrapper>
      <PageHeader>
        <IntlMessages id='assignment.listAssignments' />
        <Link to={`${match.path}/create`}>
          <Button type='primary'>
            <IntlMessages id='assignment.btnCreateAssignment' />
          </Button>
        </Link>
      </PageHeader>

      <BoxWrapper>
        <BoxHeader>
          <FiltersBar>
            <SearchInput onChange={(value) => setSearchText(value)} />
            {/* <UserFilter onHandleFilter={handleFilter} /> */}
          </FiltersBar>
          {/*overlay={actions}*/}
          <Dropdown overlay={actions}>
            <Button>
              <IntlMessages id='commons.actions' /> <DownOutlined />
            </Button>
          </Dropdown>
        </BoxHeader>

        <CardWrapper>
          {assignments?.length === 0 ? (
            <HelperText text='No Assignment' />
          ) : (
            <Table
              columns={columns}
              dataSource={assignments}
              rowSelection={rowSelection}
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
              scroll={{ y: 'calc(100vh - 435px)' }}
            />
          )}
        </CardWrapper>
      </BoxWrapper>
    </LayoutWrapper>
  );
}
