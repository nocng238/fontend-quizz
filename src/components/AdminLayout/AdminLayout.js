import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout } from 'antd';

import useWindowSize from '@iso/lib/hooks/useWindowSize';
import appActions from '@iso/redux/app/actions';
import siteConfig from '@iso/config/site.config';
import Sidebar from '@iso/containers/Sidebar/Sidebar';
import Topbar from '@iso/containers/Topbar/Topbar';
import AdminRoutes from './AdminRoutes';

import {
  AdminLayoutContainer,
  AdminLayoutGlobalStyles,
} from './AdminLayout.styles';

const { Content, Footer } = Layout;
const { toggleAll } = appActions;

const styles = {
  layout: { flexDirection: 'row', overflowX: 'hidden' },
  content: {
    padding: '70px 0 0',
    flexShrink: '0',
    background: '#f1f3f6',
    position: 'relative',
  },
  footer: {
    background: '#ffffff',
    textAlign: 'center',
    borderTop: '1px solid #ededed',
  },
};

export default function AdminLayout() {
  const dispatch = useDispatch();
  const appHeight = useSelector((state) => state.App.height);
  const { width, height } = useWindowSize();

  useEffect(() => {
    dispatch(toggleAll(width, height));
  }, [width, height, dispatch]);

  return (
    <AdminLayoutContainer>
      <AdminLayoutGlobalStyles />
      <Layout style={{ height: height }}>
        <Topbar />
        <Layout style={styles.layout}>
          <Sidebar />
          <Layout
            className='isoContentMainLayout'
            style={{
              height: appHeight,
            }}
          >
            <Content className='isomorphicContent' style={styles.content}>
              <AdminRoutes />
            </Content>
            <Footer style={styles.footer}>{siteConfig.footerText}</Footer>
          </Layout>
        </Layout>
      </Layout>
    </AdminLayoutContainer>
  );
}
