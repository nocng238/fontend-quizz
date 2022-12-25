import React from 'react';
import { useHistory } from 'react-router-dom';
// import { Button } from 'antd';
// import { DownOutlined } from '@ant-design/icons';
// import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@iso/components/uielements/tabs';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import PageHeader from '@iso/components/utility/pageHeader';
import IntlMessages from '@iso/components/utility/intlMessages';
// import notification from '@iso/components/Notification';
import CardWrapper, { BoxWrapper } from './AssignmentEdit.styles';
import StudentAnswersList from './StudentAnswersList';
// import Dropdown, {
//   DropdownMenu,
//   MenuItem,
// } from '@iso/components/uielements/dropdown';
import Assignment from './Assignment';
import Setting from './Setting';
import { Button } from 'antd';
export default function () {
  const history = useHistory();
  const tabs = [
    {
      label: 'TEST',
      key: '12213125',
      children: <Assignment></Assignment>,
    },
    {
      label: 'SUBMISSIONS',
      key: 'StudentAnswers',
      children: <StudentAnswersList></StudentAnswersList>,
    },
    { label: 'SETTINGS', key: 'settings', children: <Setting></Setting> },
  ];

  return (
    <LayoutWrapper>
      <PageHeader>
        {/* <IntlMessages id='resume.listResume' />
         */}
        <Button
          type='primary'
          onClick={() => {
            history.push('/assignments');
          }}
        >
          <IntlMessages id='commons.back' />
        </Button>
        <h1>Edit assignment</h1>
        <div style={{ width: '100px' }}></div>
      </PageHeader>
      <BoxWrapper>
        <CardWrapper>
          <Tabs defaultActiveKey='12213125' items={tabs} centered={true} />
        </CardWrapper>
      </BoxWrapper>
    </LayoutWrapper>
  );
}
