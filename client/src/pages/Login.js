import PropTypes from 'prop-types'
import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { setAlert } from './../store/actions/alertActions'
import { login } from './../store/actions/authActions'

const Login = ({ login, isAuthenticated }) => {
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    })

    const { email, password } = loginForm

    const onChange = e => {
        const { name, value } = e.target
        setLoginForm({
            ...loginForm,
            [name]: value
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        login(loginForm)
    }

    return (isAuthenticated)
    ? <Redirect to="/dashboard" />
    :(
        <Fragment>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user" /> Sign Into Your Account</p>
            <form className="form" onSubmit={onSubmit}>

                <div className="form-group">
                    <input type="email" placeholder="Email Address" name="email" value={email} onChange={onChange} required/>
                </div>

                <div className="form-group">
                    <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} minLength="6"/>
                </div>

                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">Don't have an account? <Link to="/register">Sign Up</Link></p>
        </Fragment>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = ({ auth }) => {
    const { isAuthenticated } = auth
    return {
        isAuthenticated
    }
}

export default connect(mapStateToProps, { setAlert, login })(Login);
