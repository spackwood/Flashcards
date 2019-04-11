import React, { Component } from 'react';
import './App.css';
import Card from '../src/components/Card/Card'
import { Route, Switch, Redirect } from 'react-router-dom';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import userService from '../../utils/userService';

class App extends Component {
  constructor() {
    super();

    this.state = {
      cards: [
        {},
      ],
      currentCard: {}
    }
  }

  async compoundDidMount() {
    const user = userService.getUser();
    const currentCards = this.state.cards;
    
    this.setState({ 
      user,
      cards: currentCards,
      currentCard: this.getRandomCard(currentCards)
    });
  }

  getRandomCard(currentCards){
    var card = currentCards[Math.floor(Math.random() * currentCards.length)];
    return(card);
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
      <div className="App">
        <Card question={this.state.currentCard.question} 
              answer={this.state.currentCard.answer}
              />
      </div>
    );
  }
}

export default App;
