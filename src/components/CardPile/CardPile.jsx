import React, { Component } from 'react';
import './DrawButton.css';
import { Consumer } from "../context/context";
import { Row, Col, Button } from "reactstrap";
import Form from "../components/Form";
import Card from "../components/Card";
import axios from "axios";

export default class CardPile extends Component{
    state = {
        modal = false
    };
        toggleModal = () => {
            this.setState({
                modal: !this.state.modal
            });
        };

        addCard = (dispatch, card) => {
            const question = card.question;
            const answer = card.answer;
            dispatch({ type: "ADD_CARD", payload: card });
            axios.post("api/flashcard/add", { question, answer });
        };

        deleteCard = (dispatch, card) => {
            const question = card.question;
            const answer = card.answer;
            dispatch({ type: "DELETE_CARD", payload: card });
            axios.post("api/flashcard/add", { question, answer });
        };
    

    render(props){
        return(
            <div className="buttonContainer">
                <button className="btn" onClick={this.drawCard}>Draw Cards</button>
            </div>
        )
    }
}

export default DrawButton