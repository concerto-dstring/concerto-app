import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.css'
import store from '../src/maintable/FixedDataTableStore'
import { Provider } from 'react-redux'
import { BrowserRouter } from "react-router-dom";

// antd配置
import { ConfigProvider } from 'antd'
import zh_CN from 'antd/es/locale/zh_CN'

// amplify
import Amplify from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config)

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider locale={zh_CN}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </ConfigProvider>
  </Provider>, 
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
