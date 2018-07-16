import React, { Component } from 'react';
import { Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <div>
                <Nav>
                    <NavItem>
                        <NavLink href="#" to={'/ladder'}>사다리</NavLink>
                    </NavItem>
                </Nav>
            </div>
        )
    }
}

export default Header;
