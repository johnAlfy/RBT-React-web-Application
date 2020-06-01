import React, {Component} from 'react';
import {Button, Col, Form, FormFeedback, FormGroup, FormText, Input, Label} from 'reactstrap';
import Container from "reactstrap/es/Container";
import axios from "axios";
import Alert from "reactstrap/es/Alert";

class AddBus extends Component {

    constructor(props) {
        super(props);
        this.state = {
            alert: null,
            availableDrivers: [],
            availableSupervisors: [],
            bus: {
                busNumber: null,
                capacity: null,
                driverID: null,
                supervisorID: null,
            }
        };

        this.getDrivers_supervisors();
    }

    getDrivers_supervisors=()=>{
        axios({
            url: '/find_driver_not_selected',
            method: 'get'
        }).then((res) => {

            this.setState(state => ({
                ...state,
                availableDrivers: res.data.driver,
                bus: {
                    ...state.bus,
                    driverID: res.data.driver.length > 0 ? res.data.driver[0].id : null
                }
            }));
        }).catch(error => console.log(error));

        axios({
            url: '/find_supervisor_not_selected',
            method: 'get'
        }).then((res) => {
            this.setState(state => ({
                ...state,
                availableSupervisors: res.data.supervisor,
                bus: {
                    ...state.bus,
                    supervisorID: res.data.supervisor.length > 0 ? res.data.supervisor[0].id : null
                }
            }));
        }).catch(error => console.log(error));
    }

    onInputChange = (e) => {
        const {id, value} = e.target;
        this.setState(state => ({
            ...state,
            bus: {
                ...state.bus,
                [id]: value
            }
        }));

    };
    onDriverChange = (e) => {
        const {value} = e.target;
        this.setState(state => ({
            ...state,
            bus: {
                ...state.bus,
                driverID: value
            }
        }));
    };

    onSupervisorChange = (e) => {
        const {value} = e.target;
        this.setState(state => ({
            ...state,
            bus: {
                ...state.bus,
                supervisorID: value
            }
        }));
    };

    onSubmit = (e) => {
        e.preventDefault();
        axios({
            url: '/add_bus',
            method: 'post',
            data: {
                bus: this.state.bus
            }
        }).then((res) => {
            this.setState({alert: null});
            if (res.data.status === true) {
                this.props.addBusToTable(res.data.bus);
                this.getDrivers_supervisors();

                this.setState({alert: <Alert color={'success'}>{res.data.bus.bus_numbers} is added successfully.</Alert>})
            } else {
                this.setState({alert: <Alert color={'danger'}>{res.data.status}</Alert>});
            }
        }).catch(error => console.log(error));

    };

    render() {
        return (
            <Container style={{color: "#ffffff"}}>
                <Form onSubmit={this.onSubmit}>
                    <FormGroup row={true}>
                        <Col sm={2}>
                            <Label for="busNumber">Bus Number/Name</Label>
                        </Col>
                        <Col sm={4}>
                            <Input id="busNumber" type="text" size="sm" onChange={this.onInputChange} required/>
                        </Col>
                    </FormGroup>
                    <FormGroup row={true}>
                        <Col sm={2}>
                            <Label for="capacity">Capacity</Label>
                        </Col>
                        <Col sm={4}>
                            <Input id="capacity" type="number" size="sm" min={0} onChange={this.onInputChange}
                                   required/>
                        </Col>
                    </FormGroup>
                    <FormGroup row={true}>
                        <Col sm={2}>
                            <Label for="selectDriver">Select Driver</Label>
                        </Col>
                        <Col sm={4}>
                            <Input type="select" name="selectDriver" id="selectDriver" onChange={this.onDriverChange}
                                   required>
                                {
                                    this.state.availableDrivers.map(driver => {
                                        return (
                                            <option id={driver.id}
                                                    value={driver.id}>{driver.firstName} {driver.lastName}</option>
                                        );
                                    })
                                }
                            </Input>
                        </Col>
                    </FormGroup>
                    <FormGroup row={true}>
                        <Col sm={2}>
                            <Label for="selectSupervisor">Select Supervisor</Label>
                        </Col>
                        <Col sm={4}>
                            <Input type="select" name="selectSupervisor" id="selectSupervisor"
                                   onChange={this.onSupervisorChange} required>
                                {
                                    this.state.availableSupervisors.map(supervisor => {
                                        return (
                                            <option id={supervisor.id}
                                                    value={supervisor.id}>{supervisor.firstName} {supervisor.lastName}</option>
                                        );
                                    })
                                }
                            </Input>
                        </Col>
                    </FormGroup>

                    <FormGroup row={true}>
                        <Col sm={3}/>
                        <Col sm={4}>
                            <Button sm={4} color={'success'}>Add Bus</Button>
                        </Col>
                    </FormGroup>
                    {this.state.alert}
                </Form>
            </Container>
        );
    }
}

export default AddBus;