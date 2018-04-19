//client/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, Route, browserHistory, Switch } from 'react-router'
import reduxThunk from 'redux-thunk';
import { AUTH_USER, UNAUTH_USER } from './actions/constants';
import reducers from './reducers';

import TheNavbar from './components/TheNavbar'
import App from './components/App';
import Home from './components/home/Home';
import LoggedIn from './components/LoggedIn'
import Search from './components/home/Search';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const user = JSON.parse(localStorage.getItem('user'));

if (user && user.token) {
  	store.dispatch({ type: AUTH_USER });
  	console.log("Auth true")
}
else{
	console.log("Auth false")
	store.dispatch({ type: UNAUTH_USER });
}

ReactDOM.render(
	<Provider store={store}>
  		<HashRouter>
  			<div>
	  			<TheNavbar></TheNavbar>
	  			<Switch>
	  				<Route exact path='/' component={App} />
	  				<Route path="/home" component={Home} />
			      	<Route path="/search" component={Search} />
			    	<Route path="/signin" component={LoggedIn} />
			    	<Route path="/signout" component={App} />
    				<Route path="*" component={App} />
		    	</Switch>
			</div>
   		</HashRouter>
	</Provider>

   , document.getElementById('root')
);