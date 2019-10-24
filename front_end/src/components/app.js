import { createElement as el, Fragment } from 'react';
import { Switch } from 'react-router-dom';
import { InjectRoutes } from '../services/routes';
import Header from './header';
import Footer from './footer';

const App = () => (
  el(
    Fragment, null,
    Header,
    el(Switch, null, InjectRoutes),
    Footer,
  )
);

export default App;
