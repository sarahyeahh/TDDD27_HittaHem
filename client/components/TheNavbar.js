//client/components/App.js
import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

//Components
import Login from './user/Login';
import AddUser from './user/AddUser';
import Logout from './user/Logout';
import * as actions from '../actions/home';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button, handleSelected } from 'react-bootstrap';

class TheNavbar extends React.Component {

  	constructor(props) {
		super(props); 
	    const getCurrent = localStorage.getItem('current');
    	this.currentuser = getCurrent;	
  	} 

	componentWillMount() {
    	const getCurrent = localStorage.getItem('current');
    	this.currentuser = getCurrent;
  	}

	componentDidMount(){
		const getCurrent = localStorage.getItem('current');
    	this.currentuser = getCurrent;
  	}

	render() {

		console.log("Inloggad: " + this.props.authenticated)

		if(this.props.authenticated){

			return(
			<Navbar inverse collapseOnSelect>

			  	<Navbar.Header>
				    <Navbar.Brand>
				    	<a href="#">HittaHem</a>
				    </Navbar.Brand>
			    	<Navbar.Toggle />
			  	</Navbar.Header>

			 	<Navbar.Collapse>
				 	<Nav>
			    		<NavItem href="#/signin">
				        	Mina sidor
				      	</NavItem>
			      		<NavItem href="#/search">
			        		Sök hem
			      		</NavItem>
			      		<NavItem href="#/home">
			        		Lägg upp hem
			      		</NavItem>
			      	</Nav>
					<Nav pullRight>
			    		<NavItem>
	  						Signed in as: <a href="#/signin">{this.currentuser}</a>
						</NavItem>
			      		<NavItem >
			        		<Logout></Logout>
			      		</NavItem>
			      	</Nav>	   
			  	</Navbar.Collapse>
			</Navbar>
			)
		}

		else{

  return (

  			<Navbar inverse collapseOnSelect>

			  	<Navbar.Header>
				    <Navbar.Brand>
				    	<a href="#">HittaHem</a>
				    </Navbar.Brand>
			    	<Navbar.Toggle />
			  	</Navbar.Header>

			 	<Navbar.Collapse>
			    	<Nav>
			      		<NavItem href="#/search">
			        		Sök hem
			      		</NavItem>
			    	</Nav>
			    
			    	<Nav pullRight>
			      		<NavItem>
			        		<Login></Login>
			      		</NavItem>
			     
			      		<NavItem>
			        		<AddUser></AddUser>
			      		</NavItem>			      			     	
			    	</Nav>
			  	</Navbar.Collapse>
			</Navbar>
	  
	    )

		}

	  
	}
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps, actions)(TheNavbar);
