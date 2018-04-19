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
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.type = "addUser"; 
  }

  handleFormSubmit(props) {
    console.log("Handle form submit");
    console.log(props)
    this.props.signupUser(props);
    console.log("Sign up user");
    //Gå till startsidan
    window.location.assign("#")
  }

  openModal() {
    console.log("OPEN ADD MODAL")
    console.log(this.type)
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
          <Button bsStyle="primary" bsSize="small" onClick={this.openModal}>Create User</Button>
          <AuthModal></AuthModal>
        </div>
    )
  }
}

const validate = props => {
  const errors = {};
  const fields = ['email', 'password'];

  fields.forEach((f) => {
    if(!(f in props)) {
      errors[f] = `${f} is required`;
    }
  });

  return errors;
};


function mapStateToProps(state) {
  //console.log(state.modal)
  return { 
    errorMessage: state.auth.error, 
    modal: state.modal.modalIsOpen 
  };
}

AddUser = reduxForm({ form: 'signup', validate })(AddUser);

export default connect(mapStateToProps, actions)(AddUser);