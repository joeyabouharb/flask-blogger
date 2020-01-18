import { createElement, useState, useEffect } from 'react';
import { range } from '../services/utilts';
import { getArticles } from '../services/data_services';
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
            console.log(pager)
          }
        }, num,
      ),
    )});
};

const Pagination = ({ currentPage, setCurrentPage, initialPager}) => {
  const articleDispatcher = useArticleDispatch();
  const { pageNo } = useArticleContext();
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
        console.log(currentPage)
        if (currentPage > 1) {
          const previousPage = currentPage - 1;
          setCurrentPage(previousPage);
          getArticles(previousPage).then(data => articleDispatcher(requestArticles(data)));
          if (previousPage <= pager) {
            if (pager === initialPager) {
              setPager(initialPager)
            } else {
              setPager(previousPage)
            }
          }
        }
      }
    }, 'Previous'),
    createElement('a', {
      className: 'pagination-next',
      onClick: () => {
        if (currentPage < pageNo) {
          const nextPage = currentPage + 1;
          setCurrentPage(nextPage);
          getArticles(nextPage).then(data => articleDispatcher(requestArticles(data)));
          if (nextPage === pager) {
            if (nextPage === pageNo) {
              setPager(nextPage)
            } else {
              setPager(nextPage + 1)
            }
          }
        }
      }
    }, 'Next'),
    createElement('ul', { className: 'pagination-list section' },
    createElement(Buttons, { currentPage, setCurrentPage, pager, setPager, initialPager }),
  ));
};

export { Pagination }