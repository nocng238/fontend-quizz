import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Form,
  Input,
  Button,
  notification,
  Col,
  Row,
  Upload,
  Image,
  Popover,
  Spin,
  InputNumber,
  Divider,
} from 'antd';
import { Link } from 'react-router-dom';
import siteConfig from '@iso/config/site.config';

import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import IntlMessages from '@iso/components/utility/intlMessages';
import { BoxWrapper, BoxHeader } from '../User.styles';
import axios from 'axios';
import customAxios from '../../../library/helpers/axios';
import userActions from '@iso/redux/user/actions';
const { updateUserAction } = userActions;
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

const tailFormItemLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 16, offset: 8 },
    lg: { span: 14, offset: 6 },
  },
};

export default function UserEdit() {
  //axios for upload file
  const { privateAxios } = customAxios;
  const privateAxios2 = axios.create({
    baseURL: siteConfig.apiUrl || 'http://localhost:8000/api/v1',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: localStorage.getItem('id_token') || undefined,
    },
  });
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const dispatch = useDispatch();
  const [fileList, setFileList] = useState([]);
  const [image, setImage] = useState(null);
  useEffect(() => {
    // get user profile
    const getUserProfile = async () => {
      const userProfile = await privateAxios.get('/user/profile');
      const user = userProfile.data;
      form1.setFieldsValue({
        userName: user.userName,
        name: user.name,
        email: user.email,
        phone: user.phone || null,
        address: user.address || null,
      });
      setImage(user.avatar);
    };
    getUserProfile();
  }, []);
  const [preview, setPreview] = useState(false);
  const onPreview = () => {
    setPreview(!preview);
    setOpen(false);
  };
  const [open, setOpen] = useState(false);
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  const [loading, setLoading] = useState(false);
  const handleChange = async (info) => {
    try {
      // Get this url from response in real world.
      const formData = new FormData();
      formData.append('question', info.file);
      setLoading(true);
      const { data } = await privateAxios2.post(
        '/upload/uploadAvatar',
        formData
      );
      setLoading(false);
      setImage(data.url);
    } catch (error) {
      console.log(error);
    }
  };
  // props for upload
  const props = {
    accept: '.png, .jpeg, .jpg',
    maxCount: 1,
    onChange: handleChange,
    beforeUpload: (file) => {
      setFileList([file]);
      return false;
    },
    fileList,
    showUploadList: false,
  };

  const updateProfile = async (values) => {
    try {
      const { name, email, phone } = values;
      // await privateAxios.patch('/user/profile', {
      //   name,
      //   email,
      //   phone,
      //   avatar: image,
      // });
      dispatch(updateUserAction({ name, email, phone, avatar: image }));
      localStorage.setItem('avatar', image);
      notification.success({ message: 'Update successfully', duration: 2 });
    } catch (error) {
      console.log(error);
      notification.error({ message: error.message, duration: 2 });
    }
  };
  const updatePassword = async (values) => {
    try {
      const { oldPassword, newPassword, confirmPassword } = values;
      const isMatch = newPassword === confirmPassword;
      if (!isMatch) {
        notification.error({ message: "Password doesn't match", duration: 2 });
        return;
      }
      await privateAxios.patch('/user/profile/updatePassword', {
        oldPassword,
        newPassword,
      });
      form2.setFieldsValue({
        newPassword: '',
        oldPassword: '',
        confirmPassword: '',
      });
      notification.success({
        message: 'Password was updated successfully',
        duration: 2,
      });
    } catch (error) {
      notification.error({ message: error.response.data.message, duration: 2 });
    }
  };
  const popOver = () => {
    return (
      <>
        <Button style={{ marginRight: '20px' }} onClick={onPreview}>
          View Avatar
        </Button>
        <Upload {...props}>
          <Button>Change Avatar</Button>
        </Upload>
      </>
    );
  };

  return (
    <LayoutWrapper>
      <Link to='/dashboard'>
        <Button color='primary'>
          <IntlMessages id='commons.back' />
        </Button>
      </Link>

      <BoxWrapper>
        <BoxHeader>
          {/* <IntlMessages id='commons.changePassword'></IntlMessages> */}

          <Divider>
            <h1 style={{ fontSize: '20px' }}> Profile</h1>
          </Divider>
        </BoxHeader>

        <Form
          {...formItemLayout}
          form={form1}
          name='updateUser'
          onFinish={updateProfile}
        >
          <Row>
            <Col flex='200px'>
              <Row>
                {loading ? (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '200px',
                      height: '200px',
                    }}
                  >
                    <Spin tip='loading' size='large'></Spin>
                  </div>
                ) : (
                  <Popover
                    trigger='click'
                    content={popOver}
                    placement='bottom'
                    open={open}
                    onOpenChange={handleOpenChange}
                  >
                    <Image
                      alt='avatar'
                      src={image}
                      width={'200px'}
                      height={'200px'}
                      preview={
                        preview
                          ? {
                              visible: preview,
                              onVisibleChange: (value) => {
                                setPreview(value);
                              },
                            }
                          : false
                      }
                      style={{
                        cursor: 'pointer',
                        objectFit: 'cover',
                        borderRadius: '100px',
                      }}
                    >
                      {' '}
                    </Image>
                  </Popover>
                )}
              </Row>
            </Col>
            <Col flex='auto'>
              <Form.Item name='userName' label='Username'>
                <Input disabled={true} />
              </Form.Item>
              <Form.Item
                name='name'
                label='Name'
                // rules={[
                //   {
                //     required: true,
                //     message: 'Please input your name!',
                //     whitespace: true,
                //   },
                // ]}
              >
                <Input disabled={true} />
              </Form.Item>

              <Form.Item
                name='email'
                label='E-mail'
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item name='phone' label='Phone Number(+85)'>
                <InputNumber style={{ width: '100%' }} controls={false} />
              </Form.Item>
              <Form.Item name='address' label='Address'>
                <Input />
              </Form.Item>

              {/* <Form.Item name='status' label='Status'>
                <Select>
                  <Option value='active'>
                    <IntlMessages id='commons.active' />
                  </Option>
                  <Option value='inactive'>
                    <IntlMessages id='commons.inactive' />
                  </Option>
                </Select>
              </Form.Item> */}

              <Form.Item {...tailFormItemLayout}>
                <Button type='primary' htmlType='submit'>
                  <IntlMessages id='commons.save' />
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </BoxWrapper>
      <BoxWrapper>
        <BoxHeader>
          <Divider>
            <h1 style={{ fontSize: '20px' }}>Change Password</h1>
          </Divider>
        </BoxHeader>
        <Form
          {...formItemLayout}
          name='updatePassword'
          onFinish={updatePassword}
          form={form2}
        >
          <Form.Item
            name='oldPassword'
            label='Old Password'
            rules={[
              {
                required: true,
                message: 'Please enter old password!',
                whitespace: true,
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name='newPassword'
            label='New Password'
            rules={[
              {
                required: true,
                message: 'Please enter new password!',
                whitespace: true,
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name='confirmPassword'
            label='Confirm Password'
            rules={[
              {
                required: true,
                message: 'Please enter confirm password!',
                whitespace: true,
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type='primary' htmlType='submit'>
              <IntlMessages id='commons.changePassword' />
            </Button>
          </Form.Item>
        </Form>
      </BoxWrapper>
    </LayoutWrapper>
  );
}
