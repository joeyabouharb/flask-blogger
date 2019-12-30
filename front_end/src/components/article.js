import { createElement } from 'react';

const Article = ({content, post_id}) => {
  const parser = new DOMParser()
  const [ parsedHTML ] = parser.parseFromString(content, 'text/html').childNodes
  const [ , body ] = parsedHTML.childNodes
  const { childNodes } = body;
  const elements = Object.values(childNodes)
    .filter((element) => element instanceof HTMLElement)
    .map((element, key) => createElement(
        element.tagName.toLowerCase(), {
        key: `${key}-${element.tagName}`,
        className: element.classList
      }, element.textContent
      )
    )
  return createElement('section', { key: post_id, className: "section" }, ...elements)
}

export default Article;
