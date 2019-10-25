import { createElement } from 'react';
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
    path: '/blog',
    component: Articles,
    exact: true,
  },
  {
    path: '/blog/new',
    component: ArticleForm,
    exact: true,
  },
  {
    path: 'register',
    component: '',
    exact: true
  }
];


export const InjectRoutes = createElement(Switch, null, routes.map(
  ({
    path, exact, component, ...rest
  }) => (
    createElement(Route, {
      key: path,
      path,
      exact,
      render: (props) => (createElement(component, { ...props, ...rest })),
    })),
));


export default routes;
