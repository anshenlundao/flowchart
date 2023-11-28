/*
 * @Author: azm
 * @LastEditors: azm
 * @Date: 2023-10-14 15:16:42
 * @LastEditTime: 2023-10-23 09:39:21
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "@/index.css"
import store from '@/store/index.js'
import { Provider } from 'react-redux'
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <App ></App>
  </Provider>
  // </React.StrictMode>,
)
