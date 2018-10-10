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

import App from './components/App';
import TheNavbar from './components/TheNavbar'
import Home from './components/home/Home';
//import LoggedIn from './components/user/LoggedIn'
import MyPage from './components/user/MyPage'
import Search from './components/home/Search';
import AdminPage from './components/admin/AdminPage';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const user = JSON.parse(localStorage.getItem('user'));

if (user && user.token) {
  	store.dispatch({ type: AUTH_USER });
}
else{
	store.dispatch({ type: UNAUTH_USER });
}

ReactDOM.render(
	<Provider store={store}>
  		<HashRouter>
  			<div>
	  			<TheNavbar></TheNavbar>
	  			<Switch>
	  				<Route exact path='/' component={App} />
	  				<Route path="/addhome" component={Home} />
			      	<Route path="/search" component={Search} />
			    	<Route path="/mypage" component={MyPage} />
			    	<Route path="/admin" component={AdminPage} />
			    	<Route path="/signout" component={App} />
    				<Route path="*" component={App} />
		    	</Switch>
			</div>
   		</HashRouter>
	</Provider>

   , document.getElementById('root')
);