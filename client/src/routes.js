import React from "react"
import { Switch, Route, Redirect } from 'react-router-dom'
import { AuthPage } from "./components/AuthPage"
import {Home} from "./components/Home"

// import './auth.css'

 

export const Routes = isAuthenticated =>{
     if(isAuthenticated){
        return(
            <Switch>
                <Route path="/home" exact>
                    <Home/>
                </Route>
            </Switch>
        )
     }
     return(
         <Switch>
             <Route path ="/" exact>
                 <AuthPage/>
             </Route> 
             <Redirect to ="/"/>
         </Switch>
     )
}