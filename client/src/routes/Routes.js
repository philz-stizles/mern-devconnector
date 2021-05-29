import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from './../pages/Login'
import Register from './../pages/Register'
import Alert from './../components/Alert';
import Dashboard from '../pages/dashboard/Dashboard';
import PrivateRoute from './PrivateRoute';
import CreateProfile from '../pages/dashboard/CreateProfile';
import NotFound from './../pages/NotFound';
import Posts from '../pages/Posts';
import EditProfile from '../pages/dashboard/EditProfile';
import AddExperience from '../pages/dashboard/AddExperience';
import AddEducation from '../pages/dashboard/AddEducation';
import Profiles from '../pages/Profiles';
import Profile from '../pages/Profile';

const Routes = () => {
    return (
        <section className="container">
            <Alert />
            <Switch>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/profiles" component={Profiles}/>
                <Route exact path="/profile/:id" component={Profile}/>
                <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                <PrivateRoute exact path="/create-profile" component={CreateProfile}/>
                <PrivateRoute exact path="/edit-profile" component={EditProfile}/>
                <PrivateRoute exact path="/add-education" component={AddEducation}/>
                <PrivateRoute exact path="/add-experience" component={AddExperience}/>
                <PrivateRoute exact path="/posts" component={Posts}/>
                <Route component={NotFound}/>
            </Switch>
        </section>
    )
}

export default Routes
