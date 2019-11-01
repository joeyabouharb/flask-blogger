import { createElement } from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';
import { Router, SecureRouter, GuestRouter } from '../services/routes';
import Header from './header';
import Footer from './footer';
import { AuthProvider } from '../contexts/auth/store';
import '../styles/index.sass';

const App = () => createElement(
  'section', { className: 'section' },
  createElement(
    AuthProvider, null,
    createElement(
      BrowserRouter, null,
      createElement(Header),
      createElement(
        Switch, null,
        Router,
      ),
      createElement(SecureRouter),
      createElement(GuestRouter),
      createElement(Footer),
    ),
  ),
);


export default App;
