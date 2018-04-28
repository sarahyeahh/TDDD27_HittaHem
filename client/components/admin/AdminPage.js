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

  renderUsers(){
    console.log("renderusers ")
    const users = this.props.users || [];
    console.log("users: ")
    console.log(users)

    if(users){

      return users.map((user) => {
       return <p>{user.email}</p>
      })

    }
    else{
       return <p>"Nothing"</p>
    }


  }

  render() {
    return(
      <div className="content">
        <p>Här är alla användare.</p>
        {this.renderUsers()}

      </div>

    )
  }
}

function mapStateToProps(state) {
  console.log("State user")
  console.log(state.user)
  return { 
    users: state.user.list
  };
}

export default connect(mapStateToProps, actions)(AdminPage);