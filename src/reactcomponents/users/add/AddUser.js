import React, {Component} from 'react';
import {
    Button,
    Col,
    Form,
    Alert,
    FormFeedback,
    FormGroup,
    FormText,
    Input,
    Label,
    UncontrolledCollapse
} from 'reactstrap';
import axios from "axios";
import DatePicker from "react-datepicker/es";
import AddStudent from "./AddStudent";

class AddUser extends Component {

    state = {
        user: {
            firstName: null,
            lastName: null,
            email: null,
            password: null,
            contactNumber: null,
            nationalNumber: null,
            address: null,
            dateOfBirth: null,
            userType: this.props.tabId,
            students: [],
            studentAlerts: []
        },

        alert: null,
        validation: {
            submit: false,
            firstName: null,
            lastName: null,
            email: null,
            contactNumber: null,
            nationalNumber: null,
            address: null,
        }
    };
    onInputChange = (e) => {
        const {id, value} = e.target;
        this.setState(state => ({
            ...state,
            user: {
                ...state.user,
                [id]: value
            }
        }));
        let pattern;
        if (id === "firstName" || id === "lastName") {
            pattern = /^\w{1,32}$/;

        } else if (id === "email") {
            pattern = /^.+@.+?\.[a-zA-Z]{2,3}$/;
        } else if (id === "contactNumber")
            pattern = /^01\d{9}$/;
        else if (id === "nationalNumber")
            pattern = /^\d{14}$/;
        else if (id === "address")
            pattern = /^.*[a-zA-Z]+.*$/;

        if (pattern != null && pattern.test(value)) {
            this.setState(state => ({
                ...state,
                validation: {
                    ...state.validation,
                    [id]: true,
                }
            }));

        } else if (pattern != null)
            this.setState(state => ({
                ...state,
                validation: {
                    ...state.validation,
                    [id]: false,
                }
            }));
        let validation = this.state.validation;
        if (validation.nationalNumber && validation.contactNumber && validation.email
            && validation.lastName && validation.firstName) {
            this.setState(state => ({
                ...state,
                validation: {
                    ...state.validation,
                    submit: true,
                }
            }));

        }
    };
    onRadioChecked = (e) => {
        const {name, id, checked} = e.target;
        if (checked)
            this.setState(state => ({
                ...state,
                user: {
                    ...state.user,
                    [name]: id,
                }
            }));
    };

    onSubmit = (e) => {
        e.preventDefault();
        axios({
            url: '/add_user',
            method: 'post',
            data: {
                user: this.state.user
            }
        }).then((res) => {
            this.setState(state => ({
                ...state,
                user: {
                    ...state.user,
                    students:[],
                    studentAlerts: [],
                }
            }));
            if (res.data.status === true) {
                let user = this.state.user;
                this.props.addUserToTable(res.data.user, this.state.user.userType);
                this.setState(state => ({
                    ...state,
                    alert: <Alert color={'success'}>{user.firstName} is added successfully.</Alert>,
                    user: {
                        ...state.user,
                    }
                }));
            }else if (this.state.user){
                let user = this.state.user;
                this.props.addUserToTable(res.data.user, this.state.user.userType);
                this.setState(state => ({
                    ...state,
                    alert: <Alert color={'danger'}>{res.data.status}</Alert>,
                    user: {
                        ...state.user,
                    }
                }));
            }
            else {
                this.setState({alert: <Alert color={'danger'}>{res.data.status}</Alert>});
            }
        }).catch(error => console.log(error));
    };

    birthDateChange = (Data) => {
        this.setState(state => ({
            ...state,
            user: {
                ...state.user,
                dateOfBirth: Data
            }
        }));
    };
    addStudentToParent = (student) => {
        let newStud = Object.assign([], this.state.user.students);
        newStud.push(student);
        let newStudAlerts = Object.assign([], this.state.user.studentAlerts);
        newStudAlerts.push(<Alert color={'success'}>{student.name} added to current parent.</Alert>);
        this.setState(state => ({
            ...state,
            user: {
                ...state.user,
                students: newStud,
                studentAlerts: newStudAlerts
            }
        }));
    };


