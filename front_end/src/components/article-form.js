import {
  createElement, useState, useEffect,
} from 'react';
import { useAuthContext } from '../contexts/auth/store';
import { postArticle } from '../services/data_services';

const ArticleForm = (props) => {
  const state = useAuthContext();
  const [formContent, onContentChange] = useState({
    title: '',
    content: '',
    access_token: '',
  });
  useEffect(() => {
    formContent.access_token = state.access_token;
  }, []);
  const setInputs = (event) => onContentChange({
    ...formContent,
    [event.target.name]: event.target.value,
  });

  const onFormSubmit = (event) => {
    event.preventDefault();
    postArticle(formContent).then(
      (response) => {
        if (response.status === 200 || response.status === 201) {
          props.history.push('/');
        } else {
          throw new Error('??');
        }
      },
    ).catch((err) => {
      throw new Error(err);
    });
  };

  return createElement(
    'form', {
      onSubmit: onFormSubmit,
      className: 'section',
    }, createElement(
      'div', { className: 'field' },
      createElement(
        'label', { className: 'label' },
      ),
      createElement(
        'div', { className: 'control' },
        'Title: ', createElement(
          'input', {
            type: 'text',
            value: formContent.title,
            name: 'title',
            onChange: setInputs,
            className: 'input',
          },
        ),
      ),
    ),
    createElement(
      'div', { className: 'field' },
      createElement(
        'label', { className: 'label' },
      ),
      createElement(
        'div', { className: 'control' },
        'Content: ', createElement(
          'textarea', {
            name: 'content',
            value: formContent.content,
            onChange: setInputs,
            className: 'input',
          },
        ),
      ),
    ),
    createElement(
      'input', {
        type: 'submit',
        value: 'Submit',
        className: 'button is-link',
      },
    ),
  );
};

export default ArticleForm;
