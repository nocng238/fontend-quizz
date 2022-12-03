import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@iso/components/uielements/tabs';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import PageHeader from '@iso/components/utility/pageHeader';
import IntlMessages from '@iso/components/utility/intlMessages';
import notification from '@iso/components/Notification';
import CardWrapper, {
  BoxWrapper,
  BoxHeader,
  FiltersBar,
} from './AssignmentEdit.styles';
import Dropdown, {
  DropdownMenu,
  MenuItem,
} from '@iso/components/uielements/dropdown';
import axios from '../../../library/helpers/axios';
import Assignment from './Assignment';
import Setting from './Setting';
const { privateAxios } = axios;
export default function () {
  const history = useHistory();
  const dispatch = useDispatch();

  const tabs = [
    {
      label: 'TEST',
      key: '12213125',
      children: <Assignment></Assignment>,
    },
    { label: 'SETTINGS', key: 'settings', children: <Setting></Setting> },
  ];

  return (
    <LayoutWrapper>
      <PageHeader>
        {/* <IntlMessages id='resume.listResume' />
         */}
        <h1>Edit assignment</h1>
      </PageHeader>
      <BoxWrapper>
        <CardWrapper>
          <Tabs defaultActiveKey='12213125' items={tabs} centered={true} />
        </CardWrapper>
      </BoxWrapper>
    </LayoutWrapper>
  );
}
