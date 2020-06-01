import React, {Component} from 'react';
import {Alert, Button, Col, Form, FormFeedback, FormGroup, FormText, Input, Label} from 'reactstrap';
import Container from "reactstrap/es/Container";
import DatePicker from "react-datepicker/es";
import axios from "axios";
import SelectSearch from 'react-select-search'

class AddStudent extends Component {


    constructor(props) {
        super(props);
        this.state = {
            alert: null,
            student: {
                id: null,
                name: null,
                address: null,
                dateOfBirth: null,
                classNumber: null,
                level: null,
                busId: null,
                parentId: null,
                pickUpPointId: null
            },
            buses: [],
            parentsOptions: [],
            pickUpPoints: [],

        };
        if (this.props.parent == null) {
            axios({
                url: '/get_find_parents',
                method: 'get',
            }).then((res) => {
                let options = [];
                res.data.Users.forEach(function (parent) {
                    options.push({name: parent.email, value: parent.id});
                });
                this.setState({
                    parentsOptions: options
                });
            }).catch(error => {
                console.log(error)
            });

        }
        this.getBuses_pickuppoints();

    }

    getBuses_pickuppoints =()=>{
        axios({
            url: '/get_buses_with_coordinates',
            method: 'get',
        }).then((res) => {
            this.setState(state => ({
                ...state,
                buses: res.data.buses,
                pickUpPoints: res.data.buses.length > 0 ? (res.data.buses[0].routePath.coordinates) : [],

                student: {
                    ...state.student,
                    busId: res.data.buses.length > 0 ? res.data.buses[0].id : null,
                }
            }));

            if (this.state.pickUpPoints.length > 0) {
                this.setState(state => ({
                    ...state,
                    student: {
                        ...state.student,
                        pickUpPointId: this.state.pickUpPoints[0].id,
                    }
                }))
            }

        }).catch(error => {
            console.log(error)
        });
    };
    onInputChange = (e) => {
        const {id, value} = e.target;
        this.setState(state => ({
            ...state,
            student: {
                ...state.student,
                [id]: value
            }
        }));

    };
    onSubmit = (e) => {
        e.preventDefault();
        if (this.props.parent) {
            e.stopPropagation();
            this.props.addStudentToParent(this.state.student);
        } else {
            axios({
                url: '/add_student',
                method: 'post',
                data: {
                    student: this.state.student
                }
            }).then((res) => {

                if (res.data.status === true) {
                    this.getBuses_pickuppoints();
                    this.props.addStudentToTable(res.data.student);
                    this.setState({
                        alert: <Alert color={'success'}>{res.data.student.name} is added successfully.</Alert>,
                    });
                } else {
                    if (res.data.status.includes('parent')) {
                        document.getElementById('parent').focus();
                    }
                    this.setState({alert: <Alert color={'danger'}>{res.data.status}</Alert>});
                }
            }).catch(error => {
                console.log(error)
            });
        }

    };
    onBusSelect = (e) => {
        const {value, selectedIndex} = e.target;
        this.setState(state => ({
            ...state,
            pickUpPoints: this.state.buses[selectedIndex].routePath.coordinates,
            student: {
                ...state.student,
                busId: value
            }
        }));
    };
    onPointSelect = (e) => {
        const {value} = e.target;
        this.setState(state => ({
            ...state,
            student: {
                ...state.student,
                pickUpPointId: value
            }
        }));
    };
    birthDateChange = (Data) => {
        this.setState(state => ({
            ...state,
            student: {
                ...state.student,
                dateOfBirth: Data
            }
        }));
    };
    onSelectParent = (value) => {
        this.setState(state => ({
            ...state,
            student: {
                ...state.student,
                parentId: value.value
            }
        }));
    };

    render() {
        return (
            <Container style={{color: "#ffffff"}}>
                <Form onSubmit={this.onSubmit}>
                    <FormGroup row={true}>
                        <Col sm={2}>
                            <Label for="name">Student Name</Label>
                        </Col>
                        <Col sm={4}>
                            <Input id="name" type="text" size="sm" onChange={this.onInputChange} required/>
                        </Col>
                    </FormGroup>
                    <FormGroup row={true}>
                        <Col sm={2}>
                            <Label for="id">Student ID</Label>
                        </Col>
                        <Col sm={4}>
                            <Input id="id" type="number" size="sm" onChange={this.onInputChange}
                                   min={0}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row={true}>
                        <Col sm={2}>
                            <Label for="level">Level</Label>
                        </Col>
                        <Col sm={4}>
                            <Input id="level" type="number" size="sm" onChange={this.onInputChange}
                                   min={0} required/>
                        </Col>
                    </FormGroup>
                    <FormGroup row={true}>
                        <Col sm={2}>
                            <Label for="classNumber">Class Number</Label>
                        </Col>
                        <Col sm={4}>
                            <Input id="classNumber" type="number" size="sm" onChange={this.onInputChange}
                                   min={0} required/>
                        </Col>
                    </FormGroup>
                    <FormGroup row={true}>
                        <Col sm={2}>
                            <Label for="address">Address</Label>
                        </Col>
                        <Col sm={4}>
                            <Input id="address" type="text" size="sm" onChange={this.onInputChange} required/>
                        </Col>
                    </FormGroup>
                    <FormGroup row={true}>
                        <Col sm={2}>
                            <Label for="DayOfBirth">Date of Birth</Label>
                        </Col>
                        <Col sm={3}>
                            <DatePicker id={"DayOfBirth"} selected={this.state.student.dateOfBirth}
                                        onChange={this.birthDateChange} required/>
                        </Col>
                    </FormGroup>


                    <FormGroup row={true}>
                        <Col sm={2}>
                            <Label for="selectBus">Select Bus</Label>
                        </Col>
                        <Col sm={4}>
                            <Input type="select" name="selectBus" id="selectBus"
                                   onChange={this.onBusSelect} required>
                                {
                                    this.state.buses.map(bus => {
                                        let availSeats = bus.capacity - bus.students.length;
                                        return (
                                            <option id={bus.id}
                                                    value={bus.id}
                                                    disabled={availSeats <= 0}>{bus.bus_numbers} ({availSeats} seats are
                                                available)</option>
                                        );
                                    })
                                }
                            </Input>
                        </Col>
                    </FormGroup>

                    <FormGroup row={true}>
                        <Col sm={2}>
                            <Label for="selectPoint">Pick-up Point</Label>
                        </Col>
                        <Col sm={4}>
                            <Input type="select" name="selectPoint" id="selectPoint"
                                   onChange={this.onPointSelect} required>
                                {
                                    this.state.pickUpPoints.map(point => {
                                        return (
                                            <option id={point.id}
                                                    value={point.id}>[{point.label}] {point.address}</option>
                                        );
                                    })
                                }
                            </Input>
                        </Col>
                    </FormGroup>
                    {
                        this.props.parent == null ?
                            <FormGroup row={true}>
                                <Col sm={2}>
                                    <Label for="parent">Parent</Label>
                                </Col>
                                <Col sm={5}>
                                    <SelectSearch id={'parent'} options={this.state.parentsOptions} search={true}
                                                  onChange={this.onSelectParent}
                                                  value={this.state.student.parentId}
                                                  placeholder="Search parent By E-mail"/>

                                </Col>
                            </FormGroup> : null
                    }
                    <FormGroup row={true}>
                        <Col sm={3}/>
                        <Col sm={4}>
                            <Button sm={4} color={'success'}>Add Student</Button>
                        </Col>
                    </FormGroup>
                    {this.state.alert}
                </Form>
            </Container>
        );
    }
}

export default (AddStudent);