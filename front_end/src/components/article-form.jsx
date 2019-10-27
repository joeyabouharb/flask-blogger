import React, {
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

  return (
    <form onSubmit={onFormSubmit}>
      <label htmlFor="titleInput">
        Title
        <input
          id="titleInput"
          type="text"
          value={formContent.title}
          name="title"
          onChange={setInputs}
        />
      </label>
      <label htmlFor="contentInput">
        Content
        <textarea
          id="contentInput"
          value={formContent.content}
          name="content"
          onChange={setInputs}
        />
      </label>
      <button type="submit">Save</button>
    </form>
  );

  // createElement('form',
  //   { onSubmit: onFormSubmit },
  //   createElement('label', null,
  //     'Title', createElement('input', {
  //       type: 'text',
  //       value: formContent.title,
  //       name: 'title',
  //       onChange: setInputs,
  //     })),
  //   createElement('label', null,
  //     'Content', createElement('input', {
  //       type: 'textarea',
  //       name: 'content',
  //       value: formContent.content,
  //       onChange: setInputs,
  //     })),
  //   createElement('input',
  //     { type: 'submit', value: 'Submit' }));
};

export default ArticleForm;
