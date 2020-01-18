import { createElement, useState } from 'react';
import { registerRequest } from '../services/data_services';

const RegisterForm = ({props}) => {
  const [formContent, onContentChange] = useState({
    name: '',
    email: '',
    password: '',
  });
  const setInputs = (event) => onContentChange({
    ...formContent,
    [event.target.name]: event.target.value,
  });

  const onFormSubmit = (event) => {
    event.preventDefault();
    registerRequest(formContent).then((response) => {
      if (response.status === 201) {
        props.history.push('/');
      }
    });
  };

  return createElement('div', { className: 'section' },
  createElement(
    'form', {
      onSubmit: onFormSubmit,
      className: 'container',
    }, createElement('h2', { className: 'title is-2' }, 'Register For a User Account:'),
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
          'Username: ', createElement(
            'input', {
              type: 'text',
              value: formContent.name,
              name: 'name',
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
        'div', { className: 'control' },
        createElement(
          'label', { className: 'label' },
          'Email: ',
          createElement(
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
      'div', { className: 'field' }, createElement('div', { className: 'control' },
        createElement(
          'label', { className: 'label' }, 'Password: ',
          createElement(
            'input', {
              type: 'password',
              name: 'password',
              value: formContent.password,
              onChange: setInputs,
              className: 'input',
            },
          ),
        )),
    ),
    createElement(
      'div', { className: 'field' },
      createElement('div', { className: 'control' },
        createElement(
          'button', {
            type: 'submit',
            className: 'button',
          }, 'Submit',
        )),
    ),
  ));
};

export default RegisterForm;
