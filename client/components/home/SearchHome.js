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
  }

  resetSearch(){
    window.location.reload(); 
  }

  handleFormSubmit(props) { 
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
       return <div key={home._id} className="homes col-sm-6 col-md-3">
                <img className="home_image" src={home.image} alt={home._id}/>
                <div className="image_overlay" onClick={() => this.click(home)}></div>
                <p className="user_modal">{home.user}</p>
                <div className="stats">
                    <span className="home_title">{home.title}</span>  <br/>
                    <span className="home_size"> <b>Storlek:</b> {home.size} kvm </span> {" "}
                    <span className="home_rooms"><b>Antal rum:</b> {home.rooms} rum </span> 
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

	    <div className="content">

        <h1>Sök hem</h1>

        <form onSubmit={handleSubmit(this.handleFormSubmit)}>   
                  
          <label>Typ</label>
          <div>
          <Field name="type" component="input" type="radio" value="apartment" />
          {' '} Lägenhet {' '}
 
          <Field name="type" component="input" type="radio" value="house" />
          {' '}Hus{' '}
          </div>

          <label>Storlek</label>
          <div>
            <Field className="input" name="minsize" component="input" type="number" placeholder="Min"/>-
            <Field className="input" name="maxsize" component="input" type="number" placeholder="Max"/> kvm          
          </div>
 
          <label>Antal rum</label>
          <div>
            <Field className="input" name="minrooms" component="input" type="number" placeholder="Min" />-
            <Field className="input" name="maxrooms" component="input" type="number" placeholder="Max" /> rum
          </div>
          <br/>
          <br/>
          <Button className="buttons" type="submit" onClick={handleSubmit(this.handleFormSubmit)} bsStyle="success" bsSize="small" >Search</Button>
          <Button className="buttons" type="button" onClick={reset} bsStyle="warning" bsSize="small" >Reset</Button>
          <Button className="buttons" type="button" onClick={this.resetSearch} bsStyle="danger" bsSize="small" >Reset search</Button>  

        </form>
  
        <div className="row homes">
          {this.renderHomes()}
        </div>

        <Compare></Compare>
        <HomeModal></HomeModal>

      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log("state.home.error")
  console.log(state.home.error)
  return { 
    homes: state.home.list,
    modal: state.modal.modalIsOpen,
    errorMessage: state.home.error 
  };
}

SearchHome = reduxForm({ form: 'search'})(SearchHome);

export default connect(mapStateToProps, actions)(SearchHome);

/*

    <label>Titel</label>
          <div>
            <Field name="title" onChange={this.handleChange()} component="input" type="text" placeholder="Title"/>
          </div> */