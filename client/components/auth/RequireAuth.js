import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

export default function (ComposedComponent) {
  
  class Authentication extends Component {
    
    componentWillMount() {
      if (!this.props.authenticated) {
       // browserHistory.push('/signup');
        this.props.history.push('/signin');

      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
       // browserHistory.push('/signup');
        this.props.history.push('/signin');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  Authentication.propTypes = { authenticated: PropTypes.bool };

  console.log(Authentication.propTypes)

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(Authentication);
}