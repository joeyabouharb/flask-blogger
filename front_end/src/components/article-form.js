import {
  createElement as el,
  useState,
} from 'react';
import { postArticle } from '../services/data_services';

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
    if (event) {
      event.preventDefault();
    }
    console.log(formContent);
  };

  return el('form',
    { onSubmit: onFormSubmit },
    el('label', null,
      'Title', el('input', {
        type: 'text',
        value: formContent.title,
        name: 'title',
        onChange: setInputs,
      })),
    el('label', null,
      'Content', el('input', {
        type: 'textarea',
        name: 'content',
        value: formContent.content,
        onChange: setInputs,
      })),
    el('input',
      { type: 'submit', value: 'Submit' }));
};

export default ArticleForm;
