import {
  useState, useEffect,
  createElement,
} from 'react';

import { getArticles } from '../services/data_services';


const Articles = () => {
  const [articles, onArticlesRequest] = useState(null);

  useEffect(() => {
    getArticles().then((data) => onArticlesRequest(
      data.map(
        ({ title, content }) => createElement(
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
        ),
      ),
    ));
  }, []);

  return createElement(
    'main', { className: 'section' },
    createElement(
      'h1', {
        className: 'title is-1',
      }, 'Blog',
    ),
    createElement(
      'section', {
        className: 'hero is-light',
      }, articles,
    ),
  );
};

export default Articles;
