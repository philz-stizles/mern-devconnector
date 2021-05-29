import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProfiles } from './../store/actions/profileActions'
import Spinner from '../components/Spinner'
import ProfileItem from '../components/profiles/ProfileItem'

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
      getProfiles()
  }, [getProfiles]);

  return (loading) 
      ? <Spinner /> 
      : (
          <Fragment>
            <h1 className='large text-primary'>Developers</h1>
            <p className='lead'>
              <i className='fab fa-connectdevelop' /> Browse and connect with
              developers
            </p>
            <div className='profiles'>
              {profiles.length > 0 ? (
                profiles.map(profile => (
                  <ProfileItem key={profile._id} profile={profile} />
                ))
              ) : (
                <h4>No profiles found...</h4>
              )}
            </div>
          </Fragment>
      )
}

Profiles.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired,
}

const mapStateToProps = ({ profile }) => ({
  profile
})

export default connect(mapStateToProps, { getProfiles })(Profiles)
