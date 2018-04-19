import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'react-bootstrap';
import Modal from 'react-modal';
import {Link} from 'react-router-dom';
import * as actions from '../../actions/home';
import { connect } from 'react-redux';
import { reduxForm, Field, Radio } from 'redux-form';

const renderField = ({input, label, type, value, meta: {touched, error}}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} value={value} placeholder={value} type={type} />
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
    console.log("Update home")
    console.log(props)

    var idProps = {_id : this.theHome._id};
    console.log("ID PROPS")
    console.log(idProps)

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
  }

  buyHome(){
    console.log("Buy")
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

              <Button bsStyle="danger" bsSize="small" onClick={this.closeModal}>Close</Button>
              <br/>
              <form onSubmit={handleSubmit(this.handleFormSubmit)}>

                <h1>Edit</h1>
                <img className="home_image" src={home.image} alt={home.user}/>
          
                <div>
                  <label>Title</label>
                  <div>
                    <Field name="title" component="input" type="text" value={home.title} />
                  </div>
                </div>
                      
                <div>
                  <label>Size</label>
                  <div>
                    <Field name="size" component="input" value={home.size} type="number"/>
                  </div>
                </div>

                <div>
                  <label>Rooms</label>
                  <div>
                    <Field name="rooms"  component="input" value={home.rooms} type="number"/>
                  </div>
                </div>
                        
                <div className='button-center'>
                  <br/>
                  <Button type="submit" onClick={handleSubmit(this.handleFormSubmit)} bsStyle="success" bsSize="small" >Update</Button>
                  <Button bsStyle="danger" bsSize="small" onClick={this.deleteHome}>Delete</Button>
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

              <Button bsStyle="danger" bsSize="small" onClick={this.closeModal}>Close</Button>
              <br/>
              <h1>{home.title}</h1>
              <img className="home_image" src={home.image} alt={home._id}/>
              <label>Size</label>{home.size}
              <label>Rooms</label>{home.rooms}                      
              <div className='button-center'>
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

    if(this.props.homes){
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
    homes: state.home.list,
    modal: state.modal.modalIsOpen,
    auth: state.auth,
    type: state.modal.type
  };
}

HomeModal = reduxForm({ form: 'update'})(HomeModal);

export default connect(mapStateToProps, actions)(HomeModal);
