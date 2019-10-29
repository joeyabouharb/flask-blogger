
import { createElement } from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

ReactDOM.render(
  createElement(
    App, null,
  ),
  document.getElementById('app'),
);
