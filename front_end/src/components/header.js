import { Link } from 'react-router-dom';
import { createElement } from 'react';
import { useAuthContext } from '../contexts/auth/store';

const Header = () => {
  const state = useAuthContext();

  return createElement(
    'nav', null,
    state ? createElement('div', null, `Hello ${state.identity}!`) : '',
    createElement(Link, { to: '/blog' }, 'Home'),
    createElement(Link, { to: '/blog/new' }, 'New Post'),
    createElement(Link, { to: '/register' }, 'Register'),
    createElement(Link, { to: '/login' }, 'Login'),
  );
};

export default Header;
