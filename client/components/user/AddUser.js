import React from 'react';
import {Button} from 'react-bootstrap';
import Modal from 'react-modal';
import {Link} from 'react-router-dom';
import * as actions from '../../actions/auth';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import AuthModal from './AuthModal';

const renderField = ({input, label, type, meta: {touched, error}}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

class AddUser extends React.Component {

  constructor(props) {
    super(props);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.type = "addUser"; 
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

    const { handleSubmit } = this.props;

    return (
		    <div>
          <Button bsStyle="primary" bsSize="small" onClick={this.openModal}>Skapa konto</Button>
          <AuthModal></AuthModal>
        </div>
    )
  }
}

function mapStateToProps(state) {
  return { 
    errorMessage: state.auth.error, 
    modal: state.modal.modalIsOpen 
  };
}

export default connect(mapStateToProps, actions)(AddUser);