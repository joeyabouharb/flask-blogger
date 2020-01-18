import { Link } from 'react-router-dom';
import { createElement } from 'react';
import { useAuthContext } from '../contexts/auth/store';

const Header = () => {
  const state = useAuthContext();

  return createElement(
    'nav', { className: 'navbar is-spaced is-dark' },
    state
      ? [
        createElement(
          'div', {
            className: 'column is-half is-8 navbar-item has-text-light',
            key: 'identity',
          },
          `Hello ${state.identity}!`,
        ),
        createElement(
          Link, {
            key: 'blog-new-nav',
            to: '/blog/new',
            className: 'column navbar-item has-text-light',
          }, 'New Post',
        ),
      ]
      : [
        createElement('div', { className: 'column is-half is-8', key: 'space' }),
        createElement(
          Link, {
            key: 'register-nav',
            to: '/register',
            className: 'column navbar-item has-text-light',
          }, 'Register',
        ),
        createElement(
          Link, {
            key: 'login-nav',
            to: '/login',
            className: 'column navbar-item has-text-light',
          }, 'Login',
        ),
      ],
    createElement(
      Link, {
        to: '/blog',
        className: 'column navbar-item has-text-light',
      }, 'Home',
    ),
  );
};

export default Header;
