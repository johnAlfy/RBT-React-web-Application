import React, {Component} from 'react';
import DisplayAdminsOrParents from "../users/display/DisplayAdminsOrParents";
import {Container, Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap';
import classnames from 'classnames';
import DisplaySupervisorsOrDrivers from "../users/display/DisplaySupervisorsOrDrivers";
import DisplayStudents from "../users/display/DisplayStudents";
import Track from "./Track";

class TrackingPage extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: this.props.tabId,
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        return (
            <Container>

                <Nav className="mr-auto" tabs style={{
                    paddingTop: 20, paddingLeft: 20, padBottom: 15,
                    color: "#fbfbff"
                }}>
                    <NavItem>
                        <NavLink style={{color:'white', backgroundColor: this.state.activeTab === 'track'?"#5858c1":'#007bff'}}
                                 className={classnames({active: this.state.activeTab === 'track'})}
                                 onClick={() => {
                                     this.toggle('track');
                                 }}
                        >
                            Track
                        </NavLink>
                    </NavItem>


                </Nav>
                <TabContent activeTab={this.state.activeTab} style={{backgroundColor: "#5858c1", paddingTop: 20}}>


                    {/*<TabPane tabId="addUser">
                        <AddUser/>
                    </TabPane>*/}
                    <TabPane tabId="track">
                        <Track tabId="track" ref={React.createRef()}/>
                    </TabPane>

                </TabContent>
            </Container>

        );
    }
}

export default TrackingPage;