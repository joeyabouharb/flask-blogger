import { createElement, Fragment } from 'react';
import { InjectRoutes } from '../services/routes';
import Header from './header';
import Footer from './footer';

const App = () => (
  createElement(
    Fragment, null,
    createElement(Header),
    InjectRoutes,
    createElement(Footer),
  )
);

export default App;
