import { createElement } from 'react';

const Article = ({title, content}) => createElement(
  'article', {
    key: title,
    className: 'hero-body',
  },
  createElement(
    'h2', {
      className: 'title is-2',
    }, title,
  ),
  createElement(
    'p', {
      className: 'sibtitle',
    }, content,
  ),
);

export default Article;
