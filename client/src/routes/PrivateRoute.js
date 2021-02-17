import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ auth: { loading, isAuthenticated }, component: Component, ...rest }) => {
    return <Route {...rest} render={props =>  
    {
        return (!isAuthenticated && !loading) ? <Redirect to="/login"/> : (<Component {...props} />)
    }
    }/>
}

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = ({ auth }) => {
    return {
        auth
    }
}

export default connect(mapStateToProps)(PrivateRoute)
