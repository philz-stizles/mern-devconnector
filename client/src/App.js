import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import { Provider } from 'react-redux'
import store from './store/store'
import { loadLoggedInUser } from './store/actions/authActions'
import setAuthToken from './utils/axios-util';
import Routes from './routes/Routes';

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
          <Switch>
            <Route exact path="/" component={Landing}/>
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>  
  )
};

export default App;
