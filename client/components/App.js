//client/components/App.js
import React from 'react';
import {Link} from 'react-router-dom';

export default class App extends React.Component {

  render() {
    return (
      
      <div className="content">

        <div className="start">

          <div className="col-sm-2 col-md-2 col-lg-2">
          </div>
  
          <div className="col-sm-8 col-md-8 col-lg-8">

            <div className="row">

              <div className="col-md-6">
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
              </div>

              <div className="col-md-6">
              </div>

            </div>
            
          </div>

          <div className="col-sm-2 col-md-2 col-lg-2">
          </div>

        </div>

        <div className="container">
            { this.props.children }
        </div>   

      </div>
    );
  }
}