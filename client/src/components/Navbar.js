import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { logOut } from './../store/actions/authActions'

const Navbar = ({ isAuthenticated, loading, logOut }) => {
    const privateLinks = (
        <ul>
                <li><Link to="/profiles">Developers</Link></li>
                <li><Link to="/posts">Posts</Link></li>
                <li><Link to="/dashboard">
                    <i className="fas fa-user" />{' '}
                    <span className="hide-sm">Dashboard</span>
                    </Link>
                </li>
                <li>
                    <a onClick={logOut} href="#!">
                        <i className="fas fa-sign-out-alt" />{' '}
                        <span className="hide-sm">Logout</span>
                    </a>
                </li>
            </ul>
    )

    const publicLinks = (
        <ul>
            <li><Link to="/profiles">Developers</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    )

    return (
        <nav className="navbar bg-dark">
            <h1><Link to="/"><i className="fas fa-code" /> DevConnector</Link></h1>
            {
                (!loading) && (<Fragment>{ (isAuthenticated) ? privateLinks : publicLinks }</Fragment>)
            }
        </nav>
    )
}

Navbar.protoTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logOut: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
}



const mapStateToProps = ({ auth }) => {
    const { isAuthenticated, loading } = auth
    return {
        isAuthenticated,
        loading
    }
}

export default connect(mapStateToProps, { logOut })(Navbar)
