import React from 'react';
import {Button, FieldGroup, Checkbox, Radio} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import * as actions from '../../actions/home';
import { connect } from 'react-redux';
import { reduxForm, Field, } from 'redux-form';


//All the render fields. 
const renderField = ({input, label, type, meta: {touched, error}}) => (
  <div className="form-group">
    <label>{label}</label>
    <div>
      <input className="form-control" {...input} placeholder={label} type={type} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

class AddHome extends React.Component {

  constructor(props) {
    super(props);          
    this.handleFormSubmit = this.handleFormSubmit.bind(this); 
    const getCurrent = localStorage.getItem('current');
    this.currentuser = getCurrent; 
    this.renderError = this.renderError.bind(this); 
    this.newhome = JSON.parse(localStorage.getItem('newhome'));
  }

  handleFormSubmit(props) {
    var userProps = { user : this.currentuser};
    let merge = Object.assign(props, userProps);  //Add the username to the home. 
    this.props.addHome(merge); 
    localStorage.setItem('newhome', JSON.stringify(merge) );

    const newhome = JSON.parse(localStorage.getItem('newhome'));
    window.alert("Added home: " + newhome.title);
    window.location.assign("#/mypage")
    window.location.reload();
  }

  componentDidMount() {
  }

  renderError(){
    const errors = this.props.errorMessage || [];

    if(errors.error){
      //Error message
       return <div className="alert alert-danger" role="alert">
                <strong>Oh snap!</strong> {errors.error}
              </div>  
               
    }
    else if(errors.error == null || errors.error == "" || errors.error == undefined ){
      //No error 
      return <p>{""}</p>
    }
    if(this.props.added){
        return  <div className="alert alert-success" role="alert">
                  <strong>Well done!</strong> You successfully read <a href="#" class="alert-link">this important alert message</a>.
                </div>
    }
    else{
      //Unknown error
      return <p>{""}</p>
    }
    
  }

  render() {

    const { handleSubmit, reset, pristine, submitting } = this.props;

      return(
        <div className="row">

          <div className="row addform">

            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">

             
                <h1>Lägg upp hem</h1>

                <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                  
                  <div className="row"> 

                    <p><b>Användare:</b> {this.currentuser}</p>
                   
                    <div>
                      <Field
                        label="Titel"
                        name="title"
                        component={renderField}
                        type="text"
                        placeholder="Title"
                        required />
                    </div>
                 

                    <label>Typ</label>
                    <div className="form-group" required >
                      <div className="form-check">
                        <Field className="form-check-input" component="input" type="radio" name="type" id="apartment" value="apartment" />
                        <label className="form-check-label" for="apartment">
                          {' '}Lägenhet
                        </label>
                      </div>
                      <div className="form-check">
                        <Field className="form-check-input" component="input" type="radio" name="type" id="house" value="house"/>
                        <label className="form-check-label" for="house">
                          {' '}Hus
                        </label>
                      </div>
                    </div>

                  
                    <div className="form-group" required >
                      <label>Bild</label>
                      <Field className="form-control" name="image" type="select" component="select" required >
                        <option />
                        <option value="../../img/hus1.jpg">Hus 1</option>
                        <option value="../../img/hus2.jpg">Hus 2</option>
                        <option value="../../img/hus3.jpg">Hus 3</option>
                        <option value="../../img/hus4.jpg">Hus 4</option>
                        <option value="../../img/lgh1.jpg">Lägenhet 1</option>
                        <option value="../../img/lgh2.jpg">Lägenhet 2</option>
                        <option value="../../img/lgh3.jpg">Lägenhet 3</option>
                        <option value="../../img/lgh4.jpg">Lägenhet 4</option>
                      </Field>
                    </div>
                </div>
    
                <div className="row">
                  <div className="col-md-6">
                    <Field
                      label="Storlek"
                      name="size"
                      component={renderField}
                      type="number"
                      required />
                  </div>

                  <div className="col-md-6">
                    <Field
                      label="Antal rum"
                      name="rooms"
                      component={renderField}
                      type="number"
                      required />           
                  </div>
                </div>

                <div className="row error">
                  {this.renderError()}
                </div>

                <div>
                  <Button className="buttons" type="submit" onClick={handleSubmit(this.handleFormSubmit)} bsStyle="success" bsSize="small" >Skapa annons</Button>
                  <Button className="buttons" type="button" onClick={reset} bsStyle="warning" bsSize="small" >Rensa</Button>
                </div>
              </form>
            </div>

            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">

              <div className="row row-centered">
                <img className="add_home_img col-xs-5 col-md-5" src="../../img/hus1.jpg" />
                <img className="add_home_img col-xs-5 col-md-5" src="../../img/hus2.jpg" />
                <img className="add_home_img col-xs-5 col-md-5" src="../../img/hus3.jpg" />
                <img className="add_home_img col-xs-5 col-md-5" src="../../img/hus4.jpg" />
              </div>
              <div className="row row-centered">
                <img className="add_home_img col-xs-5 col-md-5" src="../../img/lgh1.jpg" />
                <img className="add_home_img col-xs-5 col-md-5" src="../../img/lgh2.jpg" />
                <img className="add_home_img col-xs-5 col-md-5" src="../../img/lgh3.jpg" />
                <img className="add_home_img col-xs-5 col-md-5" src="../../img/lgh4.jpg" />
              </div>

            </div>

          </div>
       
        </div>
      )
   
  }
}

function validate(formProps) {
  const errors = {};
  console.log("formProps")
  console.log(formProps)

  if(!formProps.title) {
    errors.title = ' Title is required'
  }

  if(!formProps.type) {
    errors.type = ' Type is required'
  }

  if(!formProps.size) {
    errors.size = ' Size is required'
  }

  if(!formProps.rooms) {
    errors.rooms = ' Rooms is required'
  }
  
  if(!formProps.image) {
    errors.image = ' Image is required'
  }

  return errors;
}

function mapStateToProps(state) {

  return { 
    errorMessage: state.home.error,
    added: state.home.add
  };
}

AddHome = reduxForm({ form: 'addhome', validate})(AddHome);

export default connect(mapStateToProps, actions)(AddHome);

