import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import Modal from 'react-modal';
import {form, FormGroup, Button} from 'react-bootstrap';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions/home';
import HomeModal from '../home/HomeModal';

const renderField = ({input, label, type, value, meta: {touched, error}}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} value={value} placeholder={value} type={type} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

class LoggedIn extends React.Component {

	constructor(props) {
    super(props);    
    this.getData = this.getData.bind(this);
    this.click= this.click.bind(this); 
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.renderHomes = this.renderHomes.bind(this)
	}

  openModal() {
    this.props.openModal(); 
  }

  closeModal() {
    this.props.closeModal(); 
  }

	componentWillMount() {
    this.props.closeModal(); 
    //To get rid of error-message
    Modal.setAppElement('body');

  	const getCurrent = localStorage.getItem('current');
  	this.currentuser = getCurrent; 
    this.getData();
	}

	//The best place to put calls to fetch data
	componentDidMount(){
  }

	getData(){
		//Skickar med currentuser, den som är inloggad, för att hitta hem som är kopplade till användaren. 
    var userProps = JSON.stringify({ user : this.currentuser });
    this.props.getHomepage(userProps);
	}

  click(home){
    localStorage.setItem('currenthome', JSON.stringify(home._id) );
    localStorage.setItem('statshome', JSON.stringify(home) );

    //Open modal
    this.openModal();    
  }

  renderHomes(){

    const homes = this.props.homes || [];

    if(this.props.homes){
      return homes.map((home) => {
        return <div key={home._id} className="homes col-centered col-xs-12 col-sm-12 col-md-6 col-lg-6">
              <img className="home_image" src={home.image} alt={home._id}/>
              <div className="image_overlay" onClick={() => this.click(home)}></div>
              <div className="row stats">
                  <div className="home_title col-md-12">{home.title}</div>
                  <div className="row">
                    <span className="home_size"><b>Storlek:</b> {home.size} kvm </span> {" "}
                    <span className="home_rooms"><b>Antal rum:</b> {home.rooms} rum </span> 
                  </div>
               </div>
            </div>
      })
    }
    else {
      return( <div>Du har tyvärr inga annonser. Skapa en <a href="#/addhome">här</a>.</div>)    
    }


  }

	render() {

    const { handleSubmit, reset } = this.props;

	    return (

          <div className="row">
  		      <div className="row loggedin">
    		    	<h1>Mina sidor</h1>   
    			    <h3><b>Användarnamn: </b>{this.currentuser}</h3>
            </div>

            <div className="row">                      
              <h4><b>Mina egna annonser:</b></h4>  
              <ul>
                { this.renderHomes() }
              </ul>
            </div>

            <div className="row">
              <Button bsStyle="success" bsSize="small" href="#/addhome">Lägg till hem</Button>
            </div>

            <HomeModal></HomeModal>

          </div>
	    )
	}
}

function mapStateToProps(state) {
  return { 
    homes: state.homepage.list,
    modal: state.modal.modalIsOpen
  };
}

LoggedIn = reduxForm({ form: 'update'})(LoggedIn);

export default connect(mapStateToProps, actions)(LoggedIn);