    render() {
        return (
            <div style={{color: "#ffffff"}}>
                <Form onSubmit={this.onSubmit}>

                    <FormGroup row={true}>
                        <Col sm={2}>
                            <Label for="firstName">First Name</Label>
                        </Col>
                        <Col sm={4}>
                            <Input id="firstName" type="text" size="sm" onChange={this.onInputChange}
                                   valid={this.state.validation.firstName}
                                   invalid={this.state.validation.firstName === false} required/>
                            <FormFeedback invalid style={{color: 'white', backgroundColor: '#dc3545'}}>
                                first name required 'no special characters allowed', maximum 32 letters!
                            </FormFeedback>
                        </Col>

                    </FormGroup>
                    <FormGroup row={true}>
                        <Col sm={2}>
                            <Label for="lastName">Last Name</Label>
                        </Col>
                        <Col sm={4}>
                            <Input id="lastName" type="text" size="sm" onChange={this.onInputChange}
                                   valid={this.state.validation.lastName}
                                   invalid={this.state.validation.lastName === false} required/>
                            <FormFeedback invalid style={{color: 'white', backgroundColor: '#dc3545'}}>
                                last name required 'no special characters allowed', maximum 32 letters!
                            </FormFeedback>
                        </Col>
                    </FormGroup>
                    <FormGroup row={true}>
                        <Col sm={2}>
                            <Label for="email">Email</Label>
                        </Col>
                        <Col sm={4}>
                            <Input id="email" type="email" size="sm" onChange={this.onInputChange}
                                   valid={this.state.validation.email}
                                   invalid={this.state.validation.email === false}
                                   required/>
                            <FormFeedback invalid style={{color: 'white', backgroundColor: '#dc3545'}}>
                                invalid email!
                            </FormFeedback>
                            <FormText color={'gray'}>Example: joe@gmail.com</FormText>

                        </Col>
                    </FormGroup>
                    <FormGroup row={true}>
                        <Col sm={2}>
                            <Label for="password">Password</Label>
                        </Col>
                        <Col sm={4}>
                            <Input id="password" type="password" size="sm" pattern=".{5,32}"
                                   title="minimum 5 characters, and maximum 32" onChange={this.onInputChange}
                                   required/>
                        </Col>
                    </FormGroup>
                    <FormGroup row={true} inline>
                        <Col sm={2}>
                            <Label for="contactNumber">Contact Number</Label>
                        </Col>
                        <Col sm={4}>
                            <Input id="contactNumber" type="text" size="sm" onChange={this.onInputChange}
                                   valid={this.state.validation.contactNumber}
                                   invalid={this.state.validation.contactNumber === false} required/>
                            <FormFeedback invalid style={{color: 'white', backgroundColor: '#dc3545'}}>
                                Needs 11 digits starts with 01
                            </FormFeedback>
                        </Col>
                    </FormGroup>
                    <FormGroup row={true} inline>
                        <Col sm={2}>
                            <Label for="nationalNumber">National Number</Label>
                        </Col>
                        <Col sm={4}>
                            <Input id="nationalNumber" type="text" size="sm" onChange={this.onInputChange}
                                   valid={this.state.validation.nationalNumber}
                                   invalid={this.state.validation.nationalNumber === false} required/>
                            <FormFeedback invalid style={{color: 'white', backgroundColor: '#dc3545'}}>
                                Needs 14 digits
                            </FormFeedback>
                        </Col>
                    </FormGroup>
                    <FormGroup row={true}>
                        <Col sm={2}>
                            <Label for="address">Address</Label>
                        </Col>
                        <Col sm={4}>
                            <Input id="address" type="text" size="sm" onChange={this.onInputChange}
                                   valid={this.state.validation.address}
                                   invalid={this.state.validation.address === false} required/>
                            <FormFeedback invalid style={{color: 'white', backgroundColor: '#dc3545'}}>
                                Address must contain alphabet characters and may contain numbers!
                            </FormFeedback>
                        </Col>
                    </FormGroup>
                    <FormGroup row={true}>
                        <Col sm={2}>
                            <Label for="DayOfBirth">Date of Birth</Label>
                        </Col>
                        <Col sm={3}>
                            <DatePicker id={"DayOfBirth"} selected={this.state.user.dateOfBirth}
                                        onChange={this.birthDateChange} required/>
                        </Col>

                    </FormGroup>
                    {
                        this.state.user.userType === 'parent' &&
                        <Col>
                            <Button id="toggler_addStudent" style={{marginBottom: '1rem',backgroundColor: '#271670'}}>
                                Add Students
                            </Button>
                            <UncontrolledCollapse toggler="#toggler_addStudent">
                                <AddStudent addStudentToParent={this.addStudentToParent} parent={'parent available'}/>
                            </UncontrolledCollapse>
                            {this.state.user.studentAlerts}
                        </Col>
                    }

                    <FormGroup row={true}>
                        <Col sm={2}>
                            <Label for='parent'>User Type</Label>
                        </Col>
                        <Col sm={4}>

                            <FormGroup check>
                                <Label check>
                                    <Input type="radio" name='userType' id="parent"
                                           defaultChecked={this.state.user.userType === "parent"}
                                           onChange={this.onRadioChecked}/>{' '}
                                    Parent
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="radio" name='userType' id="supervisor"
                                           defaultChecked={this.state.user.userType === "supervisor"}
                                           onChange={this.onRadioChecked}/>{' '}
                                    Supervisor
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="radio" name='userType' id="driver"
                                           defaultChecked={this.state.user.userType === "driver"}
                                           onChange={this.onRadioChecked}/>{' '}
                                    Driver
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="radio" name='userType' id="admin"
                                           defaultChecked={this.state.user.userType === "admin"}
                                           onChange={this.onRadioChecked}/>{' '}
                                    Admin
                                </Label>
                            </FormGroup>
                        </Col>
                    </FormGroup>


                    <FormGroup row={true}>
                        <Col sm={3}/>
                        <Col sm={4}>
                            <Button sm={4} color={'success'} disabled={!this.state.validation.submit}>Add User</Button>
                        </Col>
                    </FormGroup>
                    {this.state.alert}
                </Form>
            </div>
        );
    }
}


export default (AddUser);