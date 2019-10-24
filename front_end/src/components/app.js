import { createElement as el, Fragment} from 'react'
import { useEffect, useState } from 'react'
import { getArticles } from '../services/data_services'



const App = () => {
    const [articles, onArticlesRequest] = useState('')

    useEffect(() => {
        getArticles().then(data => {
            onArticlesRequest(data)
        })
    }, [])
    return el(
        'section', null,
            el('h1', null, 'Blog'),
            el(Fragment, null, articles)
    )
};

export default App;
