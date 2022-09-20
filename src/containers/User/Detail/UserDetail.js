import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Button } from 'antd';

import userActions from '@iso/redux/user/actions';
import SingleContactView from '@iso/components/Contacts/SingleView';
import EditContactView from '@iso/components/Contacts/EditView';
import { otherAttributes } from './data';
import IntlMessages from '@iso/components/utility/intlMessages';
import { ContactsWrapper } from './User.styles';
import Scrollbar from '@iso/components/utility/customScrollBar';
import { Link, useParams } from 'react-router-dom';

const { getUserAction } = userActions;

const { Content } = Layout;

export default function UserDetail() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.User);

  useEffect(() => {
    dispatch(getUserAction(userId));
  }, [userId]);

  // const selectedContact = selectedId
  //   ? contacts.filter((contact) => contact.id === selectedId)[0]
  //   : null;

  return (
    <ContactsWrapper
      className='isomorphicContacts'
      style={{ background: 'none' }}
    >
      <Layout className='isoContactBoxWrapper'>
        <Content className='isoContactBox'>
          <div className='isoContactControl'>
            <Button type='primary' className='isoAddContactBtn'>
              <Link to='/users/edit/1'>
                <IntlMessages id='commons.edit' />
              </Link>
            </Button>
          </div>

          <Scrollbar className='contactBoxScrollbar'>
            {/* <SingleContactView
              contact={selectedContact}
              otherAttributes={otherAttributes}
            /> */}
          </Scrollbar>
        </Content>
      </Layout>
    </ContactsWrapper>
  );
}
