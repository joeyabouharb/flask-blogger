import {
  useState, useEffect,
  createElement,
} from 'react';

import { getArticles } from '../services/data_services';
import { Pagination } from './pagination';
import Article from './article';
import { ArticlesProvider, useArticleDispatch, useArticleContext } from '../contexts/article/store';
import { requestArticles } from '../contexts/article/actions';
import { SyncLoader } from 'react-spinners';
import { css } from '@emotion/core';

const Articles = () => {
  return createElement(ArticlesProvider, {}, createElement(ArticlesContent));
};

const ArticlesContent = () => {
  const { result, pageNo } = useArticleContext();
  const articleDispatcher = useArticleDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [initialPager, setInitialPager] = useState();

  useEffect(() => {
    getArticles(currentPage).then(
      (data) => {
        console.log(data)
        articleDispatcher(
        requestArticles(data)
      );
      setInitialPager(pageNo < 5 ? pageNo : 5);
    }
    );
  }, [pageNo]);
  return createElement(
    'section', { className: 'hero-body' },
    createElement('div', {
      className: 'container'
    },
    createElement(
      'h1', {
        className: 'title is-1',
      }, 'Blog',
    ),
    createElement(
      'section', {
        className: 'hero is-light',
      }, '',
    ), result
      ? result.map((content, index) => Article(content, index))
      : createElement(SyncLoader, {
        size: 100, css: css`margin: 100px;`
      }),
    createElement(Pagination, {
      currentPage, setCurrentPage, initialPager
    }),
  ));
};

export default Articles;
