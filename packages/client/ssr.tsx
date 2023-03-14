import React from 'react';
import { renderToString } from 'react-dom/server';
import { App } from './src/app';

export function render() {
  return renderToString(<App />);
}
