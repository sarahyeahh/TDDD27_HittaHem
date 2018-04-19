//client/components/App.js
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { connect } from 'react-redux';
//Components
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
	      <div>
	        <AddHome></AddHome>
      	</div>
    	)
  }

}

