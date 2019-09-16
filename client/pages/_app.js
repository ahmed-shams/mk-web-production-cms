import React from 'react';
import Proptypes from 'prop-types';
import AppLayout from '../components/app/AppLayout';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { createStore, compose, applyMiddleware } from 'redux';
import reducer from '../reducers';
import createSagaMiddleWare from 'redux-saga';
import withReduxSaga from 'next-redux-saga';
import rootSaga from '../sagas';
import Helmet from 'react-helmet';
import '../utils/fake.css';
import axios from 'axios';
import { LOAD_USER_REQUEST } from '../reducers/user';

const Layout = ({ Component, store, pageProps }) => {
  return (
    <Provider store={store}>
      <Helmet
        title="MK Web Production App"
        htmlAttributes={{ lang: 'en' }}
        meta={[{
          charset: 'UTF-8',
        }, {
          name: 'viewport',
          content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes,viewport-fit=cover',
        }, {
          'http-equiv': 'X-UA-Compatible', content: 'IE=edge',
        }, {
          name: 'description', content: 'Michael Kors Web Prodcution Internal App',
        }, {
          name: 'og:title', content: 'MK Web Production App',
        }, {
          name: 'og:description', content: 'Michael Kors Web Prodcution Internal App',
        }, {
          property: 'og:type', content: 'website',
        }, {
          property: 'og:image', content: 'https://digital.michaelkors.com/refreshes/2019/fall/refresh2/global/desktop/women/LP_WOMEN_1.jpg',
        }]}
        link={[{
          rel: 'shortcut icon', href: '/favicon.ico', type: 'image/x-icon',
        }, {
          rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css',
        }, {
          rel: 'stylesheet', href: 'https://www.michaelkors.com/img/MKBusiness/css/2019/fall/refresh2/mk-style.min.css',
        }]}
      />
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
  const state = ctx.store.getState();
  const cookie = ctx.isServer ? ctx.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (ctx.isServer && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  if (!state.user.me) {
    ctx.store.dispatch({
      type: LOAD_USER_REQUEST
    })
  }
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
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store
}

export default withRedux(configureStore)(withReduxSaga(Layout));
