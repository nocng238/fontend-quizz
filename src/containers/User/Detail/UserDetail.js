import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Select } from 'antd';
import { Link, useParams } from 'react-router-dom';

import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import PageHeader from '@iso/components/utility/pageHeader';
import IntlMessages from '@iso/components/utility/intlMessages';
import { BoxWrapper, BoxHeader } from '../User.styles';
import userActions from '@iso/redux/user/actions';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
    lg: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
    lg: { span: 14 },
  },
};

const { Option } = Select;

const { getUserAction } = userActions;

export default function UserDetail() {
  const { userId } = useParams();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.User);

  useEffect(() => {
    if (!Object.keys(user).length) {
      dispatch(getUserAction(userId));
    }

    form.setFieldsValue({
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      status: user?.status,
    });
  }, [userId, user]);

  return (
    <LayoutWrapper>
      <PageHeader>
        <IntlMessages id='user.updateUser' />
      </PageHeader>

      <BoxWrapper>
        <BoxHeader>
          <Link to='/users'>
            <Button color='primary'>
              <IntlMessages id='commons.back' />
            </Button>
          </Link>
          <Link to={`/users/edit/${userId}`}>
            <Button type='primary'>
              <IntlMessages id='commons.edit' />
            </Button>
          </Link>
        </BoxHeader>

        <Form {...formItemLayout} form={form} name='detailUser'>
          <Form.Item name='name' label='Name'>
            <Input disabled />
          </Form.Item>

          <Form.Item name='email' label='E-mail'>
            <Input disabled />
          </Form.Item>

          <Form.Item name='phone' label='Phone Number'>
            <Input disabled />
          </Form.Item>

          <Form.Item name='status' label='Status'>
            <Select disabled>
              <Option value='active'>
                <IntlMessages id='commons.active' />
              </Option>
              <Option value='inactive'>
                <IntlMessages id='commons.inactive' />
              </Option>
            </Select>
          </Form.Item>
        </Form>
      </BoxWrapper>
    </LayoutWrapper>
  );
}
