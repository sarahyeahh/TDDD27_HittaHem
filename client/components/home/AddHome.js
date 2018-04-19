import React from 'react';
import {Button, FieldGroup, Checkbox, Radio} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import * as actions from '../../actions/home';
import { connect } from 'react-redux';
import { reduxForm, Field, } from 'redux-form';


//All the render fields. 
const renderField = ({input, label, type, meta: {touched, error}}) => (
  <div className={label}>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

class AddHome extends React.Component {

  constructor(props) {
    super(props);          
    this.handleFormSubmit = this.handleFormSubmit.bind(this); 
    this.handleChange = this.handleChange.bind(this);
    const getCurrent = localStorage.getItem('current');
    this.currentuser = getCurrent; 
  }

  handleFormSubmit(props) {
    console.log(props)

    var userProps = { user : this.currentuser};
    console.log("USER PROPS")
    console.log(userProps)

    let merge = Object.assign(props, userProps);  

    this.props.addHome(merge);
    console.log("AddHome.js ");
    //Uppdatera sidan
    window.location.reload(); 
  }

  handleChange(event){
    console.log("Change")
   // this.setState({value: event.target.value});
    console.log(event)
  }

  componentDidMount() {
  }

  render() {

    const { handleSubmit, reset, pristine, submitting } = this.props;

      return(
        <div className="content">

          <h1>Lägg upp hem</h1>

          <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                    
            <p><b>User:</b> {this.currentuser}</p>
           
            <div>
              <label>Title</label>
              <div>
                <Field
                  name="title"
                  component="input"
                  type="text"
                  placeholder="Title"
                />
              </div>
            </div>
           
            <div>
              <label>Type</label>
              <div>
               
                  <Field
                    name="type"
                    component="input"
                    type="radio"
                    value="apartment"
                  />{' '}
                  Apartment
               
                  <Field
                    name="type"
                    component="input"
                    type="radio"
                    value="house"
                  />{' '}
                  House
               
              </div>
            </div>
            <div>
              <label>Image</label>
              <div>
                <Field name="image" component="select">
                  <option />
                  <option value="../../img/hus1.jpg">Hus 1</option>
                  <option value="../../img/hus2.jpg">Hus 2</option>
                  <option value="../../img/hus3.jpg">Hus 3</option>
                  <option value="../../img/lgh1.jpg">Lägenhet 1</option>
                  <option value="../../img/lgh2.jpg">Lägenhet 2</option>
                  <option value="../../img/lgh3.jpg">Lägenhet 3</option>
                </Field>
              </div>
            </div>

            <div>
              <label>Size</label>
              <div>
                <Field
                  name="size"
                  component="input"
                  type="number"
                  placeholder="Size"
                />
              </div>
            </div>

            <div>
              <label>Rooms</label>
              <div>
                <Field
                  name="rooms"
                  component="input"
                  type="number"
                  placeholder="Rooms"
                />
              </div>
            </div>
            <br/>
            <div>
              <Button type="submit" onClick={handleSubmit(this.handleFormSubmit)} bsStyle="success" bsSize="small" >Create home</Button>
              <Button type="button" onClick={reset} bsStyle="warning" bsSize="small" >Reset</Button>
            </div>
          </form>
        </div>
      )
   
  }
}

const validate = props => {
  const errors = {};
  const fields = ['title', 'type', 'image', 'size', 'rooms'];

  fields.forEach((f) => {
    if(!(f in props)) {
      errors[f] = `${f} is required`;
    }
  });

  return errors;
};


function mapStateToProps(state) {
  return { searchhomes: state.home.list };
}

AddHome = reduxForm({ form: 'addhome', validate})(AddHome);

export default connect(mapStateToProps, actions)(AddHome);
