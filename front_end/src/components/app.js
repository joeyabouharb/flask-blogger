import { createElement } from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';
import { Router, SecureRouter } from '../services/routes';
import Header from './header';
import Footer from './footer';
import { AuthProvider } from '../contexts/auth/store';

const App = () => createElement(
  AuthProvider, null,
  createElement(
    BrowserRouter, null,
    createElement(Header),
    createElement(
      Switch, null,
      Router,
    ),
    createElement(SecureRouter),
    createElement(Footer),
  ),
);


export default App;
