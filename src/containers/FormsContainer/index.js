import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import UserForm from '../../components/UserForm';
import * as actions from '../../actions';

export class FormsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      showPassword: false
    };
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.loggedIn !== this.props.loggedIn) {
      localStorage.setItem('LFUser', JSON.stringify(this.props.user));
    }
  }

  handleOnChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleOnSubmit = event => {
    event.preventDefault();
    const { id } = this.props.match.params;
    if (id === 'login') {
      const { email, password } = this.state;
      this.props.signInUser({ email: email.toLowerCase(), password });
    } else {
      const { username, email, password } = this.state;
      this.props.submitNewUser({ 
        email: email.toLowerCase(), 
        username,
        password 
      });
    }
    this.setState({ 
      username: '', 
      email: '', 
      password: '', 
      showPassword: false 
    });
  }

  togglePasswordVisibility = event => {
    event.preventDefault();
    const { showPassword } = this.state;
    this.setState({ showPassword: !showPassword });
  }

  render() {
    const loggedIn = this.props.loggedIn;
    const { id } = this.props.match.params;
    return (loggedIn ? <Redirect to='/' /> : (
      <UserForm
        routeId={id}
        handleOnSubmit={this.handleOnSubmit}
        handleOnChange={this.handleOnChange}
        togglePasswordVisibility={this.togglePasswordVisibility}
        {...this.state}
      />
    ));
  }
}

export const mapDispatchToProps = dispatch => ({
  captureUser: user => dispatch(actions.captureUser(user)),
  submitNewUser: user => dispatch(actions.submitNewUser(user)),
  signInUser: user => dispatch(actions.signInUser(user))
});

export const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
  user: state.user
});

FormsContainer.propTypes = {
  match: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  captureUser: PropTypes.func.isRequired,
  submitNewUser: PropTypes.func.isRequired,
  signInUser: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(FormsContainer);