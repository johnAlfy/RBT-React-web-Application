import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from "./reactcomponents/Home";
import UsersPage from "./reactcomponents/users/UsersPage";
import Login from "./reactcomponents/Login";
import Header from "./reactcomponents/Header";
import Footer from "./reactcomponents/Footer";
import {withCookies, Cookies} from 'react-cookie';
import {CookiesProvider} from 'react-cookie';
import RoutesPage from "./reactcomponents/routes/RoutesPage";
import TestSoketIo from "./reactcomponents/tracking/TestSoketIo";
import ReportsPage from "./reactcomponents/reports/ReportsPage";
import Track from "./reactcomponents/tracking/Track";
import TrackingPage from "./reactcomponents/tracking/TrackingPage";

class App extends Component {
    render() {

        let loggedIn =
            (
                <div>
                    <Route exact path="/users" component={() => <UsersPage tabId="admin"/>}/>
                    <Route path="/users/parents" component={() => <UsersPage tabId="parent"/>}/>
                    <Route path="/users/supervisors" component={() => <UsersPage tabId="supervisor"/>}/>
                    <Route path="/users/drivers" component={() => <UsersPage tabId="driver"/>}/>
                    <Route path="/users/admins" component={() => <UsersPage tabId="admin"/>}/>
                    <Route path="/users/students" component={() => <UsersPage tabId="student"/>}/>

                    <Route exact path="/routes" component={() => <RoutesPage tabId='displayBuses'/>}/>
                    <Route path="/routes/buses" component={() => <RoutesPage tabId='displayBuses'/>}/>
                    <Route path="/routes/setRoute" component={() => <RoutesPage tabId='setRoutes'/>}/>


                    <Route exact path="/reports" component={() => <ReportsPage tabId="parent"/>}/>
                    <Route path="/reports/parents" component={() => <ReportsPage tabId="parent"/>}/>
                    <Route path="/reports/supervisors" component={() => <ReportsPage tabId="supervisor"/>}/>
                    <Route path="/reports/admins" component={() => <ReportsPage tabId="admin"/>}/>

                    <Route path="/track" component={() => <TrackingPage tabId={'track'}/>}/>
                </div>
            );
        return (
            <CookiesProvider>
                <Router>
                    <Header/>
                    {/*
                <Image className="carImage" src={bussImage} style={{width:"auto"}}/>
*/}
                    <div className="body">

                        <Route exact path="/" component={Home}/>
                        <Route path="/home" component={Home}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/testio" component={TestSoketIo}/>

                        {
                            this.props.allCookies.user ? loggedIn :
                                null
                        }
                    </div>
                    <Footer/>
                </Router>
            </CookiesProvider>
        );
    }
}

export default withCookies(App);
