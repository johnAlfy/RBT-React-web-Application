import React, {Component} from 'react';
import DisplayAdminsOrParents from "./display/DisplayAdminsOrParents";
import {Container, Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap';
import classnames from 'classnames';
import DisplaySupervisorsOrDrivers from "./display/DisplaySupervisorsOrDrivers";
import DisplayStudents from "./display/DisplayStudents";

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
                        <NavLink style={{color:'white', backgroundColor: this.state.activeTab === 'admin'?"#5858c1":'#007bff'}}
                                 className={classnames({active: this.state.activeTab === 'admin'})}
                                 onClick={() => {
                                     this.toggle('admin');
                                 }}
                        >
                            Admins
                        </NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink style={{color:'white', backgroundColor:  this.state.activeTab === 'supervisor'?"#5858c1":'#007bff'}}
                                 className={classnames({active: this.state.activeTab === 'supervisor'})}
                                 onClick={() => {
                                     this.toggle('supervisor');
                                 }}
                        >
                            Supervisors
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink style={{color:'white', backgroundColor:  this.state.activeTab === 'driver'?"#5858c1":'#007bff'}}
                                 className={classnames({active: this.state.activeTab === 'driver'})}
                                 onClick={() => {
                                     this.toggle('driver');
                                 }}
                        >
                            Drivers
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink style={{color:'white', backgroundColor: this.state.activeTab === 'parent'?"#5858c1":'#007bff'}}
                                 className={classnames({active: this.state.activeTab === 'parent'})}
                                 onClick={() => {
                                     this.toggle('parent');
                                 }}>
                            Parents
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink style={{color:'white', backgroundColor: this.state.activeTab === 'student'?"#5858c1":'#007bff'}}
                                 className={classnames({active: this.state.activeTab === 'student'})}
                                 onClick={() => {
                                     this.toggle('student');
                                 }}>
                            Students
                        </NavLink>
                    </NavItem>

                </Nav>
                <TabContent activeTab={this.state.activeTab} style={{backgroundColor: "#5858c1", paddingTop: 20}}>


                    {/*<TabPane tabId="addUser">
                        <AddUser/>
                    </TabPane>*/}
                    <TabPane tabId="admin">
                        <DisplayAdminsOrParents tabId="admin"/>
                    </TabPane>
                    <TabPane tabId="supervisor">
                        <DisplaySupervisorsOrDrivers tabId="supervisor"/>
                    </TabPane>
                    <TabPane tabId="driver">
                        <DisplaySupervisorsOrDrivers tabId="driver"/>
                    </TabPane>
                    <TabPane tabId="parent">
                        <DisplayAdminsOrParents tabId={'parent'}/>
                    </TabPane>
                    <TabPane tabId="student">
                        <DisplayStudents/>
                    </TabPane>

                </TabContent>
            </Container>

        );
    }
}

export default UsersPage;