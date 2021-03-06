import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import * as actions from '../actions/home';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button, handleSelected } from 'react-bootstrap';
import Login from './user/Login';
import AddUser from './user/AddUser';
import Logout from './user/Logout';
import AdminPage from './admin/AdminPage';

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

		console.log("User is logged in: " + this.props.authenticated)

		if(this.currentuser== "admin" || this.props.admin == true){

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
			    		<NavItem href="#/mypage">
				        	Mina sidor
				      	</NavItem>
			      		<NavItem href="#/search">
			        		Sök hem
			      		</NavItem>
			      		<NavItem href="#/addhome">
			        		Lägg upp hem
			      		</NavItem>
			      		<NavItem href="#/admin">
			        		ADMIN
			      		</NavItem>
			      	</Nav>
					<Nav pullRight>
						<NavItem href="#/loggedin">
	  						Inloggad som: {this.currentuser}
						</NavItem>
			      		<NavItem >
			        		<Logout></Logout>
			      		</NavItem>
			      	</Nav>	   
			  	</Navbar.Collapse>
			</Navbar>
			)
		}
		else if(this.props.authenticated){

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
			    		<NavItem href="#/mypage">
				        	Mina sidor
				      	</NavItem>
			      		<NavItem href="#/search">
			        		Sök hem
			      		</NavItem>
			      		<NavItem href="#/addhome">
			        		Lägg upp hem
			      		</NavItem>	
			      	</Nav>
					<Nav pullRight>
						<NavItem href="#/mypage">
	  						Inloggad som: {this.currentuser}
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
    	authenticated: state.auth.authenticated,
    	admin: state.auth.admin
	};
}

export default connect(mapStateToProps, actions)(TheNavbar);
