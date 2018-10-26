import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/auth';
import {form, FormGroup, Button} from 'react-bootstrap';

class AdminPage extends React.Component {
	
 constructor(props) {
    super(props);
    this.renderUsers = this.renderUsers.bind(this);
  }	

  componentWillMount() {
    this.props.getAllUsers()
  }

  handleConfigClick(){
    //this.props.configUser();
    window.alert("Configure (coming soon...)");
    window.location.reload();
  }

  handleDeleteClick(){
    //this.props.deleteUser();
    window.alert("Delete (coming soon...)");
    window.location.reload();
  }


  renderUsers(){
    const users = this.props.users || [];
    if(users){

      return users.map((user) => {
       return (
            <div className="row"> 
              <div className="col-md-6"> 
                {user.email} 
              </div>
              <div className="col-md-6"> 
                  <Button bsStyle="success" bsSize="small" onClick={this.handleConfigClick}>Configure</Button>
                  <Button bsStyle="danger" bsSize="small" onClick={this.handleDeleteClick}>Delete</Button>
                  
              </div>
           </div>
       )
      })

    }
    else{
       return <p>"Nothing"</p>
    }


  }

  render() {
    return(


        <div className="admin">
          <div className="col-sm-2 col-md-2 col-lg-2">

          </div>

          <div className="col-sm-8 col-md-8 col-lg-8">
            <div className="content">
                <div className="row"> 
                  <h1>Admin</h1>
                </div>

                <div className="row"> 
                  <p>Här är alla användare.</p>
                  {this.renderUsers()}
                </div>
            </div>
          </div>

          <div className="col-sm-2 col-md-2 col-lg-2">

          </div>
        </div>
  

    )
  }
}

function mapStateToProps(state) {
  return { 
    users: state.user.list
  };
}

export default connect(mapStateToProps, actions)(AdminPage);