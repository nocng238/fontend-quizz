import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import { Button, Menu, Dropdown, Popover, Checkbox } from 'antd';
import { DownOutlined, CaretDownOutlined } from '@ant-design/icons';

import notification from '@iso/components/Notification';
import HelperText from '@iso/components/utility/helper-text';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import PageHeader from '@iso/components/utility/pageHeader';
import IntlMessages from '@iso/components/utility/intlMessages';
import invoiceActions from '@iso/redux/invoice/actions';
import TableWrapper from '@iso/components/Table/Table.styles';
import SearchInput from '@iso/components/ScrumBoard/SearchInput/SearchInput';
import CardWrapper, {
  BoxWrapper,
  BoxHeader,
  FiltersBar,
  Filters,
  StatusTag,
} from './User.styles';

const { initData, deleteInvoice } = invoiceActions;

const STATUSES = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    rowKey: 'name',
    sorter: true,
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
    render: (text, status) => {
      let className;
      if (text === 'shipped' || text === 'Shipped' || text === 'SHIPPED') {
        className = 'shipped';
      } else if (
        text === 'delivered' ||
        text === 'Delivered' ||
        text === 'DELIVERED'
      ) {
        className = 'delivered';
      } else if (
        text === 'pending' ||
        text === 'Pending' ||
        text === 'PENDING'
      ) {
        className = 'pending';
      }
      return <StatusTag className={className}>{text}</StatusTag>;
    },
  },
];
const data = [];

for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    email: `edward.king${i}@gmail.com`,
    phone: `0123456789`,
    status: 'pending',
  });
}

export default function User() {
  const [selected, setSelected] = useState([]);
  const { initialInvoices, invoices } = useSelector((state) => state.Invoices);
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (!initialInvoices) {
      dispatch(initData());
    }
  }, [dispatch, initialInvoices]);

  const rowSelection = {
    hideDefaultSelections: true,
    selectedRowKeys: selected,
    onChange: (selected) => setSelected(selected),
  };

  const actions = (
    <Menu>
      <Menu.Item key='detail'>
        <IntlMessages id='commons.detail' />
      </Menu.Item>
      <Menu.Item key='edit'>
        <IntlMessages id='commons.edit' />
      </Menu.Item>
      <Menu.Item key='reset'>
        <IntlMessages id='commons.resetPassword' />
      </Menu.Item>
      <Menu.Item key='delete'>
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
            <Filters>
              <Popover
                placement='bottom'
                content={
                  <Checkbox.Group
                    options={STATUSES}
                    defaultValue={['All']}
                    onChange={(value) => console.log(value)}
                  />
                }
                trigger='click'
              >
                <span>
                  Status <CaretDownOutlined />
                </span>
              </Popover>
            </Filters>
          </FiltersBar>
          <Dropdown overlay={actions}>
            <Button>
              <IntlMessages id='commons.actions' /> <DownOutlined />
            </Button>
          </Dropdown>
        </BoxHeader>

        <CardWrapper>
          {invoices.length === 0 ? (
            <HelperText text='No Invoices' />
          ) : (
            <TableWrapper
              columns={columns}
              dataSource={data}
              rowSelection={rowSelection}
              showSorterTooltip={false}
              pagination={{
                pageSize: 10,
              }}
              scroll={{ y: 'calc(100vh - 435px)' }}
            />
          )}
        </CardWrapper>
      </BoxWrapper>
    </LayoutWrapper>
  );
}
