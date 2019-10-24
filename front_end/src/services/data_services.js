/*
* data services
*/
import { createElement as el} from 'react'
export const getArticles = () => {
    return fetch(
        "http://127.0.0.1:5000/blog"
    ).then((res) => res.json()
    ).then(data => {
        return data.map((article, index) => {
            return el('article', {key: index},
                    el('h2', null, article.title),
                    el('p', null, article.content)
            );
        });
    });

};

