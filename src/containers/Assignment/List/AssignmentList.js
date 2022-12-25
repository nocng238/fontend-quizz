import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Menu, Dropdown, Table, Popover } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import Switch from '@iso/components/uielements/switch.js';
import HelperText from '@iso/components/utility/helper-text';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import PageHeader from '@iso/components/utility/pageHeader';
import IntlMessages from '@iso/components/utility/intlMessages';
// import SearchInput from '@iso/components/SearchInput/SearchInput';
import Popconfirms from '@iso/components/Feedback/Popconfirm';
import CardWrapper, {
  BoxWrapper,
  BoxHeader,
  FiltersBar,
  ActionWrapper,
} from '../Assignment.styles';
// import axios from 'axios';
import axios from '../../../library/helpers/axios';
export default function AssignmentList() {
  const { privateAxios } = axios;
  const [selected, setSelected] = useState([]);
  const [assignments, setAssignments] = useState([]);
  // const match = useRouteMatch();
  // const [searchText, setSearchText] = useState('');
  const [options, setOptions] = useState({ page: 1, limit: 10 });
  useEffect(() => {
    const getData = async () => {
      const res = await privateAxios.get('/assignment', {
        params: options,
      });
      setAssignments(res.data);
    };
    getData();
  }, [options]);

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
    console.log('pagination settings: ', pagination);
    setOptions({
      sort: sortBy,
      page: pagination.current,
      limit: pagination.pageSize,
    });
  };

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
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      rowKey: 'title',
      width: '30%',
      sorter: true,
      render: (text, row) => {
        return <Link to={`/test/${row.id}`}>{text}</Link>;
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
      render: (text, row) => {
        return (
          <Switch
            checkedChildren='Active'
            unCheckedChildren='Unactive'
            defaultChecked={text === true}
            // disabled={true}
            // onChange={(value) => console.log(row)}
            onChange={async (value) =>
              await privateAxios.patch(`/assignment/${row.id}`, {
                status: value,
              })
            }
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
  const actions = (
    <Menu onClick={handleActions}>
      <Menu.Item
        key='delete'
        disabled={selected.length > 1 || !selected.length}
      >
        <IntlMessages id='commons.delete' />
      </Menu.Item>
    </Menu>
  );

  const [open, setOpen] = useState(false);
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  return (
    <LayoutWrapper>
      <PageHeader>
        <IntlMessages id='assignment.listAssignments' />
        <Popover
          content={
            <div>
              <div>
                <Link to={`assignments/create/type`}>
                  <Button style={{ width: '100px' }}>Type</Button>
                </Link>
              </div>

              <div>
                <Link to={`assignments/create/upload`}>
                  <Button style={{ width: '100px', marginTop: '10px' }}>
                    File upload
                  </Button>
                </Link>
              </div>
            </div>
          }
          trigger='click'
          open={open}
          placement='bottomRight'
          onOpenChange={handleOpenChange}
        >
          <Button type='primary'>
            <IntlMessages id='assignment.btnCreateAssignment' />
          </Button>
        </Popover>
      </PageHeader>

      <BoxWrapper>
        <BoxHeader>
          <FiltersBar>
            {/* <SearchInput onChange={(value) => setSearchText(value)} /> */}
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
              scroll={null}
            />
          )}
        </CardWrapper>
      </BoxWrapper>
    </LayoutWrapper>
  );
}
