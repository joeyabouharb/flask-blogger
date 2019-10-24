import { Link } from 'react-router-dom';
import { createElement as el } from 'react';

const Header = el(
  'nav', null,
  el(Link, { to: '/blog' }, 'Home'),
  el(Link, { to: '/blog/new' }, 'New Post'),
);

export default Header;
