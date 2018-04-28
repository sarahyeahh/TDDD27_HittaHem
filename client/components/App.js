//client/components/App.js
import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';

export default class App extends React.Component {

  render() {
    return (
      <div className="content col-sm-12 col-md-6 col-lg-6">
       
        <h1>HittaHem</h1> 
        <p>Sidan för dig som vill hitta hem</p>

        <h3>Sök på hem</h3>
        <p>Välj bland massa hem i Sverige, vi har allt från små lägenheter till stora hus.
        För att hitta ett hem går du in <Link to= '/search'><b>här</b></Link>
        </p>
        
        <h3>Lägg upp annonser</h3>
        <p>Går du själv i säljtankar kan du enkelt lägga upp en egen annons för att sälja din bostad.
        Passa även på att hitta en ny bostad när du ändå är här. För att lägga upp en annons går du
        in <Link to='/addhome'><b>här</b></Link>.</p> 

        <div className="container">
          { this.props.children }
        </div>
      </div>
    );
  }
}
