import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'react-bootstrap';
import Modal from 'react-modal';
import {Link} from 'react-router-dom';
import * as actions from '../../actions/home';
import { connect } from 'react-redux';
import { reduxForm, Field, Radio } from 'redux-form';

const renderField = ({input, label, type, placeholder,value, meta: {touched, error}}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} value={value} placeholder={placeholder} type={type} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

class HomeModal extends React.Component {

  constructor(props) {
    super(props);
    this.theHome = {}
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.setData = this.setData.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    const getCurrent = localStorage.getItem('current');
    this.currentuser = getCurrent;   
    this.renderModal = this.renderModal.bind(this); 
    this.deleteHome = this.deleteHome.bind(this); 
    this.buyHome = this.buyHome.bind(this); 
  }

  handleFormSubmit(props) {
    var idProps = {_id : this.theHome._id};
    let merge = Object.assign(props, idProps);  
    this.props.updateHome(merge);
    window.location.reload(); 
  }

  componentWillMount() {
    //To get rid of error-message
    Modal.setAppElement('body');
  }

  componentDidMount(){
  }

  deleteHome(){
    console.log("Delete")
    var id = JSON.stringify({ _id : this.theHome._id });
    this.props.deleteTheHome(id);
    //Finally close modal
    this.closeModal();
    window.location.reload(); 
    window.alert("Deletet home " + this.theHome.title)
  }

  buyHome(){
    console.log("Buy")
    window.alert("Bough the home " + this.theHome.title)
  }

  openModal() {
    //this.props.openModal(); 
  }

  closeModal() {
    this.props.closeModal(); 
  }

  setData(){
    localStorage.setItem('currenthome', JSON.stringify(home._id) );
    this.theHome = homes; 
  }

  renderModal(){
    //Hämta det i-klickade hemmet från Localstorage
    const home = JSON.parse(localStorage.getItem('statshome'));
    this.theHome = home; 
 
    if(home){

      const { handleSubmit, reset } = this.props;
 
      //If the home belongs to the logged in user the home can be modified. 
      if(this.currentuser == home.user){
        return <Modal
                  isOpen={this.props.modal}
                  onRequestClose={this.closeModal}
                  contentLabel="Edit"
                  className="Modal">

              <Button className="closebtn" bsStyle="danger" bsSize="small" onClick={this.closeModal}>Close</Button>
              <br/>
              <form onSubmit={handleSubmit(this.handleFormSubmit)}>

                <h1>Edit home</h1>
                <img className="home_image" src={home.image} alt={home.user}/>
          
                <div>
                  <label>Title</label>
                  <div>
                    <Field name="title" component="input" type="text" placeholder={home.title} value={home.title} />
                  </div>
                </div>
                      
                <div>
                  <label>Size</label>
                  <div>
                    <Field name="size" component="input" value={home.size} placeholder={home.size} type="number"/>
                  </div>
                </div>

                <div>
                  <label>Rooms</label>
                  <div>
                    <Field name="rooms"  component="input" value={home.rooms} placeholder={home.rooms} type="number"/>
                  </div>
                </div>
                        
                <div className='button-right'>
                  <br/>
                  <Button className="buttons" type="submit" onClick={handleSubmit(this.handleFormSubmit)} bsStyle="success" bsSize="small" >Update</Button>
                  <Button className="buttons" bsStyle="danger" bsSize="small" onClick={this.deleteHome}>Delete</Button>
                </div>
                
              </form>
            
            </Modal>
      }
      else{

        return <Modal
              isOpen={this.props.modal}
              onRequestClose={this.closeModal}
              contentLabel="View"
              className="Modal">

              <Button className="closebtn" bsStyle="danger" bsSize="small" onClick={this.closeModal}>Close</Button>
              <br/>
              <h1>{home.title}</h1>
              <img className="home_image" src={home.image} alt={home._id}/>
              <div>
                <p> <b>User:</b> {home.user}  </p>
                <p> <b>Size:</b> {home.size} </p>
                <p> <b>Rooms:</b> {home.rooms} </p>    
              </div>                  
              <div className='button-right'>
                <br/>
                <Button type="submit" bsStyle="success" bsSize="small" onClick={this.buyHome}>Köp</Button>
              </div>
            
            </Modal>
      }

    }
    else{
      console.log("Do nothing")
    }
  }


  render() {

    if(this.props.homes || this.props.homepage){
        return (
          <div>
            {this.renderModal()}
          </div>
        )
    }
    else{
      return (<div></div>)
    }

  }
}

function mapStateToProps(state) {
  return { 
    homepage: state.homepage.list,
    homes: state.home.list,
    modal: state.modal.modalIsOpen,
    auth: state.auth
  };
}

HomeModal = reduxForm({ form: 'update'})(HomeModal);

export default connect(mapStateToProps, actions)(HomeModal);
