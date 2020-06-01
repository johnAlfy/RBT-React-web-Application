import React from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

class PopUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: this.props.isOpen
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
        this.props.okOnClick();
    }

    render() {
        return (
            <div>

{/*
                <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
*/}
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                    <ModalBody>
                        {this.props.text}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={this.toggle}>OK</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default PopUp;