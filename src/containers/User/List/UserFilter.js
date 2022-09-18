import React, { useState } from 'react';
import { Drawer, Button, Select, Form } from 'antd';

import IntlMessages from '@iso/components/utility/intlMessages';

const style = {
  marginRight: '10px',
};

const { Option } = Select;

const UserFilter = () => {
  const [form] = Form.useForm();

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <>
      <Button onClick={showDrawer} style={style}>
        <IntlMessages id='commons.filter' />
      </Button>
      <Drawer
        title={<IntlMessages id='commons.filter' />}
        placement='right'
        onClose={onClose}
        open={open}
      >
        <Form
          layout='vertical'
          form={form}
          initialValues={{
            layout: 'vertical',
          }}
        >
          <Form.Item label='Status'>
            <Select
              mode='multiple'
              allowClear
              style={{
                width: '100%',
              }}
              placeholder='Please select'
              onChange={handleChange}
            >
              <Option value='active'>Active</Option>
              <Option value='inactive'>Inactive</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type='primary'>Filter</Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default UserFilter;
