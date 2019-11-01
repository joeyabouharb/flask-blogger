import { Link } from 'react-router-dom';
import { createElement } from 'react';
import { useAuthContext } from '../contexts/auth/store';

const Header = () => {
  const state = useAuthContext();

  return createElement(
    'nav', { className: 'navbar' },
    state
      ? [
        createElement(
          'div', {
            className: 'navbar-item',
          },
          `Hello ${state.identity}!`,
        ),
        createElement(
          Link, {
            key: 'blog-new-nav',
            to: '/blog/new',
            className: 'navbar-item',
          }, 'New Post',
        ),
      ]
      : [
        createElement(
          Link, {
            key: 'register-nav',
            to: '/register',
            className: 'navbar-item',
          }, 'Register',
        ),
        createElement(
          Link, {
            key: 'login-nav',
            to: '/login',
            className: 'navbar-item',
          }, 'Login',
        ),
      ],
    createElement(
      Link, {
        to: '/blog',
        className: 'navbar-item',
      }, 'Home',
    ),
  );
};

export default Header;
