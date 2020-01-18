import { createElement } from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';
import { Router, SecureRouter, GuestRouter } from '../services/routes';
import Header from './header';
import Footer from './footer';
import { AuthProvider } from '../contexts/auth/store';
import '../styles/index.sass';

const App = () => 
  createElement(
    AuthProvider, null,
    createElement(
      BrowserRouter, null,
      createElement(Header),
      createElement(
        'section', {
          className: 'hero is-fullheight has-background-grey-light'
        },
        createElement(
          Switch, null,
          Router,
        ),
        createElement(SecureRouter),
        createElement(GuestRouter),
      ),
      createElement(Footer),
    ),
  );


export default App;
