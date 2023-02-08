import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app';
import './main.scss';
import Layout from './pages/layout/layout'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Layout />
  </React.StrictMode>
);
