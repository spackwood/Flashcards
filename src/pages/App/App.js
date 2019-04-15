import React, { Component } from 'react';
import './App.css';
import { Container } from "reactstrap";
import { Provider } from "./context/context";
// import SignupPage from '../SignupPage/SignupPage';
// import LoginPage from '../LoginPage/LoginPage';
import userService from '../../utils/userService';

import Header from "./components/Header";
import CardPile from "./components/CardPile";

class App extends Component {
  constructor(props) {
    super(props);

    this.updateCard = this.updateCard.bind(this);

    this.state = {
    }
  }

  async compoundDidMount() {
    const user = userService.getUser();
    
    this.setState({ 
      user
    });
  }

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  }

  handleSignupOrLogin = () => {
    this.setState({user: userService.getUser()});
  }

  render() {
    return (
      <Provider>
        <Container>
          <Header />
          <CardPile />
        </Container>
      </Provider>
    );
  }
}

export default App;
