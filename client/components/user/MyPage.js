import React from 'react';
import LoggedIn from './LoggedIn';

export default class MyPage extends React.Component {
  constructor() {
    super();
  }

  //Update mount
  componentDidMount(){
  }

  //Render-function. 
  render() {
  	return (
	    
        <div className="mypage">
          <div className="col-sm-2 col-md-2 col-lg-2">

          </div>

          <div className="col-sm-8 col-md-8 col-lg-8">
            <LoggedIn></LoggedIn>
          </div>

          <div className="col-sm-2 col-md-2 col-lg-2">

          </div>
        </div>
    	)
  }

}

