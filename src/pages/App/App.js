import React, { Component } from 'react';
import './App.css';
import { Container } from "reactstrap";
import { Provider } from "../../components/Context/context";
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import userService from '../../utils/userService';
import { Route, Switch } from 'react-router-dom';
import Header from "../../components/Header/Header";
import CardPile from "../../components/CardPile/CardPile";
import Navbar from "../../components/NavBar/NavBar"

class App extends Component {
  constructor(props) {
    super(props);
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
    this.setState({ user: userService.getUser() });
  }

  render() {
    return (
      <Switch>
        <Route exact path='/' render={() =>
          <Provider>
            <Container>
              <Navbar />
              <Header />
              <CardPile />
            </Container>
          </Provider>
        } />
        <Route exact path='/signup' render={({ history }) => 
            <SignupPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          }/>
        <Route exact path='/login' render={({ history }) =>
          <LoginPage
            history={history}
            handleSignupOrLogin={this.handleSignupOrLogin}
          />
        } />
      </Switch>

    );
  }
}

export default App;
