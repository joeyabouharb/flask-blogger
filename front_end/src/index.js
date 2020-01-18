import ReactDOM from 'react-dom';
import App from './components/app';
import { createElement } from 'react';
ReactDOM.render(
  createElement(
    App, null,
  ),
  document.getElementById('app'),
);
