import React from 'react';
import AddHome from './AddHome';

export default class Home extends React.Component {
  constructor() {
    super();
  }

  //Update mount
  componentDidMount(){
  }

  //Render-function. 
  render() {
  	return (
	    
        <div className="addhome">
          <div className="col-sm-2 col-md-2 col-lg-2">
 
          </div>

          <div className="col-sm-8 col-md-8 col-lg-8">

            <div className="row">
              <AddHome></AddHome>
            </div>
          </div>

          <div className="col-sm-2 col-md-2 col-lg-2">

          </div>
        </div>
    	)
  }

}

