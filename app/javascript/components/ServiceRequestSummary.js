import React from "react"
import PropTypes from "prop-types"
import ServiceRequestAmount from "./ServiceRequestAmount"
import axios from 'axios';
class ServiceRequestSummary extends React.Component {
  state = {
    serviceRequestItems: [],
    serviceRequest: {},
    address: {}
  }

  constructor(props) {
    super(props);

    this.getOrderItems = this.getOrderItems.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  componentDidMount() {
    this.getOrderItems();
  }

  getOrderItems(){
    var serviceRequestID = document.getElementById('order-id').textContent
    axios
      .get("/service_requests/" + serviceRequestID + ".json")
        .then(res => {
          this.setState({ 
            serviceRequestItems: res.data.service_request_items,
            serviceRequest: res.data.service_request,
            address: res.data.address,
            discount: res.data.discount,
            status: res.data.status
          })
        }
      )
      .catch(err => {
         console.log(err);
         return null;
       });
  }

  redirectPage() {
    location.href = "/services/new"
  }

  updateState(name, value){
    this.setState({[name]: value})
  }

  render () {
    const serviceRequestItems = this.state.serviceRequestItems.map((item) =>
      <div className="cart-item" key={item.id}>
        <div className="titles">
          <h2>Firearm Type: {item.firearm_type_name}</h2>
          <h3>Service: {item.service_type_name}</h3>
          <h3>Service Work: {item.service_work.name}</h3>
          <h3>{item.frame_work_style_of_crown && "Style Of Crown: " + item.frame_work_style_of_crown}</h3>
          <h3>{item.frame_work_hardware && "Hardware: " + item.frame_work_hardware}</h3>
          <h3>{item.barrel_work_style_of_crown && "Style Of Crown: " + item.barrel_work_style_of_crown}</h3>
          <h3>{item.barrel_work_lengthof_barrel && "Length Of Barrel: " + item.barrel_work_lengthof_barrel}</h3>
          <h3>{item.barrel_work_barrel_threads && "Barrel Threads: " + item.barrel_work_barrel_threads}</h3>
          <h3>{item.action_work_model_name && "Model Name: " + item.action_work_model_name}</h3>
          <h3>{item.stock_work_hardware_type && "Hardware Type: " + item.stock_work_hardware_type}</h3>
          <h3>{item.stock_work_hardware && "Hardware: " + item.stock_work_hardware}</h3>
        </div>
        <div className="total-price">
          <h4>Estimated Cost: ${item.service_work.estimated_cost_labor}</h4>
          <h4>Estimated Part Cost: ${item.service_work.estimated_cost_part}</h4>
          <h4>Estimated Time: ${item.service_work.estimated_time}</h4>
        </div>
      </div>
    );
    return (
      <React.Fragment>
        <main className="cart-m order-summary">
          <div className="cart-d">
            <div className="cart-top">
              <h1>Service Request Summary</h1>
              <button onClick={this.redirectPage} type="button" name="button">Add New Services</button>
            </div>
            <div className="main-cart">
              <div className="item-side">
                {serviceRequestItems}
              </div>
              <hr></hr>
              <ServiceRequestAmount tax={this.state.serviceRequest.taxes} updateAddress={this.updateState} status={this.state.status} address={this.state.address} discount={this.state.discount} order={this.state.serviceRequest} />
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default ServiceRequestSummary
