import React from 'react';
import SearchHome from './SearchHome';

export default class Search extends React.Component {
 
  constructor() {
    super();
  }

  //Update mount
  componentDidMount(){
  }

  //Render-function. 
	render() {
  	return (
        <div className="search">
	        <div className="col-sm-2 col-md-2 col-lg-2">

          </div>

          <div className="col-sm-8 col-md-8 col-lg-8">
  	         <SearchHome></SearchHome>
          </div>

          <div className="col-sm-2 col-md-2 col-lg-2">

          </div>
      	</div>
    	)
	}

}

