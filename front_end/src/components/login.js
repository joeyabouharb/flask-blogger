import { createElement, useState } from 'react';
import { loginRequest } from '../services/data_services';
import { useAuthDispatch } from '../contexts/auth/store';
import { userLogsIn } from '../contexts/auth/actions';

const Login = (props) => {
  const [formContent, onContentChange] = useState({
    email: '',
    password: '',
  });

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
    }).then(() => props.history.push('/')).catch((error) => {
      alert(error);
    });
  };

  return createElement(
    'form', {
      onSubmit: onFormSubmit,
      style: { display: 'flex', flexFlow: 'column' },
    },
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

export default Login;
