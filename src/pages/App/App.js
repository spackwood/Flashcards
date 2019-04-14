import React, { Component } from 'react';
import './App.css';
import Card from '../../components/Card/Card'
import DrawButton from '../../components/DrawButton/DrawButton'
// import SignupPage from '../SignupPage/SignupPage';
// import LoginPage from '../LoginPage/LoginPage';
import userService from '../../utils/userService';

class App extends Component {
  constructor(props) {
    super(props);

    this.updateCard = this.updateCard.bind(this);

    this.state = {
      cards: [],
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
        <div className="cardRow">
          <Card question={this.state.currentCard.question} 
                answer={this.state.currentCard.answer}
                />
        </div>
        <div className="buttonRow">
          <DrawButton drawCard={this.updateCard}/>
        </div>
      </div>
    );
  }
}

export default App;
