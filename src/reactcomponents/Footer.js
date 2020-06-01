import React, {Component} from 'react';
import {Card, CardBody, CardImg, CardSubtitle, CardTitle, Col, Media, Row} from "reactstrap";
import {Container} from "react-bootstrap";
import contactLogo from "../photos/icons/contact.svg";
import faceIcon from "../photos/icons/Facebook.svg";
import twiterIcon from "../photos/icons/twiter.svg";
import instgramIcon from "../photos/icons/instgram.svg";
import Image from "react-bootstrap/Image";

class Footer extends Component {

    render() {
        return (
            <div style={{ backgroundColor: "#6c6c6c", height: 400}}>
                <Container style={{paddingTop: 30}}>

                    <Media heading style={{color: "#FC361D", fontStyle: "bold", fontSize: 35}}>
                        CONTACTUS
                    </Media>
                    <Row style={{paddingBottom: 10}}>
                        <Col sm={3} style={{paddingTop: 10}}>

                            <Card style={{backgroundColor: "#4f4f4f", color: "#ffffff"}}>
                                <CardImg top style={{width: "auto", height: 68}}
                                         src={contactLogo}
                                         alt="Card image cap"/>
                                <CardBody>
                                    <CardTitle>khaled.elsaka25@gmail.com</CardTitle>
                                    <CardSubtitle>+201148827429</CardSubtitle>

                                </CardBody>
                            </Card>
                        </Col>
                        <Col sm={3} style={{paddingTop: 10}}>

                            <Card style={{backgroundColor: "#4f4f4f", color: "#ffffff"}}>
                                <CardImg top style={{width: "auto", height: 68}}
                                         src={contactLogo}
                                         alt="Card image cap"/>
                                <CardBody>
                                    <CardTitle>khaled.elsaka25@gmail.com</CardTitle>
                                    <CardSubtitle>+201148827429</CardSubtitle>

                                </CardBody>
                            </Card>
                        </Col>

                        <Col sm={3} style={{paddingTop: 10}}>

                            <Card style={{backgroundColor: "#4f4f4f", color: "#ffffff"}}>
                                <CardImg top style={{width: "auto", height: 68}}
                                         src={contactLogo}
                                         alt="Card image cap"/>
                                <CardBody>
                                    <CardTitle>khaled.elsaka25@gmail.com</CardTitle>
                                    <CardSubtitle>+201148827429</CardSubtitle>

                                </CardBody>
                            </Card>
                        </Col>

                        <Col sm={3} style={{paddingTop: 10}}>

                            <Card style={{backgroundColor: "#4f4f4f", color: "#ffffff"}}>
                                <CardImg top style={{width: "auto", height: 68}}
                                         src={contactLogo}
                                         alt="Card image cap"/>
                                <CardBody>
                                    <CardTitle>khaled.elsaka25@gmail.com</CardTitle>
                                    <CardSubtitle>+201148827429</CardSubtitle>

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <Row>

                        <Col sm="12" md={{size: 6, offset: 3}} style={{paddingTop: 30, textAlign: 'center'}}>
                            Real Time Bus Tracking RBT
                        </Col>

                    </Row>
                    <Row>
                        <Col sm="12" md={{size: 6, offset: 3}} style={{textAlign: 'center'}}>
                            <Image src={faceIcon} style={{width: 30, height: 40}}/>
                            <Image src={twiterIcon} style={{width: 30, height: 40}}/>
                            <Image src={instgramIcon} style={{width: 30, height: 40}}/>
                        </Col>


                    </Row>
                </Container>
            </div>
        );
    }
}

export default Footer;
