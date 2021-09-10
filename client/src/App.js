import React from 'react'
import { useSelector} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'
import {Routes} from './routes'
import {Home} from './components/Home'


function App() {
    const isAuth = useSelector(state => state.users.isAuthenticated)
    const routes = Routes(isAuth)
     return (
         <Router>
            {isAuth && <Home/>}
            <div className = "container-fluid">
                {routes}
            </div>
         </Router>
     )
}

export default App