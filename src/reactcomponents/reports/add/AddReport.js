import React, {Component} from 'react';
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";
import * as axios from "axios";
import Container from "reactstrap/es/Container";
import Alert from "reactstrap/es/Alert";

export default class AddReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alert: null,
            notification: {
                content: null,
                user_type: this.props.tabId,
                dateTime: null
            }
        };
    }

    onInputChange = (e) => {
        const {value} = e.target;
        this.setState({alert: null});

        this.setState(state => ({
            ...state,
            notification: {
                ...state.notification,
                content: value
            }
        }));
    };
    onSubmit = (e) => {
        e.preventDefault();
        this.setState(state => ({
                ...state,
                notification: {
                    ...state.notification,
                    dateTime: new Date()
                }
            })
        );
        axios({
            url: '/notification',
            method: 'post',
            data: {
                notification: this.state.notification
            }
        }).then((res) => {
            if (res.data.report) {
                this.setState({alert: <Alert color={'success'}>the notification has been sent successfully</Alert>});
            } else
                this.setState({alert: <Alert color={'danger'}>error occurred!</Alert>});

        }).catch(error => {
            console.log(error)
        });
    };

    render() {
        return (
            <Container style={{color: "#ffffff"}}>
                <Form onSubmit={this.onSubmit}>
                    <FormGroup row={true}>
                        <Col sm={2}>
                            <Label for="content">Content</Label>
                        </Col>
                        <Col sm={4}>
                            <Input id="content" type="text" size="sm" onChange={this.onInputChange} required/>
                        </Col>
                    </FormGroup>
                    <FormGroup row={true}>
                        <Col sm={3}/>
                        <Col sm={4}>
                            <Button sm={4} color={'success'}>Send</Button>
                        </Col>
                    </FormGroup>
                    {this.state.alert}
                </Form>
            </Container>
        );
    }
}