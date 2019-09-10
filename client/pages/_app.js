import React from 'react';
import Head from 'next/head';
import Proptypes from 'prop-types';
import AppLayout from '../components/app/AppLayout';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { createStore, compose, applyMiddleware } from 'redux';
import reducer from '../reducers';
import createSagaMiddleWare from 'redux-saga';
import rootSaga from '../sagas';
import '../utils/fake.css';

const Layout = ({ Component, store, pageProps }) => {
  return (
    <Provider store={store}>
      <Head>
        <title>MK WEB CMS</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.20.1/antd.css" />
        <link rel="stylesheet" href="https://www.michaelkors.com/img/MKBusiness/css/2019/fall/refresh2/mk-style.min.css" />
        <link rel="stylesheet" href="node_modules/foundation-sites/dist/css/foundation-sites.min.css" />
      </Head>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </Provider>
  );
}

Layout.proptypes = {
  Component: Proptypes.elementType,
  store: Proptypes.object,
  pageProps: Proptypes.object
}

Layout.getInitialProps = async (context) => {
  const { ctx, Component } = context;
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return { pageProps }
}

const configureStore = (initialState, options) => {
  const sagaMiddleware = createSagaMiddleWare();
  const middlewares = [sagaMiddleware];
  const enhancer = process.env.NODE_ENV === 'production'
  ? compose(applyMiddleware(...middlewares))
  : compose(
    applyMiddleware(...middlewares),
    !options.isServer && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
  );
  const store = createStore(reducer, initialState, enhancer);
  sagaMiddleware.run(rootSaga);
  return store
}

export default withRedux(configureStore)(Layout);

