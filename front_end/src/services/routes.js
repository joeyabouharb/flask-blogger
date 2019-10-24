import { createElement as el } from 'react';
import {
  Route, Switch
} from 'react-router-dom';
import Articles from '../components/articles';


const routes = [
  {
    path: '/',
    exact: true,
    component: Articles,
  },
  {
    path: '/home',
    component: Articles,
    exact: true,
  },
];


export const InjectRoutes = el(Switch, null, routes.map(
  ({
    path, exact, component: Component, ...rest
  }) => (
    el(Route, {
      key: path,
      path,
      exact,
      render: (props) => (el(Component, { ...props, ...rest })),
    })),
));


export default routes;
