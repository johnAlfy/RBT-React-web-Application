import React, {Component} from 'react';
import {Button, Col, Container, FormFeedback, Input, Label, Row, Table, UncontrolledCollapse} from 'reactstrap';
import axios from "axios";
import AddStudent from "../add/AddStudent";

class DisplayAdminsOrParents extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Users: [],
            searchUsers: [],
            searchOption: 'id'
        };
        this.getDefaultUsers();
    }

    getDefaultUsers = () => {
        axios({
            url: '/get_find_students',
            method: 'get',
        }).then((res) => {
            this.setState({
                Users: res.data.Users,
                searchUsers: res.data.Users,
            });
        }).catch(error => {
            console.log(error)
        });
    };

    onInputSearchChange = (e) => {
        const {value} = e.target;
        let searchOption = this.state.searchOption;
        let newUsers = Object.assign([], this.state.Users);

        if (searchOption === "Level/ClassNumber") {
            let level_class = value.split('/');
            newUsers = this.state.Users.filter(user =>
                level_class.length >= 2 ?
                    (user.level.toString().startsWith(level_class[0])
                        && user.classNumber.toString().startsWith(level_class[1])) : true);

        } else if (searchOption === "name")
            newUsers = this.state.Users.filter(user => user.name.includes(value));
        else if (searchOption === "id")
            newUsers = this.state.Users.filter(user => user.id.toString().startsWith(value));
        else if (searchOption === "parent")
            newUsers = this.state.Users.filter(user => user.parent.username.includes(value));
        else if (searchOption === "address")
            newUsers = this.state.Users.filter(user => user.address.includes(value));
        else if (searchOption === "busNumber")
            newUsers = this.state.Users.filter(user => user.bus.bus_numbers.includes(value));
        else if (searchOption === "Pick-upPoint")
            newUsers = this.state.Users.filter(user => (user.pickupCoordinate.label + ' ' + user.pickupCoordinate.address).includes(value));

        this.setState({
            searchUsers: newUsers
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
                            <option id={'id'} value={'id'}>ID</option>
                            <option id={'name'} value={'name'}>Name</option>
                            <option id={'Level/ClassNumber'} value={'Level/ClassNumber'}>Level/ClassNumber</option>
                            <option id={'parent'} value={'parent'}>Parent</option>
                            <option id={'address'} value={'address'}>Address</option>
                            <option id={'busNumber'} value={'busNumber'}>Bus Number/Name</option>
                            <option id={'Pick-upPoint'} value={'Pick-upPoint'}>Pick-up Point</option>
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

    addStudentToTable = (student) => {
        let newUsers = Object.assign([], this.state.Users);
        newUsers.push(student);
        this.setState({
            Users: newUsers,
            searchUsers: newUsers
        });
    };

    render() {
        return (
            <div>
                <Col>
                    <Button id="toggler_addUser" style={{marginBottom: '1rem', backgroundColor: '#271670'}}>
                        Add Student
                    </Button>
                    <UncontrolledCollapse toggler="#toggler_addUser">
                        <AddStudent addStudentToTable={this.addStudentToTable}/>
                    </UncontrolledCollapse>
                </Col>
                {this.getSearchMenu()}

                <Table bordered dark hover style={{marginTop: 20}}>
                    <thead style={{backgroundColor: '#190e49'}}>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Level/Class Number</th>
                        <th>Address</th>
                        <th>Parent</th>
                        <th>Bus Number/Name</th>
                        <th>Pick-up Point</th>
                        <th>Date of Birth</th>
                    </tr>
                    </thead>
                    <tbody style={{backgroundColor: '#3c3c7a'}}>
                    {
                        this.state.searchUsers.map(user => {
                            return (
                                <tr key={user.id}>
                                    <th scope="row">{user.id}</th>
                                    <td>{user.name}</td>
                                    <td>{user.level}/{user.classNumber}</td>
                                    <td>{user.address}</td>
                                    <td>{user.parent.username}</td>
                                    <td>{user.bus.bus_numbers}</td>
                                    <td>[{user.pickupCoordinate.label}] {user.pickupCoordinate.address}</td>
                                    <td>{user.dateOfBirth}</td>
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

export default DisplayAdminsOrParents;