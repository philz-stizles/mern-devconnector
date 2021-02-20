import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getLoggedInUserProfile, deleteAccount } from './../../store/actions/profileActions'
import Spinner from '../../components/Spinner'
import { Link } from 'react-router-dom'
import Experience from '../../components/dashboard/Experience'
import Education from '../../components/dashboard/Education'
import DashboardActions from '../../components/dashboard/DashboardActions'

const Dashboard = ({ 
    deleteAccount,
    getLoggedInUserProfile, 
    auth: { loading: authLoading, loggedInUser }, 
    profile: { loading, profile } 
}) => {
    useEffect(() => {
        getLoggedInUserProfile()
    }, [getLoggedInUserProfile])
    
    return (loading && profile === null) 
        ? <Spinner /> 
        : (
            <Fragment>
                <h1 className="large text-primary">Dashboard</h1>
                <p className="lead">
                    <i className="fas fa-user" /> Welcome {loggedInUser && loggedInUser.name}
                </p>
                {
                    (profile !== null) 
                    ? (
                        <Fragment>
                            <DashboardActions />
                            <Experience experiences={profile.experience} />
                            <Education educations={profile.education} />

                            <div className="my-2">
                                <button className="btn btn-danger" onClick={() => deleteAccount()}>
                                <i className="fas fa-user-minus" /> Delete My Account
                                </button>
                            </div>
                        </Fragment>
                    )
                    : (
                        <Fragment>
                            <p>You have not yet setup a profile, please add some info</p>
                            <Link to="/create-profile" className="btn btn-primary my-1">
                                Create Profile
                            </Link>
                        </Fragment>
                    )
                }
            </Fragment>
        )
}

Dashboard.propTypes = {
    deleteAccount: PropTypes.func.isRequired,
    getLoggedInUserProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = ({ auth, profile }) => {
    return {
        auth,
        profile
    }
}

export default connect(mapStateToProps, { getLoggedInUserProfile, deleteAccount })(Dashboard)
