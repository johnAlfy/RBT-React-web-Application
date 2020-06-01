import React, {Component} from 'react';
import {Container, Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap';
import classnames from 'classnames';
import DisplayParentsReports from "./display/DisplayParentsReports";
import DisplaySupervisorsReports from "./display/DisplaySupervisorsReports";
import DisplayAdminsReports from "./display/DisplayAdminsReports";

class UsersPage extends Component {
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
                        <NavLink style={{color:'white', backgroundColor: this.state.activeTab === 'parent'?"#5858c1":'#007bff'}}
                                 className={classnames({active: this.state.activeTab === 'parent'})}
                                 onClick={() => {
                                     this.toggle('parent');
                                 }}>
                            Parents Reports
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink style={{color:'white', backgroundColor:  this.state.activeTab === 'supervisor'?"#5858c1":'#007bff'}}
                                 className={classnames({active: this.state.activeTab === 'supervisor'})}
                                 onClick={() => {
                                     this.toggle('supervisor');
                                 }}
                        >
                            Supervisors Reports
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink style={{color:'white', backgroundColor:  this.state.activeTab === 'admin'?"#5858c1":'#007bff'}}
                                 className={classnames({active: this.state.activeTab === 'admin'})}
                                 onClick={() => {
                                     this.toggle('admin');
                                 }}
                        >
                            Admin
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab} style={{backgroundColor: "#5858c1", paddingTop: 20}}>

                    <TabPane tabId="parent">
                        <DisplayParentsReports tabId={'parent'}/>
                    </TabPane>
                    <TabPane tabId="supervisor">
                        <DisplaySupervisorsReports tabId="supervisor"/>
                    </TabPane>
                    <TabPane tabId="admin">
                        <DisplayAdminsReports tabId="admin"/>
                    </TabPane>

                </TabContent>
            </Container>

        );
    }
}

export default UsersPage;