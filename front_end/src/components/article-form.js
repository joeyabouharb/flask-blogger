import {
  createElement, useState,
} from 'react';

const ArticleForm = () => {
  const [formContent, onContentChange] = useState({
    title: '',
    content: '',
  });
  const setInputs = (event) => onContentChange({
    ...formContent,
    [event.target.name]: event.target.value,
  });

  const onFormSubmit = (event) => {
    event.preventDefault();
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
          value: formContent.title,
          name: 'title',
          onChange: setInputs,
          style: { width: '300px' },
        },
      ),
    ),
    createElement(
      'label', null,
      'Content', createElement(
        'textarea', {
          name: 'content',
          value: formContent.content,
          onChange: setInputs,
          style: {
            width: '300px', height: '100px',
          },
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

export default ArticleForm;
