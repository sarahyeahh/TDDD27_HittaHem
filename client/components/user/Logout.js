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
    window.location.assign("#")
    //window.location.reload();
  }

  render() {
    return <Button bsStyle="success" bsSize="small" href="#/loggedin" onClick={this.handleClick}>Logga ut</Button> 
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