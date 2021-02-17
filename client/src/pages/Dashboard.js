import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getLoggedInUserProfile } from './../store/actions/profileActions'

const Dashboard = ({ getLoggedInUserProfile, auth, profile }) => {
    useEffect(() => {
        getLoggedInUserProfile()
    }, [])

    return (
        <div>
            Dashboard
        </div>
    )
}

Dashboard.propTypes = {
    getLoggedInUserProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = ({ auth, profile }) => {
    return {
        auth: auth,
        profile: profile
    }
}

export default connect(mapStateToProps, { getLoggedInUserProfile })(Dashboard)
