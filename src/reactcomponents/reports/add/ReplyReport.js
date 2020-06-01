import React, {Component} from 'react';
import {Button, Input} from "reactstrap";
import * as axios from "axios";

export default class ReplyReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answer: null
        };
    }

    onReplyChange = (e) => {
        this.setState({answer: e.target.value});
    };
    onReplyClick = () => {
        axios({
            url: '/add_answer',
            method: 'post',
            data:{
                answer:{
                    reportId: this.props.id,
                    answer: this.state.answer
                }
            }
        }).then((res) => {
            this.props.addAnswerToTable(res.data.answer.answer, this.props.index);
        }).catch(error => {
            console.log(error)
        });
    };

    render() {
        return (
            <div>
                <Input id={'answer'} type="text" size="sm" onChange={this.onReplyChange} required/>
                <Button color={'success'} size={'xs'} onClick={this.onReplyClick}>Reply</Button>
            </div>
        );
    }
}