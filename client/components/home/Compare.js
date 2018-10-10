import React from 'react';
import { connect } from 'react-redux';

class Compare extends React.Component {

  constructor() {
    super();
    this.renderTitles = this.renderTitles.bind(this)
    this.renderSizes = this.renderSizes.bind(this)
    this.renderRooms = this.renderRooms.bind(this)
    this.renderTypes = this.renderTypes.bind(this)
  }

  componentWillReceiveProps(nextProps) {
  }

  componentDidMount(){
  }

  renderTitles(){
    const homes = this.props.homes || [];

    return homes.map((home) => {
       return <th scope="col" key={home._id}> {home.title} </th>
    })
  }

  renderSizes(){
    const homes = this.props.homes || [];

    return homes.map((home) => {
       return <td key={home._id} className=""> {home.size} </td>
    })
  }

  renderRooms(){
    const homes = this.props.homes || [];

    return homes.map((home) => {
       return <td key={home._id} className=""> {home.rooms} </td>
    })
  }

  renderTypes(){
    const homes = this.props.homes || [];

    return homes.map((home) => {
       return <td key={home._id} className=""> {home.type} </td>
    })
  }

  render() {

      if(this.props.homes){
      	return (
       
          <div className="row compare">

            <div className="table-responsive-sm">
             <h1>Jämför hem</h1>
              <table className="table table-hover table-striped">
                
                <thead className="thead-light">
                  <tr>
                    <th>Titel</th>
                    {this.renderTitles()}
                  </tr>
                </thead>
                
                <tbody>
                  <tr className="price">
                    <th scope="row">Storlek</th>
                    {this.renderSizes()}
                  </tr>
                  <tr className="rooms">
                    <th scope="row">Rum</th>
                    {this.renderRooms()}
                  </tr>
                  <tr className="types">
                    <th scope="row">Typ</th>
                    {this.renderTypes()}
                  </tr>
                </tbody>

              </table>

            </div>
          </div>
          
      	)
      }
      else{ return (<div></div>)}
  	}

}

function mapStateToProps(state) {
  return { homes: state.home.list };
}

export default connect(mapStateToProps)(Compare);
