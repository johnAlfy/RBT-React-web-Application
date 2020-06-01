import React, {Component} from 'react';
import logo from "../photos/icons/logo.jpg";
import ButtonDropDown from "./reusecomponents/ButtonDropDown";
import {Link} from "react-router-dom";
import {withCookies} from 'react-cookie';
import {
    Button,
    Collapse,
    Media,
    Nav,
    Container,
    Row,
    Navbar,
    Alert,
    NavbarBrand,
    NavbarToggler,
    Col,
    NavItem
} from 'reactstrap';


class Header extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            dropdownOpen: false,

        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
            dropdownOpen: !this.state.dropdownOpen

        });
    }

    /*
        loginT(e){this.props.toggleLogin();}
    */

//
    render() {

        return (
            <div style={{backgroundColor: "#353992"}}>
                {/*
                <Image className="bussImage" src={bussImage} style={{height: 600, width: "100%"}} resizeMode="cover"/>
*/}
                <Navbar light expand="md" style={{paddingTop: 20}}>

                    <NavbarBrand>
                            <Link to="/home">
                                <Media left style={{paddingLeft: 80}}>
                                    <Media object src={logo} alt="Generic placeholder image"/>
                                </Media>
                                <Media body>
                                    <Media heading style={{color:'white'}} >
                                        RBT RealTimeTracking
                                    </Media>
                                </Media>
                            </Link>
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>

                        {this.getNav()}
                    </Collapse>
                </Navbar>


            </div>
        );
    }

    getNav() {
        if (this.props.allCookies.user) {
            return (
                <Container className={'sticky'}>
                    <Row className="float-right" >
                        <Col xs="auto" className="float-right">
                        <Alert
                            color='success'>{this.props.allCookies.user.firstName + ' ' + this.props.allCookies.user.lastName} </Alert>
                        </Col>
                    </Row>
                    <Row>
                        <Nav className="ml-auto" style={{paddingTop: 50}} navbar>
                            {' '}
                            <NavItem>
                                <ButtonDropDown text={{name: "Track", ref: "/track"}}/>
                            </NavItem>
                            {' '}
                            <NavItem>
                                <ButtonDropDown text={{name: "Routes", ref: "/routes"}} items={[
                                    {name: "Buses", ref: "/routes/buses"},
                                    {name: "Set Route", ref: "/routes/setRoute"},
                                ]}/>
                            </NavItem>
                            <NavItem>

                                <ButtonDropDown text={{name: "Users", ref: "/users"}} items={[
                                    {name: "Admins", ref: "/users/admins"},
                                    {name: "Supervisors", ref: "/users/supervisors"},
                                    {name: "Drivers", ref: "/users/drivers"},
                                    {name: "Parents", ref: "/users/parents"},
                                    {name: "Students", ref: "/users/students"}
                                ]}/>

                            </NavItem>
                            {' '}
                            <NavItem>
                                <ButtonDropDown text={{name: "Reports", ref: "/reports"}} items={[
                                    {name: "Parents", ref: "/reports/parents"},
                                    {name: "Supervisors", ref: "/reports/supervisors"},
                                    {name: "Admins", ref: "/reports/admins"},
                                ]}/>
                            </NavItem>
                            {' '}
                            <NavItem>
                                <Link to="/home">
                                    <Button onClick={() => {
                                        this.props.cookies.remove('user');
                                    }}>Logout</Button>
                                </Link>
                            </NavItem>
                        </Nav>
                    </Row>
                </Container>);
        } else {
            return (<Nav className="ml-auto" navbar>
                <NavItem>
                    <Link to="/home">
                        <Button color='primary'>Home</Button>
                    </Link>
                </NavItem>
                <NavItem>
                    <Link to="/about">
                        <Button color='primary'>About</Button>
                    </Link>
                </NavItem>
                <NavItem>
                    <Link to="/services">
                        <Button color='primary'>Services</Button>
                    </Link>
                </NavItem>
                <NavItem>
                    <Link to="/contacts">
                        <Button color='primary'>Contacts</Button>
                    </Link>
                </NavItem>
                <NavItem>
                    <Link to="/login">
                        <Button>Login</Button>
                    </Link>
                </NavItem>
            </Nav>);
        }
    }


}


export default withCookies(Header);
