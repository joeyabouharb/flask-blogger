import { createElement as el, Fragment } from 'react';
import { InjectRoutes } from '../services/routes';
import Header from './header';
import Footer from './footer';

const App = () => (
  el(
    Fragment, null,
    Header,
    InjectRoutes,
    Footer,
  )
);

export default App;
