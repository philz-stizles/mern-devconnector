import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from './../pages/Login'
import Register from './../pages/Register'
import Alert from './../components/Alert';
import Dashboard from './../pages/Dashboard';
import PrivateRoute from './PrivateRoute';
import CreateProfile from './../pages/CreateProfile';
import NotFound from './../pages/NotFound';

const Routes = () => {
    return (
        <section className="container">
            <Alert />
            <Switch>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/login" component={Login}/>
                <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                <PrivateRoute exact path="/create-profile" component={CreateProfile}/>
                <Route component={NotFound}/>
            </Switch>
        </section>
    )
}

export default Routes
