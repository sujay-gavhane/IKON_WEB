import React from "react"
import PropTypes from "prop-types"
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from '@fortawesome/free-solid-svg-icons'

class ServiceCartItems extends React.Component {
  state = {
    service_cart_items: []
  }
  constructor(props) {
    super(props);

    this.getCartItems = this.getCartItems.bind(this);
    this.destroy = this.destroy.bind(this);
  }

  componentDidMount() {
    this.getCartItems();
  }

  getCartItems = () => {
    var cartID = document.getElementById('cart-id').textContent
    var totalEstimatedCostLabor = 0
    var totalEstimatedCostPart = 0
    var netPayable = 0
    var totalEstimatedTime = 0
    axios
      .get("/service_carts/" + cartID + ".json")
        .then(res => {
          this.setState({ service_cart_items: res.data.service_cart_items })
          res.data.service_cart_items.map((item) => {
            totalEstimatedCostLabor = totalEstimatedCostLabor + parseFloat(item.service_work.estimated_cost_labor),
            totalEstimatedCostPart = totalEstimatedCostPart + parseFloat(item.service_work.estimated_cost_part),
            netPayable = netPayable + (parseFloat(item.service_work.estimated_cost_part) + parseFloat(item.service_work.estimated_cost_labor)),
            totalEstimatedTime = totalEstimatedTime + parseInt(item.service_work.estimated_time)

          });
          this.props.updateState(totalEstimatedCostLabor, 'totalEstimatedCostLabor', 0)
          this.props.updateState(totalEstimatedCostPart, 'totalEstimatedCostPart', 0)
          this.props.updateState(totalEstimatedTime, 'totalEstimatedTime', 0)
          this.props.updateState(totalEstimatedCostPart + totalEstimatedCostLabor, 'netPayable', 0)
          this.props.updateState(res.data.service_cart_items.length, 'cartItemsCount', 0)
        }
      )
      .catch(err => {
         console.log(err);
         return null;
       });
  };

  destroy(){
    var confirmDelete = confirm("Are you sure you want to delete?");
    var cartItemId = event.target.closest("a").className;
    if (confirmDelete) {
      axios
        .delete("/service_carts/" + cartItemId + ".json")
          .then(res => {
            this.getCartItems();
          })
         .catch(err => {
             console.log(err);
             return null;
         });
    }
  }

  render () {
    const serviceCartItems = this.state.service_cart_items.map((item) =>
      <div className="cart-item" key={item.id}>
        { !this.props.checkout &&
          <div className="remove">
            <a className={item.id} onClick={this.destroy}><FontAwesomeIcon icon={faTimes} /></a>
          </div>
        }
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
        {serviceCartItems}
      </React.Fragment>
    );
  }
}

export default ServiceCartItems
