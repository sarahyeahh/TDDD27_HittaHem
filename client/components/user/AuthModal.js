import React from 'react';
import {Button} from 'react-bootstrap';
import Modal from 'react-modal';
import {Link} from 'react-router-dom';
import * as actions from '../../actions/auth';
import { connect } from 'react-redux';
import { reduxForm, Field, Radio } from 'redux-form';

const renderField = ({input, label, type, meta: {touched, error}}) => (
  <div className="form-group">
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
  }
 
  handleFormSubmit(props) {
    if(this.props.type == "login"){
      this.props.signinUser(props);   
    }
    else if(this.props.type == "addUser"){
      this.props.signupUser(props);    
    }
    else{
      console.log("Something went wrong")
    }
    
    console.log("After the IF-statements")
    //Gå till start
    this.closeModal();
    window.location.assign("#")
    //window.location.reload();
  }

  componentWillMount() {
    //To get rid of error-message
    Modal.setAppElement('body');
  }

  componentDidMount(){    
  }

  openModal() {
  }

  closeModal() {
     console.log("Close modal")
    this.props.closeModal(); 
  }

  renderError(){
    const error = this.props.errorMessage;

    if(error.length > 3){
      //Error message
       return <div>
                <p>Error: {this.props.errorMessage} </p>
              </div>  
    }
    else if(error){
      //No error 
      return <p>{"  "}</p>
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

            <Button className="closebtn" bsStyle="danger" bsSize="small" onClick={this.closeModal}>Stäng</Button>
            <br/>
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>

              <h1>Logga in</h1>            
              <Field name="email" component={renderField} type="text" label="Email" required />
              <Field name="password" component={renderField} type="text" label="Password" required />
              {this.renderError()}
              <div className='button-right'>
                <br/>
                <Button className="buttons" type="button" onClick={reset} bsStyle="warning" bsSize="small" >Reset</Button>
                <Button className="buttons" type="submit" onClick={handleSubmit(this.handleFormSubmit)} bsStyle="success" bsSize="small" >Log in</Button>
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

              <Button className="closebtn" bsStyle="danger" bsSize="small" onClick={this.closeModal}>Stäng</Button>
              <br/>
              <form onSubmit={handleSubmit(this.handleFormSubmit)}>

                <h1>Skapa ny användare</h1>
                <Field name="email" component={renderField} type="text" label="Email" required />
                <Field name="password" component={renderField} type="text" label="Password" required />
                {this.renderError()}
                <div className='button-right'>
                  <br/>
                  <Button className="buttons" type="button" onClick={reset} bsStyle="warning" bsSize="small" >Reset</Button>
                  <Button className="buttons" type="submit" onClick={handleSubmit(this.handleFormSubmit)} bsStyle="success" bsSize="small" >Create user</Button>
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
  console.log(state.auth )
  return { 
    errorMessage: state.auth.error, 
    modal: state.modal.modalIsOpen,
    auth: state.auth.authenticated, 
    type: state.modal.type
  };
}

AuthModal = reduxForm({ form: 'login', validate})(AuthModal);

export default connect(mapStateToProps, actions)(AuthModal);
