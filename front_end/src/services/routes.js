import { createElement } from 'react';
import {
  Route, Redirect,
} from 'react-router-dom';
import Articles from '../components/articles';
import ArticleForm from '../components/article-form';
import RegisterForm from '../components/register';
import Login from '../components/login';
import { useAuthContext } from '../contexts/auth/store';

const defaultRoutes = [
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
];

const guestRoutes = [
  {
    path: '/register',
    component: RegisterForm,
    exact: true,
  },
  {
    path: '/login',
    component: Login,
    exact: true,
  },
];

const secureRoutes = [
  {
    path: '/blog/new',
    component: ArticleForm,
    exact: true,
  },
];

export const Router = defaultRoutes.map(
  ({
    path, exact, component, ...rest
  }) => createElement(
    Route, {
      key: path,
      path,
      exact,
      render: (props) => (
        createElement(component, { ...props, ...rest })),
    },
  ),
);

export const GuestRouter = () => {
  const state = useAuthContext();
  return guestRoutes.map(
    ({
      path, exact, component, ...rest
    }) => createElement(
      Route, {
        key: path,
        path,
        exact,
        render: (props) => (
          !state
            ? createElement(
              component, { props, ...rest },
            )
            : createElement(Redirect, { to: '/' })
        ),
      },
    ),
  );
};

export const SecureRouter = () => {
  const state = useAuthContext();
  return secureRoutes.map(
    ({
      path, exact, component, ...rest
    }) => createElement(
      Route, {
        key: path,
        path,
        exact,
        render: (props) => (
          state
            ? createElement(
              component, { ...props, ...rest },
            )
            : createElement(Redirect, { to: '/' })),
      },
    ),
  );
};
