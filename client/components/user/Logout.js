import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/auth';
import {form, FormGroup, Button} from 'react-bootstrap';

class Logout extends React.Component {
	
 constructor(props) {
    super(props);
 	  this.handleClick = this.handleClick.bind(this);
  }	

  componentWillMount() {
    
  }

  handleClick(){
  	this.props.signoutUser();
   
    console.log("Logout click ");
   // window.location.reload(); 
    window.location.assign("#")
    this.props.closeModal(); 
  }

  render() {
    return <Button bsStyle="success" bsSize="small" href="#/home" onClick={this.handleClick}>Log out</Button> 
  }
}

function mapStateToProps(state) {

  return { 
    errorMessage: state.auth.error, 
    modal: state.modal.modalIsOpen,
    auth: state.auth, 
    type: state.modal.type
  };
}

export default connect(null, actions)(Logout);