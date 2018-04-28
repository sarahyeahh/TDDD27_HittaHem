import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { connect } from 'react-redux';
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
	      <div>
	        <SearchHome></SearchHome>
      	</div>
    	)
	}

}

