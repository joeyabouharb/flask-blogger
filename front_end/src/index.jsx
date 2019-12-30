<<<<<<< HEAD:front_end/src/index.jsx

import React from 'react';
=======
import { createElement } from 'react';
>>>>>>> joey:front_end/src/index.js
import ReactDOM from 'react-dom';
import App from './components/app';

ReactDOM.render(
<<<<<<< HEAD:front_end/src/index.jsx
  <BrowserRouter>
    <App />
  </BrowserRouter>,
=======
  createElement(
    App, null,
  ),
>>>>>>> joey:front_end/src/index.js
  document.getElementById('app'),
);
