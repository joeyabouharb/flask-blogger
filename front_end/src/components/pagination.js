import { createElement, useState, useEffect } from 'react';
import { range } from '../services/utilts';
import { getArticles } from '../services/data_services';
import Article from './article';
import { useArticleContext, useArticleDispatch } from '../contexts/article/store';
import { requestArticles } from '../contexts/article/actions';

const Buttons = ({ currentPage, setCurrentPage, pager, setPager, initialPager }) => {
  const { pageNo } = useArticleContext();
  const articleDispatcher = useArticleDispatch();
  return [...range(
    { start: pager - initialPager, end: pager }
  )].map((num) => {
      return createElement(
      'li', {
        key: `pageNo ${num}`,
      }, createElement(
        'a', {
          className: `pagination-link ${
            num === currentPage ? 'is-current' : 'pagination-link'
          }`,
          onClick: () => {
            setCurrentPage(num)
            if (num + 2 > pageNo) {
              setPager(pageNo)
            } else if (num > initialPager - 2) {
              setPager(num + 2)
            } else {
              setPager(initialPager)
            }
            getArticles(num).then(
              (data) => articleDispatcher(requestArticles(data))
            );
          }
        }, num,
      ),
    )});
};

const Pagination = ({ currentPage, setCurrentPage, initialPager}) => {
  const articleDispatcher = useArticleDispatch();
  const { pageNo } = useArticleContext();
  const [pagination, setPagination] = useState();
  const [pager, setPager] = useState();
  
  useEffect(() => {
    setPager(initialPager)
  }, [initialPager])
  return createElement(
    'nav', {
      className: 'pagination is-centered',
      role: 'navigation',
      'aria-label': 'pagination',
    },
    createElement('a', {
      className: 'pagination-previous',
      onClick: () => {
        currentPage > 1 ? setCurrentPage(currentPage - 1) : 1
        pager !== initialPager ? setPager(pager - 1) : initialPager
        getArticles(currentPage - 1).then(
          (data) => articleDispatcher(requestArticles(data))
        );
      }
    }, 'Previous'),
    createElement('a', {
      className: 'pagination-next',
      onClick: () => {
        currentPage < pageNo ? setCurrentPage(currentPage + 1) : currentPage
        pager !== pageNo ? setPager(pager + 1) : pager
        getArticles(currentPage + 1).then(
          (data) => articleDispatcher(requestArticles(data))
        );
      }
    }, 'Next'),
    createElement('ul', { className: 'pagination-list section' },
    createElement(Buttons, { currentPage, setCurrentPage, pager, setPager, initialPager }),
  ));
};

export { Pagination }