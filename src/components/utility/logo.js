import React from 'react';
import { Link } from 'react-router-dom';

import siteConfig from '@iso/config/site.config';
import logo from '@iso/assets/images/logo.png';

const style = { width: '80%', marginTop: '5px' };

export default ({ collapsed }) => {
  return (
    <div className='isoLogoWrapper'>
      {collapsed ? (
        <Link to='/'>
          <img src={logo} alt='Logo' style={style} />
        </Link>
      ) : (
        <h3>
          <Link to='/'>{siteConfig.siteName}</Link>
        </h3>
      )}
    </div>
  );
};
