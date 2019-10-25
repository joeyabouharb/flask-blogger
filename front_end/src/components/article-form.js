import {
  createElement,
  useState,
} from 'react';
import { postArticle } from '../services/data_services';

const ArticleForm = (props) => {
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
    postArticle(formContent);
    props.history.push('/');
  };

  return createElement('form',
    { onSubmit: onFormSubmit },
    createElement('labcreateElement', null,
      'Title', createElement('input', {
        type: 'text',
        value: formContent.title,
        name: 'title',
        onChange: setInputs,
      })),
    createElement('labcreateElement', null,
      'Content', createElement('input', {
        type: 'textarea',
        name: 'content',
        value: formContent.content,
        onChange: setInputs,
      })),
    createElement('input',
      { type: 'submit', value: 'Submit' }));
};

export default ArticleForm;
