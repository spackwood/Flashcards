import React, { Component } from "react";
import {
    Button, 
    Label,
    Input,
    Modal,
    ModalFooter,
    ModalBody
} from "reactstrap";

export default class UpdateForm extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
       this.state = {
            question : props.modalQuestion,
            answer : props.modalAnswer
        };
    }

    handleChange = event => {
        console.log(JSON.stringify(this.props))
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = event => {
        event.preventDefault();
         this.props.updateCard({
            question: this.state.question,
            answer: this.state.answer,
            id: this.props.cardId
        })
        this.setState({
            question: "",
            answer: ""
        });
    };

    render() {
        return (
            <Modal isOpen={this.props.modal} answer={this.props.modalAnswer} question={this.props.modalQuestion} toggle={this.props.toggleUpdateModal}>
                <ModalBody>
                    <Label>Question</Label>
                    <Input
                        type="textarea"
                        name="question"
                        onChange={this.handleChange}
                        placeholder={this.props.modalQuestion}
                        value={this.state.question}
                    />
                    <Label>Answer</Label>
                    <Input
                        type="textarea"
                        name="answer"
                        onChange={this.handleChange}
                        placeholder={this.props.modalAnswer}
                        value={this.state.answer}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.props.toggleUpdateModal}>
                     Cancel
                    </Button>
                    <Button color="info" onClick={this.handleSubmit}>
                     Save
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}