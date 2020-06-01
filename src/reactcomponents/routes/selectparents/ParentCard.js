import React, {Component} from 'react';
import axios from "axios";
import {Card, CardBody, Button,CardImg, CardSubtitle, CardText, CardTitle, Col, Container, Row} from "reactstrap";
import userIcon from "../../../photos/icons/userIcon.svg";
export class ParentCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            parents: null,
            color: 'white'
        };
    }
    select_unselect= ()=>{
        if (this.state.color === 'white') {
            this.setState({
                color: '#bebecd'
            });
            this.props.selectParent(this.props.parent);
        }
        else{
            this.setState({
                color: 'white'
            });
            this.props.unSelectParent(this.props.parent);

        }

    };

    render() {
        let dateArr=this.props.parent.dateOfBirth.split('-');
        return (
            <Col sm={3} style={{paddingTop: 10, paddingBottom: 10}} key={this.props.parent.id} >
                <Card  tag="a"  style={{ cursor: "pointer",backgroundColor:this.state.color }} onClick={this.select_unselect}>
                    <CardImg top width="100%"
                             src={userIcon}
                             alt="Card image cap"/>
                    <CardBody>
                        <CardTitle>{this.props.parent.firstName} {this.props.parent.lastName} {this.props.parent.id}</CardTitle>
                        <CardSubtitle>{this.props.parent.email} </CardSubtitle>
                        <CardText>
                            {this.props.parent.address}<br/>
                            +2{this.props.parent.contactNumber}<br/>
                            {this.props.parent.nationalNumber}<br/>
                            Date of Birth: {dateArr[2]}/{dateArr[1]}/{dateArr[0]}<br/>
                        </CardText>
                    </CardBody>
                </Card>
            </Col>
        )
    }

}
export default ParentCard;