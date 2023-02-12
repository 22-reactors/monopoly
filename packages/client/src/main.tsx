import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app';
import Select from './components/select/select';
import './main.scss';

function Test() {
  return (
    <div>
      <Select label={'Тип'} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Test />
  </React.StrictMode>
);
