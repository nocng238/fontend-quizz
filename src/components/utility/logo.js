import React from 'react';
import { Link } from 'react-router-dom';

import siteConfig from '@iso/config/site.config';
import logo from '@iso/assets/images/logo.png'

export default ({ collapsed }) => {
  return (
    <div className="isoLogoWrapper">
      {collapsed ? (
        <div>
          <h3>
            <Link to="/">
              <img src={logo} alt='Logo' className='logo' />
            </Link>
          </h3>
        </div>
      ) : (
        <h3>
          <Link to="/">{siteConfig.siteName}</Link>
        </h3>
      )}
    </div>
  );
};
