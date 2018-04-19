import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'react-bootstrap';
import Modal from 'react-modal';
import {Link} from 'react-router-dom';
import * as actions from '../../actions/auth';
import { connect } from 'react-redux';
import { reduxForm, Field, Radio } from 'redux-form';

const renderField = ({input, label, type, meta: {touched, error}}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

class AuthModal extends React.Component {

  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    const getCurrent = localStorage.getItem('current');
    this.currentuser = getCurrent;   
    this.renderError = this.renderError.bind(this); 
    this.errorM = "";
  }
 
  handleFormSubmit(props) {
    console.log(props)

    if(this.props.type == "login"){
      this.props.signinUser(props);   
    }
    else if(this.props.type == "addUser"){
      this.props.signupUser(props);
    }
    else{
      console.log("Something went wrong")
    }
    
    //Gå till startsidan
    window.location.assign("#")
  }

  componentWillMount() {
    console.log("Auth modal")
    //To get rid of error-message
    Modal.setAppElement('body');
  }

  componentDidMount(){    
  }

  openModal() {
  }

  closeModal() {
    this.props.closeModal(); 
  }

  renderError(){
    const error = this.props.errorMessage;
    console.log(error.length)
    console.log(error)

    //if(error == "User already exists."){
    if(error.length > 3){
      //Error message
       return <div>
                <p>Error: {this.props.errorMessage} </p>
              </div>  
    }
    else if(error){
      //No error 
      return <p>{" hej "}</p>
    }
    else{
      //Unknown error
      return <p>Unknown error.</p>
    }
    
  }


  render() {

    const { handleSubmit, reset } = this.props;

    if(this.props.type == "login"){
        return (
          <div>
            <Modal
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
              {this.renderError()}
              <div className='button-center'>
                <br/>
                <Button type="button" onClick={reset} bsStyle="warning" bsSize="small" >Reset</Button>
                <Button type="submit" onClick={handleSubmit(this.handleFormSubmit)} bsStyle="success" bsSize="small" >Login</Button>
              </div>
            
            </form>
        
            </Modal>
          </div>
        )
    }
    else if(this.props.type == "addUser"){
        return (
          <div>
            <Modal
              isOpen={this.props.modal}
              onRequestClose={this.closeModal}
              contentLabel="Add user"
              className="Modal">

              <Button bsStyle="danger" bsSize="small" onClick={this.closeModal}>Close</Button>
              <br/>
              <form onSubmit={handleSubmit(this.handleFormSubmit)}>

                <h1>Create user</h1>
                <Field name="email" component={renderField} type="text" label="Email" />
                <Field name="password" component={renderField} type="text" label="Password" />
                {this.renderError()}
                <div className='button-center'>
                  <br/>
                  <Button type="button" onClick={reset} bsStyle="warning" bsSize="small" >Reset</Button>
                  <Button type="submit" onClick={handleSubmit(this.handleFormSubmit)} bsStyle="success" bsSize="small" >Create user</Button>
                </div>
              
              </form>

            </Modal>
          </div>
        )
    }
    else{
      return (<div></div>)
    }

  }
}

function validate(formProps) {
  const errors = {};
  console.log(formProps)

  if(!formProps.email) {
    errors.email = ' Email is required'
  }

  if(!formProps.password) {
    errors.password = ' Password is required'
  }

  return errors;
}

function mapStateToProps(state) {
  return { 
    errorMessage: state.auth.error, 
    modal: state.modal.modalIsOpen,
    auth: state.auth, 
    type: state.modal.type
  };
}

AuthModal = reduxForm({ form: 'login', validate})(AuthModal);

export default connect(mapStateToProps, actions)(AuthModal);
