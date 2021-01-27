import React from 'react'
import './NavigationItems.css'
import {NavLink} from 'react-router-dom'

const navigationItems = (props) => (

    <ul className="NavigationItems">
        <li><NavLink to="/" exact>Burger Builder</NavLink></li>
        <li><NavLink to="/orders" >Orders</NavLink></li>
    </ul>

);
export default navigationItems
