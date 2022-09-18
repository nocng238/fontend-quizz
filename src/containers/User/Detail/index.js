import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Button } from 'antd';

import contactActions from '@iso/redux/contacts/actions';
import SingleContactView from '@iso/components/Contacts/SingleView';
import EditContactView from '@iso/components/Contacts/EditView';
import { otherAttributes } from './data';
import IntlMessages from '@iso/components/utility/intlMessages';
import { ContactsWrapper } from './User.styles';
import Scrollbar from '@iso/components/utility/customScrollBar';
import { Link } from 'react-router-dom';

const { editContact, viewChange } = contactActions;

const { Content } = Layout;

export default function Contacts() {
  const { contacts, selectedId, editView } = useSelector(
    (state) => state.Contacts
  );
  const dispatch = useDispatch();

  const selectedContact = selectedId
    ? contacts.filter((contact) => contact.id === selectedId)[0]
    : null;

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
            <SingleContactView
              contact={selectedContact}
              otherAttributes={otherAttributes}
            />
          </Scrollbar>
        </Content>
      </Layout>
    </ContactsWrapper>
  );
}
