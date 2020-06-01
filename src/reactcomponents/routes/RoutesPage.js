import React, {Component} from 'react';
import {Container, Nav, NavItem, NavLink, TabContent, TabPane} from "reactstrap";
import classnames from "classnames";
import DisplayBuses from "./bus/DisplayBuses";
import SetPickUpPoints from "./map/AddRoute";

export class RoutesPage extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.childTask = React.createRef();
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
                    <NavItem outline>
                        <NavLink style={{color:'white', backgroundColor: this.state.activeTab === 'displayBuses'?"#5858c1":'#007bff'}}
                                 className={classnames({active: this.state.activeTab === 'displayBuses'})}
                                 onClick={() => {
                                     this.toggle('displayBuses');
                                 }}
                        >
                            Buses
                        </NavLink>
                    </NavItem>

                    <NavItem outline>
                        <NavLink style={{color:'white', backgroundColor: this.state.activeTab === 'setRoutes'?"#5858c1":'#007bff'}}
                                 className={classnames({active: this.state.activeTab === 'setRoutes'})}
                                 onClick={() => {
                                     this.toggle('setRoutes');
                                 }}
                        >
                            Set Routes
                        </NavLink>
                    </NavItem>

                </Nav>
                <TabContent activeTab={this.state.activeTab} style={{backgroundColor: "#5858c1", paddingTop: 20}}>
                    {this.state.search}
                    <TabPane tabId="displayBuses">
                        <DisplayBuses/>
                    </TabPane>
                    <TabPane tabId="setRoutes">
                        <SetPickUpPoints ref={this.childTask}/>
                    </TabPane>

                </TabContent>
            </Container>

        );
    }
}

export default RoutesPage;