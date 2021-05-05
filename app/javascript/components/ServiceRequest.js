import React from "react"
import PropTypes from "prop-types"
import ServiceRequestSummary from "./ServiceRequestSummary"
class ServiceRequest extends React.Component {
  render () {
    return (
      <React.Fragment>
        <ServiceRequestSummary />
      </React.Fragment>
    );
  }
}

export default ServiceRequest
