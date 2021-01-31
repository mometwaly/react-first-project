import React, { Component } from 'react'
import './NavigationItems.css'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

export class NavigationItems extends Component {
    render() {
        return (
            <div>
                <ul className="NavigationItems">
                    <li><NavLink to="/" exact>Burger Builder</NavLink></li>
                    {this.props.isAuthenticated ?<li><NavLink to="/orders" >Orders</NavLink></li> : null}
                    {!this.props.isAuthenticated ?
                        <li><NavLink to="/auth" >Authenticate</NavLink></li>
                        : <li><NavLink to="/logout" >Logout</NavLink></li>}
                </ul>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}
export default connect(mapStateToProps)(NavigationItems)
