import {
  createElement, useState, useEffect,
} from 'react';
import { Editor } from '@tinymce/tinymce-react'
import { useAuthContext } from '../contexts/auth/store';
import { postArticle } from '../services/data_services';

const ArticleForm = (props) => {
  const state = useAuthContext();
  const [formContent, onContentChange] = useState({
    content: '',
    access_token: '',
  });
  const [error, onErrorSet] = useState();

  useEffect(() => {
    formContent.access_token = state.access_token;
  }, []);
  const setInputs = (event) => onContentChange({
    ...formContent,
    content: event.target.getContent(),
  });

  const onFormSubmit = (event) => {
    event.preventDefault();
    if (event && (formContent.content)) {
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
    },
    createElement(
      'div', { className: 'field' },
      createElement(
        'div', { className: 'control' },
      createElement(
        'label', { className: 'label' },
        'Content: ', createElement(
          Editor, {
            name: 'content',
            initialValue: "<p>This is the initial content of the editor</p>",
            init: {
              height: 500,
              menubar: true,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
              ],
              toolbar:
                'undo redo | formatselect | bold italic backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help',
              content_css: "https://cdn.jsdelivr.net/npm/bulma@0.8.0/css/bulma.min.css",
            },
            onChange: setInputs,
          },
        ),
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
