import { createElement, useState } from 'react';
import { loginRequest } from '../services/data_services';
import { useAuthDispatch } from '../contexts/auth/store';
import { userLogsIn } from '../contexts/auth/actions';

const Login = (props) => {
  const [formContent, onContentChange] = useState({
    email: '',
    password: '',
  });
  const [messages, onMessageChange] = useState('');
  const setInputs = (event) => onContentChange({
    ...formContent,
    [event.target.name]: event.target.value,
  });

  const dispatch = useAuthDispatch();

  const onFormSubmit = (event) => {
    event.preventDefault();
    loginRequest(formContent).then((data) => {
      if (data.access_token) {
        dispatch(userLogsIn(data.access_token));
      } else {
        throw new Error('Invalid Credentials!');
      }
    }).then().catch((error) => {
      onMessageChange(error);
    });
  };

  return createElement('div', { className: 'section'}, createElement(
    'form', {
      onSubmit: onFormSubmit,
      className: 'container',
    }, createElement('h2', { className: 'title is-3' }, 'Login'),
    createElement(
      'div', {
        className: 'field',
      },
      createElement(
        'div', {
          className: 'control',
        },
        createElement(
          'label', {
            className: 'label',
          },
          'Email: ', createElement(
            'input', {
              name: 'email',
              type: 'email',
              value: formContent.email,
              onChange: setInputs,
              className: 'input',
            },
          ),
        ),
      ),
    ),
    createElement(
      'div', {
        className: 'field',
      },
      createElement(
        'label', { className: 'label' },
        'Password: ',
        createElement(
          'div', {
            className: 'control',
          },
          createElement(
            'input', {
              type: 'password',
              name: 'password',
              value: formContent.password,
              onChange: setInputs,
              className: 'input',
            },
          ),
        ),
      ),
    ),
    createElement('p', null, `${messages}`),
    createElement(
      'button', {
        type: 'submit',
        className: 'button',
      }, 'Submit',
    ),
  ));
};

export default Login;
