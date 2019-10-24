
import { createElement } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/app';


ReactDOM.render(
  createElement(
    BrowserRouter,
    null,
    createElement(App),
  ),
  document.getElementById('app'),
);
