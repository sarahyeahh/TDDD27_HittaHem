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
       return <th key={home._id}> {home.title} </th>
    })
  }

  renderSizes(){
    const homes = this.props.homes || [];

    return homes.map((home) => {
       return <td key={home._id} className="text-center"> {home.size} </td>
    })
  }

  renderRooms(){
    const homes = this.props.homes || [];

    return homes.map((home) => {
       return <td key={home._id} className="text-center"> {home.rooms} </td>
    })
  }

  renderTypes(){
    const homes = this.props.homes || [];

    return homes.map((home) => {
       return <td key={home._id} className="text-center"> {home.type} </td>
    })
  }

  render() {

      if(this.props.homes){
      	return (
       
          <div className="row compare">
            <div className="col-12 mt-5 text-center">
             <h1>Jämför hem:</h1>
              <table className="table">
                
                <thead className="thead-default">
                  <tr>
                    <th>Title</th>
                    {this.renderTitles()}
                  </tr>
                </thead>
                
                <tbody>
                  <tr className="price">
                    <th scope="row">Size</th>
                    {this.renderSizes()}
                  </tr>
                  <tr className="condition">
                    <th scope="row">Rooms</th>
                    {this.renderRooms()}
                  </tr>
                  <tr className="condition">
                    <th scope="row">Types</th>
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
