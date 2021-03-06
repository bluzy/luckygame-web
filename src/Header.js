import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <nav>
                <div className="nav-wrapper blue darken-1">
                <ul id="nav-mobile" className="left">
                    <li>
                        <NavLink to={'/ladder'}>LADDER</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/roulette'}>ROULETTE</NavLink>
                    </li>
                </ul>
                </div>
            </nav>
        )
    }
}

export default Header;
