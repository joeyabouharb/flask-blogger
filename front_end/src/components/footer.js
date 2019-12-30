import { createElement } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../contexts/auth/store';

const Footer = () => {
  const state = useAuthContext();

  return createElement(
    'footer', {
      className: 'footer has-background-dark',
    },
    createElement(
      'div', {
        className: 'content has-text-centered',
      },
      createElement(
        'p', { className: 'has-text-light' },
        'Blogg Platform ©2019',
      ),
      createElement(
        'div', {
          className: 'columns is-mobile',
        },
        state
          ? createElement(
            'div', {
              className: 'column',
            },
            createElement(
              Link, {
                to: '/blog/new',
                className: 'button is-link',
              },
              'New Post',
            ),
          )
          : [
            createElement(
              'div', {
                key: 'register-foot',
                className: 'column',
              },
              createElement(
                Link, {
                  to: '/register',
                  className: 'button is-link',
                },
                'Register',
              ),
            ),
            createElement(
              'div', {
                className: 'column',
                key: 'login-foot',
              },
              createElement(
                Link, {
                  to: '/login',
                  className: 'button is-link',
                }, 'Login',
              ),
            ),
          ],
        createElement(
          'div', {
            className: 'column',
          },
          createElement(
            Link, {
              to: '/blog', className: 'button is-link',
            }, 'Home',
          ),
        ),
      ),
    ),
  );
};

export default Footer;
