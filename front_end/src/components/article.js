import { createElement } from 'react';
import { element } from 'prop-types';

const Article = ({content, post_id}) => {
  const { childNodes } = document.createRange()
    .createContextualFragment(content);
  const elements = [...childNodes]
    .filter((element) => element instanceof HTMLElement)
    .map((element, key) => createElement(
        element.tagName.toLowerCase(), {
        key: `${key}-${element.tagName}`,
        className: element.classList
      }, element.textContent
      )
    )

  return createElement(
    'section', {
      key: post_id, className: "section"
    }, elements
  )
}

export default Article;
