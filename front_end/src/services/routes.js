import { createElement as el } from 'react';
import {
  Route, Switch,
} from 'react-router-dom';
import Articles from '../components/articles';
import ArticleForm from '../components/article-form';


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
  {
    path: '/blog/new',
    component: ArticleForm,
    exact: true,
  },
];


export const InjectRoutes = el(Switch, null, routes.map(
  ({
    path, exact, component, ...rest
  }) => (
    el(Route, {
      key: path,
      path,
      exact,
      render: (props) => (el(component, { ...props, ...rest })),
    })),
));


export default routes;
