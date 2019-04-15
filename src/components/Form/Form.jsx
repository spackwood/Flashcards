import React, { Component } from "react";
import {
    Button, 
    Label,
    Input,
    Modal,
    ModalFooter,
    ModalBody
} from "reactstrap";

export default class Form extends Component {
    state = {
        question : "",
        answer : ""
    };

    handleChange = event => {
        this.setState({
            [event.atarget.name]: event.target.value
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.props.addCard({
            question: this.state.question,
            answer: this.state.answer
        });
        this.setState({
            question: "",
            answer: ""
        });
    };

    render() {
        return (
            <Modal isOpen={this.props.modal} toggle={this.props.toggleModal}>
                <ModalBody>
                    <Label>Question</Label>
                    <Input
                        type="textarea"
                        name="answer"
                        onChange={this.handleChange}
                        value={this.state.answer}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.props.toggleModal}>
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