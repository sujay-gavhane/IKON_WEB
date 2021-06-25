import React from "react"
import PropTypes from "prop-types"
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import NewDimention from "./NewDimention"
import EditDimention from "./EditDimention"

class ProductDimentions extends React.Component {
  state = {
    currentDimention: {},
    dimentions: []
  }
  constructor(props) {
    super(props);

    this.getDimentionItems = this.getDimentionItems.bind(this);
    this.setAddress = this.setAddress.bind(this);
    this.updateStates = this.updateStates.bind(this);
    this.open = this.open.bind(this);
    this.openEdit = this.openEdit.bind(this);
    this.destroy = this.destroy.bind(this);
  }

  componentDidMount() {
    this.getDimentionItems();
  }

  open(){
    this.updateStates('show', 'open')
  }

  openEdit() {
    var dimentions = this.state.dimentions
    for (var index = 0; index < dimentions.length; index++) { 
      if (dimentions[index].id == parseInt(event.target.closest('a').className)){
        const currentDimention = dimentions[index]
        this.setState({'showEdit': 'open'})
        this.setState({'currentDimention': currentDimention})
      }
    }
  }

  getDimentionItems = () => {
    axios
      .get("/product_dimentions.json?")
        .then(res => {
          this.setState({ dimentions: res.data.dimentions })
        })
       .catch(err => {
           console.log(err);
           return null;
       });
  };

  updateStates(name, val){
    this.setState({ [name]: val })
  }

  setAddress() {
    event.stopPropagation()
    this.props.selectedDimention(event.target.closest(".address-id").dataset.address)
  }

  destroy(event){
    event.stopPropagation();
    var confirmDelete = confirm("Are you sure you want to delete?");
    var addrId = event.target.closest("a").className;
    if (confirmDelete) {
      axios
        .delete("/product_dimentions/" + addrId + ".json")
          .then(res => {
            this.setState({ msg: res.data.msg })
            this.props.updateState({}, 'selectedDimention')
            this.getDimentionItems()
          })
         .catch(err => {
             console.log(err);
             return null;
         });
    }
  }

  render () {
    const dimentions = this.state.dimentions.map((dimention, i) =>
      <div key={dimention.id}>
        <div className="address-item">
          <h6>{dimention.name}</h6>
          <a onClick={this.destroy} className={dimention.id}><FontAwesomeIcon icon={faTrashAlt} /></a>
          <a onClick={this.openEdit} className={dimention.id}><FontAwesomeIcon icon={faPencilAlt} /></a>
          <div className="address-id" onClick={this.setAddress} data-address={dimention.id}>
            <h1>Weight: {dimention.weight}</h1>
            <h1>Width: {dimention.width}</h1>
            <h1>Length: {dimention.length}</h1>
            <h1>Height: {dimention.height}</h1>
          </div>
        </div>
      </div>
    );
    return (
      <React.Fragment>
        <main style={{overflowY: 'hidden'}} className={"popup-main choose-address " + this.props.toggleAddressPopup}>
          <div className="popup-div">
            <div className='select-address'>
              <h2 style={{display: 'inline'}}>Dimentions</h2>
              <button onClick={this.open} type="button" name="button"><FontAwesomeIcon icon={faPlus} /></button>
              
              <a onClick={this.props.closePopup} className="sel-add-close-btn"> <span></span> </a>
            </div>
            <NewDimention updateDimentionList={this.getDimentionItems} setPopupProps={this.updateStates} show={this.state.show} />
            <EditDimention updateDimentionList={this.getDimentionItems} setPopupProps={this.updateStates} show={this.state.showEdit} properties={this.state.currentDimention}/>
            <div className="my-address" style={{maxHeight: '500px', overflowY: 'scroll'}}>
              {dimentions}
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default ProductDimentions
