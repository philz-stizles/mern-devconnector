import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Alert = ({ alerts }) => {
    return alerts !== null && alerts.length > 0 && alerts.map(({ id, type, msg }) => {
                    return <div style={{ 
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }} key={id} className={`alert alert-${type}`}>{msg} <span ><i className="fa fa-close"></i></span></div>
                });
}

Alert.propTypes = {
    alerts: PropTypes.array.isRequired,
}

const mapStateToProps = ({ alert }) => ({
    alerts: alert.alerts
})

export default connect(mapStateToProps)(Alert);
