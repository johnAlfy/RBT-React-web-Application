import React, {Component} from 'react';
import {Button, Col, Container, Input, Label, Row, Table, UncontrolledCollapse} from 'reactstrap';
import axios from "axios";
import ReplyReport from "../add/ReplyReport";
import AddReport from "../add/AddReport";

class DisplayParentsReports extends Component {
    constructor(props) {
        super(props);

        this.state = {
            reports: [],
            searchReports: [],
            searchOption: 'id'
        };
        axios({
            url: '/review_notification_of_admin',
            method: 'get',
        }).then((res) => {
            if (res.data.reports) {
                this.setState({
                    reports: res.data.reports,
                    searchReports: res.data.reports,
                });
            }
        }).catch(error => {
            console.log(error)
        });
    }


    onInputSearchChange = (e) => {
        const {value} = e.target;
        let searchOption = this.state.searchOption;
        let newReports = Object.assign([], this.state.reports);
        if (searchOption === "id")
            newReports = this.state.reports.filter(report => report.id.toString().startsWith(value));
        else if (searchOption === "content")
            newReports = this.state.reports.filter(report => report.content.includes(value));
        else if (searchOption === "to")
            newReports = this.state.reports.filter(report => report.receiver_mail_or_id.includes(value));
        this.setState({
            searchReports: newReports
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
                            <option id={'content'} value={'content'}>Content</option>
                            <option id={'to'} value={'to'}>Sent To</option>
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

    addReportToTable = (report) => {
        let newReports = Object.assign([], this.state.reports);
        newReports.push(report);
        this.setState({
            reports: newReports,
            searchReports: newReports
        });
    };


    render() {
        return (
            <div>
                {this.getSearchMenu()}

                <Table  bordered dark size={'sm'}  hover style={{marginTop: 20}}>
                    <thead style={{backgroundColor: '#190e49'}}>
                    <tr>
                        <th>#</th>
                        <th>Content</th>
                        <th>Sent To</th>
                        <th>Date & Time</th>
                    </tr>
                    </thead>
                    <tbody style={{backgroundColor: '#3c3c7a'}}>
                    {
                        this.state.searchReports.map((report) => {
                            return (
                                <tr key = {report.id}>
                                    <th scope="row">{report.id}</th>
                                    <td>{report.content}</td>
                                    <td>{report.receiver_mail_or_id}</td>
                                    <td>{report.dateTime}</td>
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

export default DisplayParentsReports;