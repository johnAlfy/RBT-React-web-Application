import React, {Component} from 'react';
import axios from "axios";
import {Alert, Container, Row} from "reactstrap";
import ParentCard from "./ParentCard";
import {connect} from "react-redux";
export class SelectParents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            parents:null,
            selectedParents:[]
        };
       this.getParents();

    }

    getParents=()=>{
        axios({
            url: '/get_find_parents',
            method: 'post',
        }).then((res) => {
            this.setState({
                parents: res.data.Users
            });
        }).catch(error => {console.log(error)});
    };
    selectParent=(parent)=>{
        let newSelected = Object.assign([],this.state.selectedParents);
        newSelected.push(parent);
        this.setState({selectedParents:newSelected});
        this.props.setSelectedParents(this.state.selectedParents);
    };
    unSelectParent = (parent)=>{
        let p = this.state.selectedParents.find(p=> p===parent);
        let index = this.state.selectedParents.indexOf(p);
        let newSelected = Object.assign([],this.state.selectedParents);
        newSelected.splice(index,1);
        this.setState({selectedParents:newSelected});
        this.props.setSelectedParents(this.state.selectedParents);
    };
    render() {
        const displayUsers = this.state.parents != null ? this.state.parents.map((parent) => {
            return (
                <ParentCard parent={parent} colore='white' unSelectParent={this.unSelectParent}
                            selectParent={this.selectParent} key={parent.id}/>
            )

        }) : null;
        return (
            <Container>
                <Alert color={'success'}>Number of Selected parents: {this.state.selectedParents.length}</Alert>
                <Row>
                    {displayUsers}
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    }
};
const mapActionsToProps = (dispatch) => {
    return {
        setSelectedParents: (selectedParents) => {
            dispatch({type: 'SETSELECTEDPARENTS',selectedParents });
        }
    }
};
export default connect(mapStateToProps, mapActionsToProps)(SelectParents);