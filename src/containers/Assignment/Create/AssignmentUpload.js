import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload, Row, Spin, Col, notification } from 'antd';
import { useHistory } from 'react-router';
import axios from 'axios';
import siteConfig from '@iso/config/site.config';
const privateAxios = axios.create({
  baseURL: siteConfig.apiUrl || 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: localStorage.getItem('id_token') || undefined,
  },
});

const App = () => {
  const [fileList, setFileList] = useState([]);
  const [exporting, setExporting] = useState(false);
  const history = useHistory();
  const handleUpload = async () => {
    try {
      const formData = new FormData();
      fileList.forEach((file) => {
        formData.append('question', file);
      });
      setExporting(true);
      // You can use any AJAX library you like
      await privateAxios.post('/assignment/createByImportFile', formData);
      history.push('/assignments');
      notification.success({ message: 'Create Successfully', duration: 2 });
    } catch (error) {
      message.error('export failed.');
      setExporting(false);
    }
  };
  const props = {
    accept: '.doc, .docx',
    maxCount: 1,
    onRemove: (file) => {
      setFileList([]);
    },
    beforeUpload: (file) => {
      setFileList([file]);
      return false;
    },
    fileList,
  };
  return (
    <Spin spinning={exporting}>
      <Row justify='center' gutter={32}>
        <Col>
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
          <Button
            type='primary'
            onClick={handleUpload}
            disabled={fileList.length === 0}
            style={{
              marginTop: 16,
            }}
          >
            Export
          </Button>
        </Col>
      </Row>
    </Spin>
  );
};
export default App;
