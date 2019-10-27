import { Link } from 'react-router-dom';
import React from 'react';

const Header = () => (
  <nav>
    <Link to="/blog"> Home </Link>
    <Link to="/blog/new">New Post</Link>
  </nav>
  // createElement(Link, { to: '/blog' }, 'Home'),
  // createElement(Link, { to: '/blog/new' }, 'New Post'),
);

export default Header;
