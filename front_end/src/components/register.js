import { createElement, useState } from 'react';
import { registerRequest } from '../services/data_services';

const RegisterForm = (props) => {
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

  return createElement(
    'form', {
      onSubmit: onFormSubmit,
      style: { display: 'flex', flexFlow: 'column' },
    }, createElement(
      'label', null,
      'Title', createElement(
        'input', {
          type: 'text',
          value: formContent.name,
          name: 'name',
          onChange: setInputs,
          style: { width: '300px' },
        },
      ),
    ),
    createElement(
      'label', null,
      'email', createElement(
        'input', {
          name: 'email',
          type: 'email',
          value: formContent.email,
          onChange: setInputs,
        },
      ),
    ),
    createElement(
      'label', null, 'password: ',
      createElement(
        'input', {
          type: 'password',
          name: 'password',
          value: formContent.password,
          onChange: setInputs,
        },
      ),
    ),
    createElement(
      'input', {
        type: 'submit',
        value: 'Submit',
        style: { margin: '10px' },
      },
    ),
  );
};

export default RegisterForm;
