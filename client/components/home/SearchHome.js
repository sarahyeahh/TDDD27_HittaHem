import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'react-bootstrap';
import Modal from 'react-modal';
import {Link} from 'react-router-dom';
import * as actions from '../../actions/home';
import { connect } from 'react-redux';
import { reduxForm, Field, Radio } from 'redux-form';
import Compare from './Compare';
import HomeModal from './HomeModal';

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
    this.type = "home";    
  }

  resetSearch(){
    window.location.reload(); 
  }

  handleFormSubmit(props) { 
    console.log("SearchHome.js ");
    console.log(props)
    this.props.searchHome(props);
  }
 
  componentWillMount() {
    this.props.closeModal(); 
  }

  componentDidMount(){
  }

//TODO
  handleChange(e){
    console.log("Change")
   // this.setState({value: event.target.value});
  }

  openModal() {
    this.props.openModal(this.type); 
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
       return <div key={home._id} className="homes col-sm-6 col-md-3">
                <img className="home_image" src={home.image} alt={home._id}/>
                <div className="image_overlay" onClick={() => this.click(home)}></div>
                <div className="stats">
                    <span className="home_title">{home.title}</span>
                    <span className="home_size">Storlek: {home.size} kvm</span>
                    <p className="home_rooms">{home.rooms} rum </p> 
                 </div>
              </div>
      })

    }
    else if(homes==""){
      console.log("None")
      return <p>Det fanns inga annonser i din sökning</p>    
    }
    
  }

  render() {

    const { handleSubmit, reset } = this.props;

    return (

	    <div className="content">

        <h1>Sök hem</h1>

        <form onSubmit={handleSubmit(this.handleFormSubmit)}>   
          
          <label>Title</label>
          <div>
            <Field name="title" onChange={this.handleChange()} component="input" type="text" placeholder="Title"/>
          </div> 
         
          <label>Type</label>
          <div>
          <Field name="type" component="input" type="radio" value="apartment" />
          {' '} Apartment {' '}
 
          <Field name="type" component="input" type="radio" value="house" />
          {' '}House{' '}
          </div>

          <label>Size</label>
          <div>
            <Field name="minsize" component="input" type="number" placeholder="Min"/>-
            <Field name="maxsize" component="input" type="number" placeholder="Max"/> kvm          
          </div>

          <label>Rooms</label>
          <div>
            <Field name="minrooms" component="input" type="number" placeholder="Min" />-
            <Field name="maxrooms" component="input" type="number" placeholder="Max" /> rooms
          </div>
          <br/>
          <br/>
          <Button type="submit" onClick={handleSubmit(this.handleFormSubmit)} bsStyle="success" bsSize="small" >Search</Button>
          <Button type="button" onClick={reset} bsStyle="warning" bsSize="small" >Reset</Button>
          <Button type="button" onClick={this.resetSearch} bsStyle="danger" bsSize="small" >Reset search</Button>  

        </form>
  
        <div>
          {this.renderHomes()}
        </div>

        <Compare></Compare>
        <HomeModal></HomeModal>

      </div>
    )
  }
}


const validate = props => {
 /* const errors = {};
  const fields = ['title', 'type', 'size', 'rooms'];

  fields.forEach((f) => {
    if(!(f in props)) {
      errors[f] = `${f} is required`;
    }
  });

  return errors;*/
};


function mapStateToProps(state) {
  return { 
    homes: state.home.list,
    modal: state.modal.modalIsOpen
  };
}

SearchHome = reduxForm({ form: 'search', validate})(SearchHome);

export default connect(mapStateToProps, actions)(SearchHome);