import React from 'react';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import * as actions from '../../actions/home';
import { connect } from 'react-redux';
import { reduxForm, Field, Radio } from 'redux-form';
import Compare from './Compare';
import HomeModal from './HomeModal';

//All the render fields. 
const renderField = ({input, label, placeholder, type, meta: {touched, error}}) => (
  <div className="form-group">
    <label>{label}</label>
    <div>
      <input className="form-control" {...input} placeholder={placeholder} type={type} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

class SearchHome extends React.Component {

  constructor(props) {
    super(props);  
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.renderHomes = this.renderHomes.bind(this)
    this.resetSearch = this.resetSearch.bind(this)
    this.handleChange = this.handleChange.bind(this)
    const getCurrent = localStorage.getItem('current');
    this.currentuser = getCurrent; 
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);  
  }

  resetSearch(){
    window.location.reload(); 
  }

  handleFormSubmit(props) { 
    console.log("PROPS: ")
    console.log(props)
    this.props.searchHome(props);
  }
 
  componentWillMount() {
    this.props.closeModal(); 
  }

  componentDidMount(){
  }


  handleChange(e){
  }

  openModal() {
    this.props.openModal(); 
  }

  closeModal() {
    this.props.closeModal(); 
  }

  click(home){
    localStorage.setItem('currenthome', JSON.stringify(home._id) );
    localStorage.setItem('statshome', JSON.stringify(home) );
    console.log(localStorage)
    //Open modal
    this.props.openModal();    
  }

  renderHomes(){
    const homes = this.props.homes || [];
    console.log(homes)

    if(homes){

      return homes.map((home) => { 
       return <div key={home._id} className="homes col-centered col-md-4" onClick={() => this.click(home)}>
                <img className="home_image" src={home.image} alt={home._id}/>
                <div className="image_overlay" ></div>
                <p className="user_modal">{home.user}</p>
                <div className="row stats">
                    <span className="home_title col-md-12">{home.title}</span>
                    <div className="row">
                      <span className="home_size col-sm-6 col-md-12"> <b>Storlek:</b> {home.size} kvm </span> {" "}
                      <span className="home_rooms col-sm-6 col-md-12"><b>Antal rum:</b> {home.rooms} rum </span> 
                    </div>
                </div>

              </div>
      })

    }
    else if(this.props.homes==""){
      console.log("None")
      return <p>Det fanns inga annonser i din sökning</p>    
    }
    
  }

  render() {

    const { handleSubmit, reset } = this.props;

    return (

      <div className="row">

        <div className="row searchform">
          <h1>Sök hem</h1>

          <form onSubmit={handleSubmit(this.handleFormSubmit)}>   
     
            <div className="row">
              <div className="col-md-4">
               <label>Typ</label>
                <div className="form-group" >
                      <div className="form-check">
                        <Field className="form-check-input" label="HEJ" component="input" type="radio" name="type" id="apartment" value="apartment" />
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


              </div>

              <div className="col-md-4">
                <label>Storlek (kvm)</label>
                <div className="col-md-6 small-field">
                  <Field className="input" name="minsize" component={renderField} type="number" placeholder="Min"/>
                </div>
                <div className="col-md-6 small-field">  
                  <Field className="input" name="maxsize" component={renderField} type="number" placeholder="Max"/>       
                </div>
              </div>   
         
              <div className="col-md-4">
                <label>Antal rum</label>
                <div className="col-md-6 small-field">
                  <Field className="input" name="minrooms" component={renderField} type="number" placeholder="Min" />
                </div>  
                <div className="col-md-6 small-field">
                  <Field className="input" name="maxrooms" component={renderField} type="number" placeholder="Max" />
                </div>
              </div>
            </div>

            <div className="row">
              <Button className="buttons" type="submit" onClick={handleSubmit(this.handleFormSubmit)} bsStyle="success" bsSize="small" >Sök</Button>
              <Button className="buttons" type="button" onClick={reset} bsStyle="warning" bsSize="small" >Rensa</Button>
              <Button className="buttons" type="button" onClick={this.resetSearch} bsStyle="danger" bsSize="small" >Rensa sökning</Button>  
            </div>
          </form>

        </div>

        <div className="row results row-centered">
          {this.renderHomes()}
        </div>

        <div className="row">
          <Compare></Compare>
        </div>
        
        <HomeModal></HomeModal>

      </div>

    )
  }
}

function mapStateToProps(state) {
  return { 
    homes: state.home.list,
    modal: state.modal.modalIsOpen,
    errorMessage: state.home.error 
  };
}

SearchHome = reduxForm({ form: 'search'})(SearchHome);

export default connect(mapStateToProps, actions)(SearchHome);
