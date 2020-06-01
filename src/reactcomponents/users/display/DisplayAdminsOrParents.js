import React, {Component} from 'react';
import {Button, Col, Container, FormFeedback, Input, Label, Row, Table, UncontrolledCollapse} from 'reactstrap';
import axios from "axios";
import AddUser from "../add/AddUser";

class DisplayAdminsOrParents extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Users: [],
            searchUsers: [],
            searchOption: 'username'
        };
        this.getDefaultUsers();
    }

    getDefaultUsers = () => {
        let url = null;
        switch (this.props.tabId) {
            case 'parent': {
                url = '/get_find_parents';
                break;
            }
            case 'admin': {
                url = '/get_find_admins';
                break;
            }
        }
        axios({
            url: url,
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
        if (searchOption === "username") {
            let userName = value.split(' ');
            newUsers = this.state.Users.filter(user => user.firstName.includes(userName[0]) || user.lastName.includes(userName[1]));
        } else if (searchOption === "email") {
            newUsers = this.state.Users.filter(user => user.email.includes(value));
        } else if (searchOption === "contact_number")
            newUsers = this.state.Users.filter(user => user.contactNumber.toString().startsWith(value));
        else if (searchOption === "nationalNumber")
            newUsers = this.state.Users.filter(user => user.nationalNumber.toString().startsWith(value));

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
                            <option id={'username'} value={'username'}>User Name</option>
                            <option id={'email'} value={'email'}>E-mail</option>
                            <option id={'contact_number'} value={'contact_number'}>Contact Number</option>
                            <option id={'address'} value={'address'}>Address</option>
                            <option id={'nationalNumber'} value={'nationalNumber'}>National Number</option>
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

    addUserToTable = (user, userType) => {
        if (userType === this.props.tabId) {
            let newUsers = Object.assign([], this.state.Users);
            newUsers.push(user);
            this.setState({
                Users: newUsers,
                searchUsers: newUsers
            });
        }
    };
    /*formatDate(date){
        alert(date);
        let day = date.getDate();
        let monthIndex = date.getMonth();
        let year = date.getFullYear();

        return day + '/' + monthIndex+1 + '/' + year;
    }*/
    render() {
        return (
            <div>
                <Col>
                    <Button id="toggler_addUser" style={{marginBottom: '1rem',backgroundColor: '#231466'}}>
                        Add {this.props.tabId}
                    </Button>
                    <UncontrolledCollapse toggler="#toggler_addUser">
                        <AddUser tabId={this.props.tabId} addUserToTable={this.addUserToTable}/>
                    </UncontrolledCollapse>
                </Col>
                {this.getSearchMenu()}

                <Table  bordered dark  hover style={{marginTop: 20}}>
                    <thead style={{backgroundColor: '#190e49'}}>
                    <tr>
                        <th>#</th>
                        <th>User Name</th>
                        <th>E-Mail</th>
                        <th>Address</th>
                        <th>Contact Number</th>
                        <th>National Number</th>
                        <th>Date of Birth</th>
                    </tr>
                    </thead>
                    <tbody style={{backgroundColor: '#3c3c7a'}}>
                    {
                        this.state.searchUsers.map(user => {
                            return (
                                <tr >
                                    <th scope="row">{user.id}</th>
                                    <td>{user.firstName} {user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.address}</td>
                                    <td>{user.contactNumber}</td>
                                    <td>{user.nationalNumber}</td>
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