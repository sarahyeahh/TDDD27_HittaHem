import React from 'react';
import {Button} from 'react-bootstrap';
import Modal from 'react-modal';
import {Link} from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions/auth';
import { connect } from 'react-redux';
import AuthModal from './AuthModal';

/*
const renderField = ({input, label, type, meta: {touched, error}}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)*/

class Login extends React.Component {

  constructor(props) {
    super(props);
    //this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);  
    this.type = "login"; 
  } 

 /* handleFormSubmit(props) {
    console.log("Handle form submit");
    console.log(props)
    this.props.signinUser(props);
    console.log("Sign in user");
    //Gå till startsidan
    window.location.assign("#")
  }*/

  openModal() {
    console.log("OPEN LOGIN MODAL")
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

    //const { handleSubmit } = this.props;

    return (

	    <div>
        <Button bsStyle="success" bsSize="small" onClick={this.openModal}>Login</Button>
        <AuthModal></AuthModal>
      </div>

    )}
  }

/*function validate(formProps) {
  const errors = {};

  console.log(formProps)

  if(!formProps.email) {
    errors.email = ' Email is required'
  }

  if(!formProps.password) {
    errors.password = ' Password is required'
  }

  return errors;
}*/

function mapStateToProps(state) {
 // console.log(state)
  return { 
    //errorMessage: state.auth.error, 
    modal: state.modal.modalIsOpen
  }
}

//Login = reduxForm({ form: 'signin', validate })(Login);

export default connect(mapStateToProps, actions)(Login);


/*   <Modal
        isOpen={this.props.modal}
        onRequestClose={this.closeModal}
        contentLabel="Login"
        className="Modal">

          <Button bsStyle="danger" bsSize="small" onClick={this.closeModal}>Close</Button>
          <br/>
          <form onSubmit={handleSubmit(this.handleFormSubmit)}>

            <h1>Log in</h1>            
            <Field name="email" component={renderField} type="text" label="Email" />
            <Field name="password" component={renderField} type="text" label="Password" />
            
            <div className='button-center'>
              <br/>
              <Button type="submit" onClick={handleSubmit(this.handleFormSubmit)} bsStyle="success" bsSize="small" >Login</Button>
            </div>
          
          </form>
        
        </Modal>*/