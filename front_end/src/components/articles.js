import {
  useState, useEffect,
  createElement,
} from 'react';

import { getArticles } from '../services/data_services';
import { Pagination } from './pagination';
import Article from './article';
import { ArticlesProvider, useArticleDispatch, useArticleContext } from '../contexts/article/store';
import { requestArticles } from '../contexts/article/actions';

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
        articleDispatcher(
        requestArticles(data)
      );
      setInitialPager(pageNo < 5 ? pageNo : 5);
    }
    );
  }, [pageNo]);
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
      }, '',
    ), result ? result.map((content, index) => Article(content, index)) : '',
    createElement(Pagination, { currentPage, setCurrentPage, initialPager })
  );
};

export default Articles;
