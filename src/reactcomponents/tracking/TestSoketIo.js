import React, {Component} from "react";
import socketIOClient from "socket.io-client";

class TestSoketIo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ramez: null,
            sa2a: null,
            url: "http://localhost:5001"
        };
    }

    componentDidMount() {
        const socket = socketIOClient('http://localhost:5001',);
        socket.on("ramez@fci.com", data => this.setState({ramez: data}));
        socket.on("sa2a@gmail.com", data => this.setState({sa2a: data}));
    }

    render() {
        return (
            <div style={{textAlign: "center"}}>
                {this.state.ramez&&<p>
                    The Ramez: {this.state.ramez.latitude},{this.state.ramez.longitude},
                </p>}
                {this.state.sa2a&&<p>
                    The sa2a: {this.state.sa2a.latitude},{this.state.sa2a.longitude},
            </p>}

            </div>
        );
    }
}

export default TestSoketIo;