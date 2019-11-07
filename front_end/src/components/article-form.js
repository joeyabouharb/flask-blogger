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
  const [error, onErrorSet] = useState();

  useEffect(() => {
    formContent.access_token = state.access_token;
  }, []);
  const setInputs = (event) => onContentChange({
    ...formContent,
    [event.target.name]: event.target.value,
  });

  const onFormSubmit = (event) => {
    event.preventDefault();
    if (event && (formContent.title && formContent.content)) {
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
    } else {
      onErrorSet(() => (
        'Ensure you have entered in your blog correctly!'
      ));
    }
  };

  return createElement(
    'form', {
      onSubmit: onFormSubmit,
      className: 'section',
    }, createElement(
      'div', { className: 'field' },
      createElement(
        'div', { className: 'control' },
      ),
      createElement(
        'label', { className: 'label' },
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
        'div', { className: 'control' },
      ),
      createElement(
        'label', { className: 'label' },
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
    createElement('p', { }, error), 
    createElement(
      'button', {
        type: 'submit',
        className: 'button is-link',
      }, 'Submit',
    ),
  );
};

export default ArticleForm;
