import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteExperience } from './../../store/actions/profileActions'
import Moment from 'react-moment';

const Experience = ({ experiences, deleteExperience })=> {
    const experienceList = experiences.map(({ _id, company, title, from, to }) => {
        return (
            <tr key={_id}>
                <td>{company}</td>
                <td className="hide-sm">{title}</td>
                <td>
                    <Moment format="YYYY/MM/DD">{from}</Moment> - {to ? <Moment format="YYYY/MM/DD">{to}</Moment> : 'Now'}
                </td>
                <td>
                    <button onClick={() => deleteExperience(_id)} className="btn btn-danger">
                        Delete
                    </button>
                </td>
            </tr>
        )
    })

    return (
        <Fragment>
            <h2 className="my-2">Experience Credentials</h2>
            <table className="table">
                <thead>
                <tr>
                    <th>Company</th>
                    <th className="hide-sm">Title</th>
                    <th className="hide-sm">Years</th>
                    <th />
                </tr>
                </thead>
                <tbody>{experienceList}</tbody>
            </table>
        </Fragment>
    )
}

Experience.propTypes = {
    experiences: PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired,
}

export default connect(null, { deleteExperience })(Experience)
