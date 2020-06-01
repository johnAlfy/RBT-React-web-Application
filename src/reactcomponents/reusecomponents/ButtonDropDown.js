import React from 'react';
import {ButtonDropdown, Button, DropdownToggle, DropdownMenu, DropdownItem, NavItem} from 'reactstrap';
import {Link} from "react-router-dom";

export default class ButtonDropDown extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        let items = this.props.items ? this.props.items.map(item => {
            return (
                <Link to={item.ref}>
                    <DropdownItem>{item.name}</DropdownItem>
                </Link>
            );
        }) : null;
        return (
            <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <Link to={this.props.text.ref}>
                    <Button id="caret" color="primary">{this.props.text.name}</Button>
                </Link>
                {
                    items ? <DropdownToggle caret color="primary"/> :
                        null
                }
                <DropdownMenu>
                    {items}
                </DropdownMenu>
            </ButtonDropdown>
        );
    }
}