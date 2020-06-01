import React, {Component} from 'react';
import {Button, Col, Container, Input, Label, Row, Table, UncontrolledCollapse} from 'reactstrap';
import AddBus from "./AddBus";
import axios from "axios";

class DisplayBuses extends Component {
    constructor(props) {
        super(props);

        this.state = {
            buses: [],
            searchBuses: [],
            searchOption: 'number_Name'
        };
        axios({
            url: '/get_buses',
            method: 'get',
        }).then((res) => {
            this.setState({
                buses: res.data.buses,
                searchBuses: res.data.buses,
            });
        }).catch(error => {
            console.log(error)
        });
    }


    onInputSearchChange = (e) => {
        const {value} = e.target;
        let searchOption = this.state.searchOption;
        let newBuses = Object.assign([], this.state.buses);
        if (searchOption === "number_Name")
            newBuses = this.state.buses.filter(bus => bus.bus_numbers.includes(value));
        else if (searchOption === "driver")
            newBuses = this.state.buses.filter(bus => bus.driver.usename.includes(value));
        else if (searchOption === "supervisor")
            newBuses = this.state.buses.filter(bus => bus.supervisor.usename.includes(value));
        else if (searchOption === "route_path")
            newBuses = this.state.buses.filter(bus => bus.routePath?bus.routePath.name.includes(value):true);

        this.setState({
            searchBuses: newBuses
        });
    };
    selectSearch = (e) => {
        const {value} = e.target;
        this.setState({searchOption: value});
    };

    getSearchMenu() {
        return (
            <Container style={{backgroundColor: "#464598", paddingTop: 10, paddingBottom: 10}}>
                <Row>
                    <Col sm={1}>
                        <Label for={"searchOption"} style={{color: "#ffffff"}}>SearchBy:</Label>
                    </Col>
                    <Col xs={{size: 3}}>
                        <Input type="select" name="select" id="searchOption" onChange={this.selectSearch}>
                            <option id={'number_Name'} value={'number_Name'}>Name</option>
                            <option id={'driver'} value={'Driver'}>Driver</option>
                            <option id={'supervisor'} value={'supervisor'}>Supervisor</option>
                            <option id={'route_path'} value={'route_path'}>Route Path</option>
                        </Input>
                    </Col>
                    <Col xs={{size: 4}}>
                        <Input id="searchValue" type="search" placeholder={'search...'}
                               onChange={this.onInputSearchChange}/>
                    </Col>
                </Row>
            </Container>
        );
    }

    addBusToTable = (bus) => {
        let newBuses = Object.assign([], this.state.buses);
        newBuses.push(bus);
        this.setState({
            buses: newBuses,
            searchBuses: newBuses
        });
    };

    render() {
        return (
            <div>
                <Col>
                    <Button id="toggler_addBus" style={{marginBottom: '1rem',backgroundColor: '#271670'}}>
                        Add Bus
                    </Button>
                    <UncontrolledCollapse toggler="#toggler_addBus">
                        <AddBus addBusToTable={this.addBusToTable}/>
                    </UncontrolledCollapse>
                </Col>
                {this.getSearchMenu()}

                <Table  bordered dark  hover style={{marginTop: 20}}>
                    <thead style={{backgroundColor: '#190e49'}}>
                    <tr>
                        <th>#</th>
                        <th>Number/Name</th>
                        <th>Driver</th>
                        <th>Supervisor</th>
                        <th>Capacity</th>
                        <th># Students</th>
                        <th>Route Path</th>
                    </tr>
                    </thead>
                    <tbody style={{backgroundColor: '#3c3c7a'}}>
                    {
                        this.state.buses.map(bus => {
                            return (
                                <tr>
                                    <th scope="row">{bus.id}</th>
                                    <td>{bus.bus_numbers}</td>
                                    <td>{bus.driver.firstName} {bus.driver.lastName}</td>
                                    <td>{bus.supervisor.firstName} {bus.supervisor.lastName}</td>
                                    <td>{bus.capacity}</td>
                                    <td>{bus.students ? bus.students.length : 0}</td>
                                    <td>{bus.routePath ? bus.routePath.name : 'N/A'}</td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default DisplayBuses;