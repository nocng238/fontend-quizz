import React from 'react';
import Link from 'next/link';

import siteConfig from '@iso/config/site.config';
import logo from '@iso/assets/images/logo.png'

export default function({ collapsed }) {
  return (
    <div className="isoLogoWrapper">
      {collapsed ? (
        <div>
          <h3>
            <img src={logo} alt='Logo' className='logo' />
          </h3>
        </div>
      ) : (
        <h3>
          <Link href="/">
            <p>{siteConfig.siteName}</p>
          </Link>
        </h3>
      )}
    </div>
  );
}
