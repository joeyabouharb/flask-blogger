import { Link } from 'react-router-dom';
import { createElement } from 'react';

const Header = () => createElement(
  'nav', null,
  createElement(Link, { to: '/blog' }, 'Home'),
  createElement(Link, { to: '/blog/new' }, 'New Post'),
);

export default Header;
