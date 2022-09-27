import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { Button, Menu, Dropdown, notification, Table } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import HelperText from '@iso/components/utility/helper-text';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import PageHeader from '@iso/components/utility/pageHeader';
import IntlMessages from '@iso/components/utility/intlMessages';
import userActions from '@iso/redux/user/actions';
import SearchInput from '@iso/components/SearchInput/SearchInput';
import CardWrapper, {
  BoxWrapper,
  BoxHeader,
  FiltersBar,
  StatusTag,
} from '../User.styles';
import UserFilter from './UserFilter';

const {
  getUsersAction,
  setParamsUserListAction,
  getUserAction,
  clearNotificationAction,
  resetPasswordAction,
  deleteUserAction,
} = userActions;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    rowKey: 'name',
    sorter: true,
    render: (text, record) => {
      return <Link to={`/users/${record._id}`}>{text}</Link>;
    },
  },
  {
    title: 'Email',
    dataIndex: 'email',
    rowKey: 'email',
    sorter: true,
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    rowKey: 'phone',
    sorter: true,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    rowKey: 'status',
    sorter: true,
    render: (text) => {
      return <StatusTag className={text}>{text}</StatusTag>;
    },
  },
];

export default function UserList() {
  const history = useHistory();

  const [selected, setSelected] = useState([]);
  let { users, total, page, limit, sort, status, message, isSuccess } =
    useSelector((state) => state.User);
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    dispatch(
      getUsersAction({
        search: searchText,
        page,
        limit,
        sort,
        status,
      })
    );
  }, [searchText, page, sort, limit, status]);

  useEffect(() => {
    if (message) {
      const notiType = isSuccess ? 'success' : 'error';
      const messageType = isSuccess ? 'Success' : 'Error';

      notification[notiType]({
        message: messageType,
        description: message,
      });
      dispatch(clearNotificationAction());
    }
  }, [message]);

  const rowSelection = {
    hideDefaultSelections: true,
    selectedRowKeys: selected,
    onChange: (selected) => setSelected(selected),
  };

  const handleTableChange = (pagination, filters, sorter) => {
    if (Object.keys(sorter).length) {
      sort = sorter.order === 'ascend' ? sorter.field : `-${sorter.field}`;
    }

    dispatch(
      setParamsUserListAction({
        page: pagination.current,
        limit: limit,
        sort,
      })
    );
  };

  const handleFilter = (value) => {
    dispatch(
      setParamsUserListAction({
        status: value,
      })
    );
  };

  const handleActions = ({ key }) => {
    switch (key) {
      case 'detail':
        history.push(`/users/${selected[0]}`);
        dispatch(getUserAction(selected[0]));
        break;
      case 'edit':
        history.push(`/users/edit/${selected[0]}`);
        dispatch(getUserAction(selected[0]));
        break;
      case 'reset':
        dispatch(resetPasswordAction(selected[0]));
        dispatch(clearNotificationAction());
        break;
      case 'delete':
        dispatch(deleteUserAction(selected[0]));
        dispatch(clearNotificationAction());
        break;

      default:
        break;
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

  return (
    <LayoutWrapper>
      <PageHeader>
        <IntlMessages id='user.listUsers' />
        <Link to={`${match.path}/create`}>
          <Button type='primary'>
            <IntlMessages id='user.btnCreateUser' />
          </Button>
        </Link>
      </PageHeader>

      <BoxWrapper>
        <BoxHeader>
          <FiltersBar>
            <SearchInput onChange={(value) => setSearchText(value)} />
            <UserFilter onHandleFilter={handleFilter} />
          </FiltersBar>
          <Dropdown overlay={actions}>
            <Button>
              <IntlMessages id='commons.actions' /> <DownOutlined />
            </Button>
          </Dropdown>
        </BoxHeader>

        <CardWrapper>
          {users.length === 0 ? (
            <HelperText text='No User' />
          ) : (
            <Table
              columns={columns}
              dataSource={users}
              rowSelection={rowSelection}
              showSorterTooltip={false}
              rowKey='_id'
              onChange={handleTableChange}
              pagination={{
                pageSize: limit,
                showSizeChanger: true,
                pageSizeOptions: [10, 20, 50, 100],
                page: page,
                total: total,
                showTotal: (total) => `Total ${total} items`,
              }}
              scroll={{ y: 'calc(100vh - 435px)' }}
            />
          )}
        </CardWrapper>
      </BoxWrapper>
    </LayoutWrapper>
  );
}
