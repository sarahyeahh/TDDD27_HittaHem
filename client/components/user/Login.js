import React from 'react';
import {Button} from 'react-bootstrap';
import Modal from 'react-modal';
import {Link} from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions/auth';
import { connect } from 'react-redux';
import AuthModal from './AuthModal';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);  
    this.type = "login"; 
  } 

  openModal() {
    this.props.openModal(this.type); 
  }

  closeModal() {
    this.props.closeModal(); 
  }

  componentWillMount() {
    //To get rid of error-message
    Modal.setAppElement('body');
  }


  render() {

    return (

	    <div>
        <Button bsStyle="success" bsSize="small" onClick={this.openModal}>Login</Button>
        <AuthModal></AuthModal>
      </div>

    )
  }
}

function mapStateToProps(state) {
  return { 
    modal: state.modal.modalIsOpen
  }
}

export default connect(mapStateToProps, actions)(Login);
