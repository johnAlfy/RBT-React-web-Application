import React, {Component} from 'react';
import CarImage from "../photos/car.png";
import simpleMap from "../photos/simplaMap.jpg";

import {Col, Container, Media, Row,Alert} from "reactstrap";

class Home extends Component {

    render() {
        return (
            <div>
                {/*
                <Image  src={bussImage}  style = {{height :600,width:"100%"}} />
*/}
                <Container className="homeDives">
{/*
                    <Image className="carImage" src={CarImage} style={{height: 400, width: "100%"}}/>
*/}
                    <Media body style={{paddingTop: 50}}>
                        <Media heading style={{color: "#FC361D", fontStyle: "bold", fontSize: 35}}>
                            ABOUTUS
                        </Media>
                        <div style={{color:"#712d13",backgroundColor:"#c0a99d" ,fontSize:18,width:700}}>
                        We Are a software engineering company that aims to develop a web and mobile<br/>
                        application to capture real time bus tracking using Global Positioning System(GPS)<br/>
                        in order to get user and vehicle position.<br/>
                        </div>
                    </Media>
                </Container>
                <div className="homeDives" style={{backgroundColor: "#50539f"}}>
                    <Media>
                        <Media left href="#">
                            <Media object src={simpleMap} style={{height: 400, width: 250}}
                                   alt="Generic placeholder image"/>
                        </Media>
                        <Media body>
                            <Container style={{paddingTop: 30,paddingBottom: 30}}>

                                <Media heading
                                       style={{color: "#FF9900", fontStyle: "bold", paddingLeft: 30, fontSize: 35}}>
                                    SRVICES
                                </Media>
                                <Row>
                                    <Col style={{color: "#FFFF00", paddingLeft: 40, fontSize: 15}}>
                                        <p style={{color: "#FD9941", fontStyle: "bold", fontSize: 20}}>For Parents</p>
                                        Each parent will se the Real time bus tracking of his child,<br/>
                                        They can get the information of the line and its station and<br/>
                                        when will their bus reach by getting an alerts when bus driver<br/>
                                        reaches their child drop point, Also parent can complain if <br/>
                                        there is a problem,They can give a rate to bus drivers and the<br/>
                                        supervisors of their children. It makes the communication between<br/>
                                        parents and bus driver easier and make it more safety for their <br/>
                                        children Parents.<br/>
                                    </Col>

                                    <Col style={{color: "#FFFF00", paddingLeft: 30, fontSize: 15}}>
                                        <p style={{color: "#FD9941", fontStyle: "bold", fontSize: 20}}>For School</p>
                                        school admin can tracks its buses and see their routes, he also <br/>
                                        can make the routes and stations for each bus line, He is the only<br/>
                                        one who is able to create accounts to the parents of the school<br/>
                                        children who use their school buses, school can get modified if <br/>
                                        the seed of bus exceeds or if there is any complain from parents.<br/>
                                        school provides a supervisor that can take care of children at <br/>
                                        school and their attendance.<br/>
                                    </Col>
                                </Row>
                            </Container>
                        </Media>
                    </Media>
                </div>
            </div>
        )
            ;
    }
}

export default Home;
