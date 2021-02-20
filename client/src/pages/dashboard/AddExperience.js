import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addProfileExperience } from './../../store/actions/profileActions'

const AddExperience = ({ addProfileExperience, history }) => {
    const [experienceFormData, setExperienceFormData] = useState({
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });

    const { company, title, location, from, to, current, description } = experienceFormData;

    const onChange = e => setExperienceFormData({ ...experienceFormData, [e.target.name]: e.target.value });

    return (
        <Fragment>
            <h1 className="large text-primary">Add An Experience</h1>
            <p className="lead">
                <i className="fas fa-code-branch" /> Add any developer/programming positions that you have had in the past
            </p>
            <small>* = required field</small>
            
            <form className="form" onSubmit={e => {e.preventDefault(); addProfileExperience(experienceFormData, history);}}>
                <div className="form-group">
                    <input type="text" placeholder="* Job Title" name="title" value={title} onChange={onChange} required />
                </div>

                <div className="form-group">
                    <input type="text" placeholder="* Company" name="company" value={company} onChange={onChange} required/>
                </div>

                <div className="form-group">
                    <input type="text" placeholder="Location" name="location" value={location} onChange={onChange} />
                </div>

                <div className="form-group">
                    <h4>From Date</h4>
                    <input type="date" name="from" value={from} onChange={onChange} />
                </div>

                <div className="form-group">
                    <p>
                        <input type="checkbox" name="current" checked={current} value={current}
                            onChange={() => {
                                setExperienceFormData({ ...experienceFormData, current: !current });
                            }}
                        />{' '}
                        Current Job
                    </p>
                </div>

                <div className="form-group">
                    <h4>To Date</h4>
                    <input type="date" name="to" value={to} onChange={onChange} disabled={current}/>
                </div>

                <div className="form-group">
                    <textarea name="description" cols="30" rows="5" placeholder="Job Description" value={description}
                        onChange={onChange}/>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    )
}

AddExperience.propTypes = {
    addProfileExperience: PropTypes.func.isRequired,
}

export default connect(null, { addProfileExperience })(withRouter(AddExperience));