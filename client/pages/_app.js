import React from 'react';
import Head from 'next/head';
import Proptypes from 'prop-types';
import AppLayout from '../components/app/AppLayout';

const Layout = ({ Component }) => {
  return (
    <div>
      <Head>
        <title>MK WEB CMS</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.20.1/antd.css" />
      </Head>
      <AppLayout>
        <Component />
      </AppLayout>
    </div>
  );
}

Layout.proptypes = {
  Component: Proptypes.elementType
}

export default Layout;
