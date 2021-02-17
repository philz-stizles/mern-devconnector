import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import { Provider } from 'react-redux'
import store from './store/store'
import Alert from './components/Alert';
import { loadLoggedInUser } from './store/actions/authActions'
import setAuthToken from './utils/axios-util';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './routes/PrivateRoute';

const token = localStorage.getItem('token');
if(token) {
  setAuthToken(token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadLoggedInUser());
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing}/>
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register}/>
              <Route exact path="/login" component={Login}/>
              <PrivateRoute exact path="/dashboard" component={Dashboard}/>
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>  
  )
};

export default App;
