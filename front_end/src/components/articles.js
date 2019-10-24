import { useState, useEffect, Fragment } from 'react'
import { getArticles } from '../services/data_services'


export const Articles = () => {
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
}