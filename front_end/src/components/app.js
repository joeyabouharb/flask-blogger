import { createElement as el, Fragment} from 'react'
import {routes} from '../services/routes'


const App = () => {
    return el(
        Fragment, null,
        header,
        routes,
        footer
        )
};

export default App;
