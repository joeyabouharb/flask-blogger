import { createElement, useState } from 'react';

const RegisterForm = () => {
  const [formContent, onContentChange] = useState({});

  const setInputs = (event) => onContentChange({
    ...formContent,
    [event.target.name]: event.target.value,
  });

  const onRegistrationSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
  };

  return createElement(
    'form', { onSubmit: onRegistrationSubmit },
    createElement(
      'label', null,
      'name: ',
      createElement(
        'input', {
          value: formContent.name,
          name: 'name',
          type: 'text',
          onChange: setInputs,
        },
      ),
    ),
    createElement(
      'label', null, 'email: ',
      createElement('input', {
        type: 'email',
        name: 'email',
        value: formContent.email,
        onChange: setInputs,
      }),
    ),
    createElement(
      'label', 'null',
      createElement('input', {
        type: 'password',
        name: 'password',
        value: formContent.password,
        onChange: setInputs,
      }),
    ),
  );
};

export default RegisterForm;
