import React, { Component } from 'react';
import { Consumer } from "../Context/context";
import { Row, Col, Button } from "reactstrap";
import Form from "../Form/Form";
import UpdateForm from "../Form/UpdateForm";
import CardItem from "../CardItem/CardItem";
import axios from "axios";

export default class CardPile extends Component{
    state = {
        modal: false,
        updateModal: false,
        modalQuestion: '',
        modalAnswer: ''
    };
        toggleModal = () => {
            this.setState({
                modal: !this.state.modal
            });
        };
        toggleUpdateModal = (card) => {
            console.log('update this card ', card);
            this.setState({
                updateModal: !this.state.updateModal,
                modalQuestion: card.question,
                modalAnswer: card.answer,
                cardId: card._id
            });
        };

        addCard = (dispatch, card) => {
            const question = card.question;
            const answer = card.answer;
            dispatch({ type: "ADD_CARD", payload: card });
            axios.post("api/flashcard/add", { question, answer });
        };

        deleteCard = (dispatch, id) => {
            dispatch({ type: "DELETE_CARD", payload: id });
            axios.delete(`api/flashcard/delete/${id}`);
        };
        updateCard = async (dispatch, card) => {
            const question = card.question;
            const answer = card.answer;
            dispatch({ type: "UPDATE_CARD", payload: card });
            axios.patch(`api/flashcard/update/${card.id}`, { question, answer} )            
        }

        handleToggle = (dispatch, id) => {
            dispatch({ type: "TOGGLE_HAND", payload: id });
            axios.patch(`api/flashcard/toggle/${id}`);
        };

    
        handleRank = (dispatch, id, event) => {
            const rank = event.target.id;
            dispatch({ type: "RANK_CARD", payload: id, rank });
            axios.patch(`api/flashcard/rank/${id}`, { rank });
        };

        render(props){
        return (
            <Consumer>
                {value => {
                    const { cards, dispatch } = value;
                    return (
                        <React.Fragment>
                            <Button color="success" onClick={this.toggleModal}>
                                <i className="fas fa-plus" /> Add Flashcard
                            </Button>
                            <Form
                                modal={this.state.modal}
                                toggleModal={this.toggleModal}
                                addCard={this.addCard.bind(this, dispatch)}
                            />
                            <UpdateForm
                                modal={this.state.updateModal}
                                toggleUpdateModal={this.toggleUpdateModal}
                                updateCard={this.updateCard.bind(this, dispatch)}
                                modalQuestion={this.state.modalQuestion}
                                cardId={this.state.cardId}
                                modalAnswer={this.state.modalAnswer}
                            />

                            <Row>
                                {cards
                                    .sort((a, b) => a.rank - b.rank)
                                    .map(card => {
                                        return (
                                            <Col key={card._id}>
                                                <CardItem
                                                    card={card}
                                                    deleteCard={this.deleteCard.bind(
                                                        this,
                                                        dispatch,
                                                        card._id
                                                    )}

                                                    modal={this.state.modal}
                                                    toggleModal={this.toggleModal}
                                                    toggleUpdateModal={this.toggleUpdateModal}
                                                    updateCard={this.updateCard.bind(
                                                        this,
                                                        dispatch,
                                                        card
                                                    )}
                                                    handleToggle={this.handleToggle.bind(
                                                        this,
                                                        dispatch,
                                                        card._id
                                                    )}
                                            />
                                        </Col>
                                      );
                                })}
                            </Row>
                        </React.Fragment>
                    );
                }}
            </Consumer>
        );
    }
}