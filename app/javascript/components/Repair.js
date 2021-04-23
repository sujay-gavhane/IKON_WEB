import React from "react"
import PropTypes from "prop-types"
import InformationLine from 'images/information-line.png'
import AddBoxLine from 'images/add-box-line.png'
import axios from 'axios';
class Repair extends React.Component {
  state = {
    FirearmTypeModelfirearm_type: "rifle",
    firearmTypes: [],
    serviceTypes: [],
    finishingWork: "",
    stockWork: "",
    actionWork: "",
    barrelWork: "",
    frameWork: "",
    scoupInstallation: ""
  }

  constructor(props) {
    super(props);

    this.updateState = this.updateState.bind(this);
    this.openSecondInputs = this.openSecondInputs.bind(this);
    this.openInputs = this.openInputs.bind(this);
    this.reloadThis = this.reloadThis.bind(this);
    this.popupOpenM = this.popupOpenM.bind(this);
    this.openThirdInputs = this.openThirdInputs.bind(this);
    this.getFormDetails = this.getFormDetails.bind(this);
    this.setCsrfToken = this.setCsrfToken.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.reloadThis = this.reloadThis.bind(this);
  }

  componentDidMount() {
    this.getFormDetails()
    this.setCsrfToken()
  }

  updateState(event) {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.setState({[event.target.name]: value})
  }

  redirectPage() {
    location.href = "/quote"
  }

  reloadThis(){
    this.updateState(event)
    var gGroup=document.getElementsByClassName('g-group');
    for (var i = 0; i < gGroup.length; i++) {
      gGroup[i].style.display="none";
    }

    var gGroup=document.getElementsByClassName('sg-group');
    for (var i = 0; i < gGroup.length; i++) {
      gGroup[i].style.display="none";
    }
    this.setState({frameWork: '', barrelWork: '', actionWork: '', stockWork: '', finishingWork: ''})
  }

  openInputs(){
    this.updateState(event)
    var id = event.target.id
    if (document.getElementById(id).checked ) {
      document.getElementById(id+"-inputs").style.display="flex";
    }else{
      document.getElementById(id+"-inputs").style.display="none";
      var inputs = document.getElementById(id+"-inputs").querySelectorAll('input')
      for (var i = 0; i < inputs.length; i++) {
        inputs[i].checked = false
        this.setState({[inputs[i].name]: ''})
      }
    }
  }

  openThirdInputs(){
    this.updateState(event)
    var inputs = []
    var idM = event.target.dataset.options
    document.getElementById("rifle-pad-d").style.display="none";
    document.getElementById("field-pad-d").style.display="none";
    document.getElementById("skeet-pad-d").style.display="none";
    document.getElementById("trap-pad-d").style.display="none";
    inputs.push( document.getElementById("rifle-pad-d").querySelectorAll('input'))
    inputs.push( document.getElementById("field-pad-d").querySelectorAll('input'))
    inputs.push( document.getElementById("skeet-pad-d").querySelectorAll('input'))
    inputs.push( document.getElementById("trap-pad-d").querySelectorAll('input'))
    for (var i = 0; i < inputs.length; i++) {
      for (var j = 0; j < inputs[i].length; j++) {
        inputs[i][j].checked = false
        this.setState({[inputs[i][j].name]: ''})
      }
    }
    if (event.target.checked) {
      document.getElementById(idM).style.display="flex";
    } else {
      document.getElementById(idM).style.display="none";
    }
  }

  openSecondInputs(){
    this.updateState(event)
    var id = event.target.dataset.id
    var id2 = event.target.dataset.id2
    if (!(id2==null)) {
      var val = document.getElementById("type-of-firearm").value ;
      var idM = id+"-"+val;
    }else{
      var idM = id;
    }
    if (event.target.checked) {
      document.getElementById(idM).style.display="flex";
    }else{
      document.getElementById(idM).style.display="none";
      var inputs = document.getElementById(idM).querySelectorAll('input')
      for (var i = 0; i < inputs.length; i++) {
        inputs[i].checked = false
        this.setState({[inputs[i].name]: ''})
      }
    }
  }

  popupOpenM(){
    this.updateState(event)
    var popupM = document.querySelectorAll(".popup-main");
    popupM[0].classList.add("open");
  }

  popupClose(){
    var popupM = document.querySelectorAll(".popup-main");
    for (var i = 0; i < popupM.length; i++) {
      popupM[i].classList.remove("open");
    }
  }

  getFormDetails() {
    axios
      .get("/services/new.json" )
        .then(res => {
          this.setState({ 
            firearmTypes: res.data.firearm_types,
            serviceTypes: res.data.service_types
          })
        }
      )
      .catch(err => {
         console.log(err);
         return null;
       });
  }

  setCsrfToken() {
    const csrfToken = document.querySelector("meta[name=csrf-token]").content
    axios.defaults.headers.common['X-CSRF-Token'] = csrfToken
  }

  handleSubmit(){
    var params = {service: {"firearm_type": {}, 'service_type': {}, 'service_work': {}}}
    for (const item in this.state) {
      if(this.state[item] != "" && typeof(this.state[item]) != "object"){
        var model = item.split('Model')[0]
        var paramKey = item.split('Model')[1]
        if (model == 'FirearmType') {
          params['service']['firearm_type'][paramKey] = this.state[item] 
        } else if ( model == 'ServiceType' ) {
          params['service']['service_type'][paramKey] = this.state[item] 
        } else if ( model == 'ServiceWork' ) {
          params['service']['service_work'][paramKey] = this.state[item] 
        }
      }
    }
    // {
    //   service: {
    //     firearm_type: {
    //       type: "rifle"
    //       services: [
    //         0: {
    //           name: "frame-work"
    //           works: [
    //             0: {
    //               name: "glass bed"
    //             },
    //             1: {
    //               name: 'grip work'
    //             }
    //           ]
    //         },
    //         1: {
    //           name: "barrel-work"
    //           works: [
    //             0: {
    //               name: "glass bed"
    //             },
    //             1: {
    //               name: 'grip work'
    //             }
    //           ]
    //         }
    //       ]
    //     }
    //   }
    // }
    console.log(params)
    axios
      .post("/services.json", params )
        .then(res => {
          console.log('you will get quote')
          location.href = res.data.url
        }
      )
      .catch(err => {
         console.log(err);
         return null;
       });
  }

  render () {
    const firearmTypes = this.state.firearmTypes.map((firearmType, i) =>
      <option value={firearmType.type_name.toLowerCase()} key={firearmType.id}>{firearmType.type_name}</option>
    );
    return (
      <React.Fragment>
        <main className="cart-m quote-form-m">
          <form className="" action="/services" method="post">
            <div className="cart-d active" id="">
              <div className="cart-top">
                <h1><span>Select from our gunsmithing services</span> </h1>
              </div>

              <div className="quote-form-d">
                <div className="options-form-fields">
                  <div className="form-group">
                    <label className="form-label">Select Type of Firearm:</label>
                    <select value={this.state.FirearmTypeModelfirearm_type} name="FirearmTypeModelfirearm_type" id="type-of-firearm" onChange={this.reloadThis}>
                      {firearmTypes}
                    </select>
                  </div>

                  <div className="form-group s-form-group ">
                    <label className="form-label">Select Gunsmith Service:</label>
                    <label htmlFor="frame-work" className="s-input">
                      <span>
                        <input type="checkbox" id="frame-work" name="ServiceTypeModelframe_work" checked={this.state.ServiceTypeModelframe_work} onChange={this.openInputs}></input>
                        <span>Frame/Reciever Work</span>
                        <span className="info"><img src={InformationLine} alt="" title="Includes Scope mounting, swivel installation, Glass and Pillar bed, Grip work"></img></span>
                      </span>
                    </label>
                    <label htmlFor="barrel-work" className="s-input">
                      <span>
                        <input type="checkbox" id="barrel-work" name="ServiceTypeModelbarrel_work" checked={this.state.ServiceTypeModelbarrel_work} onChange={this.openInputs}></input>
                        <span>Barrel Work</span>
                        <span className="info"><img src={InformationLine} alt="" title="Includes Cut, Crown, Threading pin & weld, barrel change"></img></span>
                      </span>
                    </label>
                    <label htmlFor="action-work" className="s-input">
                      <span>
                        <input type="checkbox" id="action-work" name="ServiceTypeModelaction_work" checked={this.state.ServiceTypeModelaction_work} onChange={this.openInputs}></input>
                        <span>Action Work</span>
                        <span className="info"><img src={InformationLine} alt="" title="Includes trigger installations, Action Cleanin, Lubricate, Function test"></img></span>
                      </span>
                    </label>
                    <label htmlFor="stock-work" className="s-input">
                      <span>
                        <input type="checkbox" id="stock-work" name="ServiceTypeModelstock_work" checked={this.state.ServiceTypeModelstock_work} onChange={this.openInputs}></input>
                        <span>Stock Work</span>
                        <span className="info"><img src={InformationLine} alt="" title="Recoil Pad Installations"></img></span>
                      </span>
                    </label>
                    <label htmlFor="finishing-work" className="s-input">
                      <span>
                        <input type="checkbox" id="finishing-work" name="ServiceTypeModelfinishing_work" checked={this.state.ServiceTypeModelfinishing_work} onChange={this.openInputs}></input>
                        <span>Finishing Work</span>
                        <span className="info"><img src={InformationLine} alt="" title="Pakoreize, Cerakole Coating, Titanium Nitrate (Parts only)"></img></span>
                      </span>
                    </label>
                  </div>

                  <div className="form-group s-form-group sg-group " id="frame-work-inputs">
                    <label className="form-label">Frame Reciever Work:</label>
                    <label htmlFor="scoup-installation" className="s-input">
                      <span>
                        <input type="checkbox" id="scoup-installation" name="ServiceWorkModelscoup_installation" checked={this.state.ServiceWorkModelscoup_installation} onChange={this.updateState}></input>
                        <span>Scope/Sight Installation <a href="/products"> <img src={AddBoxLine} alt=""></img></a> </span>
                        <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                      </span>
                    </label>
                    <label htmlFor="swivel-installation" className="s-input">
                      <span>
                        <input type="checkbox" id="swivel-installation" name="ServiceWorkModelswivel_installation" checked={this.state.ServiceWorkModelswivel_installation} data-id="swivel-installation-style" onChange={this.openSecondInputs}></input>
                        <span>Swivel Installation <a href="/products"> <img src={AddBoxLine} alt=""></img> </a> </span>
                        <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                      </span>
                    </label>
                    <label htmlFor="glass-bed" className="s-input">
                      <span>
                        <input type="checkbox" id="glass-bed" checked={this.state.ServiceWorkModelglass_bed} name="ServiceWorkModelglass_bed" onChange={this.updateState}></input>
                        <span>Glass Bed <a href="/products"> <img src={AddBoxLine} alt=""></img> </a> </span>
                        <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                      </span>
                    </label>
                    <label htmlFor="grip-work" className="s-input">
                      <span>
                        <input type="checkbox" id="grip-work" checked={this.state.ServiceWorkModelgrip_work} name="ServiceWorkModelgrip_work" onChange={this.updateState}></input>
                        <span>Grip Work <a href="/products"> <img src={AddBoxLine} alt=""></img> </a> </span>
                        <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                      </span>
                    </label>
                  </div>

                  <div className="form-group s-form-group sg-group " id="barrel-work-inputs">
                    <label className="form-label">Barrel Work:</label>
                    <label htmlFor="barrel-cut" className="s-input">
                      <span>
                        <input type="checkbox" id="barrel-cut" name="ServiceWorkModelbarrel_cut" checked={this.state.ServiceWorkModelbarrel_cut} data-id="style-of-crown" onChange={this.openSecondInputs}></input>
                        <span>Barrel Cut + Crown + Threading   <a href="/products"> <img src={AddBoxLine} alt=""></img> </a> </span>
                        <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                      </span>
                    </label>
                    <label htmlFor="barrel-pin" className="s-input">
                      <span>
                        <input type="checkbox" id="barrel-pin" name="ServiceWorkModelbarrel_pin" checked={this.state.ServiceWorkModelbarrel_pin} onChange={this.updateState}></input>
                        <span>Barrel Pin + Weld <a href="/products"> <img src={AddBoxLine} alt=""></img> </a> </span>
                        <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                      </span>
                    </label>
                    <label htmlFor="barrel-change" className="s-input">
                      <span>
                        <input type="checkbox" id="barrel-change" name="ServiceWorkModelbarrel_change" checked={this.state.ServiceWorkModelbarrel_change} onChange={this.updateState}></input>
                        <span>Barrel Change <a href="/products"> <img src={AddBoxLine} alt=""></img> </a> </span>
                        <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                      </span>
                    </label>
                    <label htmlFor="barrel-re-threading" className="s-input">
                      <span>
                        <input type="checkbox" id="barrel-re-threading" name="ServiceWorkModelbarrel_re_threading" checked={this.state.ServiceWorkModelbarrel_re_threading} onChange={this.updateState}></input>
                        <span>Barrel Re-Threading "FIX" <a href="/products"> <img src={AddBoxLine} alt=""></img> </a> </span>
                        <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                      </span>
                    </label>
                    <label htmlFor="barrel-lengthen" className="s-input">
                      <span>
                        <input type="checkbox" id="barrel-lengthen" name="ServiceWorkModelbarrel_lengthen" checked={this.state.ServiceWorkModelbarrel_lengthen} onChange={this.updateState}></input>
                        <span>Barrel Lengthen Forcing Cone <a href="/products"> <img src={AddBoxLine} alt=""></img> </a> </span>
                        <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                      </span>
                    </label>
                    <label htmlFor="barrel-porting" className="s-input">
                      <span>
                        <input type="checkbox" id="barrel-porting" name="ServiceWorkModelbarrel_porting" checked={this.state.ServiceWorkModelbarrel_porting} onChange={this.updateState}></input>
                        <span>Barrel Porting <a href="/products"> <img src={AddBoxLine} alt=""></img> </a> </span>
                        <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                      </span>
                    </label>
                  </div>

                  <div className="form-group s-form-group sg-group " id="action-work-inputs">
                    <label className="form-label">Action Work: </label>
                    <label htmlFor="new-trigger" className="s-input">
                      <span>
                        <input type="checkbox" id="new-trigger" name="ServiceWorkModelnew_trigger" checked={this.state.ServiceWorkModelnew_trigger} data-id="new-trigger-installation" data-id2="new-trigger-installation" onChange={this.openSecondInputs}></input>
                        <span>New Trigger Installation <a href="/products"> <img src={AddBoxLine} alt=""></img> </a> </span>
                        <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                      </span>
                    </label>
                    <label htmlFor="function-test" className="s-input">
                      <span>
                        <input type="checkbox" id="function-test" name="ServiceWorkModelaction_function_test" checked={this.state.ServiceWorkModelaction_function_test} data-id="action-function-test" onChange={this.openSecondInputs}></input>
                        <span>Action Function Test <a href="/products"> <img src={AddBoxLine} alt=""></img> </a> </span>
                        <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                      </span>
                    </label>
                  </div>

                  <div className="form-group s-form-group sg-group " id="stock-work-inputs">
                    <label className="form-label">Stock Work:</label>
                    <label htmlFor="recoil-installation" className="s-input">
                      <span>
                        <input type="checkbox" id="recoil-installation" name="ServiceWorkModelrecoil_installation" checked={this.state.ServiceWorkModelrecoil_installation} data-id="recoil-hardware" data-id2="recoil-hardware" onChange={this.openSecondInputs}></input>
                        <span>Recoil Pad Installaitons <a href="/products"> <img src={AddBoxLine} alt=""></img> </a> </span>
                        <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                      </span>
                    </label>
                  </div>

                  <div className="form-group s-form-group sg-group" id="finishing-work-inputs">
                    <label className="form-label">Finishing Work:</label>
                    <label htmlFor="recoil-installaton" className="s-input">
                      <span>
                        <input type="radio" id="parkorize" name="ServiceWorkModelfinishing_work_inputs" value="parkorize" checked={this.state.ServiceWorkModelfinishing_work_inputs === "parkorize"} onChange={this.updateState}></input>
                        <span>Parkorize <a href="/products"> <img src={AddBoxLine} alt=""></img></a> </span>
                        <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                      </span>
                    </label>
                    <label htmlFor="recoil-installaton" className="s-input">
                      <span>
                        <input type="radio" id="cerakote" name="ServiceWorkModelfinishing_work_inputs" value="cerakote" checked={this.state.ServiceWorkModelfinishing_work_inputs === "cerakote"} onChange={this.updateState}></input>
                        <span>Cerakote <a href="/products"> <img src={AddBoxLine} alt=""></img></a> </span>
                        <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                      </span>
                    </label>
                    <label htmlFor="recoil-installaton" className="s-input">
                      <span>
                        <input type="radio" id="titanium-nitrate" name="ServiceWorkModelfinishing_work_inputs" value="Titanium Nitrate" checked={this.state.ServiceWorkModelfinishing_work_inputs === "Titanium Nitrate"} onChange={this.updateState}></input>
                        <span>Titanium Nitrate <a href="/products"> <img src={AddBoxLine} alt=""></img> </a> </span>
                        <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                      </span>
                    </label>
                    <label htmlFor="recoil-installaton" className="s-input">
                      <span>
                        <input type="radio" id="engraving" name="ServiceWorkModelfinishing_work_inputs" value="engraving" checked={this.state.ServiceWorkModelfinishing_work_inputs === "engraving"} onChange={this.updateState}></input>
                        <span>Engraving <a href="/products"> <img src={AddBoxLine} alt=""></img> </a> </span>
                        <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                      </span>
                    </label>
                  </div>

                  <div className="g-group" id="style-of-crown">
                    <div className="form-group s-form-group " >
                      <label className="form-label">Style of Crown:</label>
                      <label htmlFor="11-degree" className="s-input">
                        <span>
                          <input type="radio" id="11-degree" name="ServiceWorkModelstyle_of_crown" value="11Degree" checked={this.state.ServiceWorkModelstyle_of_crown === "11Degree"} onChange={this.updateState}></input>
                          <span>11 Degree Chamber  </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="standard-recess" className="s-input">
                        <span>
                          <input type="radio" id="standard-recess" name="ServiceWorkModelstyle_of_crown" value="standardRecess" checked={this.state.ServiceWorkModelstyle_of_crown === "standardRecess"} onChange={this.updateState}></input>
                          <span>Standard Recess  </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="100-degree-radius" className="s-input">
                        <span>
                          <input type="radio" id="100-degree-radius" name="ServiceWorkModelstyle_of_crown" value="100DegreeRadius" checked={this.state.ServiceWorkModelstyle_of_crown === "100DegreeRadius"} onChange={this.updateState}></input>
                          <span>10 Degree Radius  </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Final Lenght of Barrel:</label>
                      <input type="text" name="ServiceWorkModelfinal_lenght_of_barrel" value={this.state.ServiceWorkModelfinal_lenght_of_barrel} onChange={this.updateState}></input>
                    </div>
                    <div className="form-group s-form-group " >
                      <label className="form-label">Barrel Threads:</label>
                      <label htmlFor="barrel-threads-1" className="s-input">
                        <span>
                          <input type="radio" id="barrel-threads-1" name="ServiceWorkModelbarrel_threads" value="barrel-threads-1" onChange={this.updateState} checked={this.state.ServiceWorkModelbarrel_threads === "barrel-threads-1"}></input>
                          <span>1/2 &times; 28 RH  </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="barrel-threads-2" className="s-input">
                        <span>
                          <input type="radio" id="barrel-threads-2" name="ServiceWorkModelbarrel_threads" value="barrel-threads-2" onChange={this.updateState} checked={this.state.ServiceWorkModelbarrel_threads === "barrel-threads-2"}></input>
                          <span>9/16 &times; 24 RH  </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="barrel-threads-3" className="s-input">
                        <span>
                          <input type="radio" id="barrel-threads-3" name="ServiceWorkModelbarrel_threads" value="barrel-threads-3" onChange={this.updateState} checked={this.state.ServiceWorkModelbarrel_threads === "barrel-threads-3"}></input>
                          <span>5/8 &times; 24 RH  </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="barrel-threads-4" className="s-input">
                        <span>
                          <input type="radio" id="barrel-threads-4" name="ServiceWorkModelbarrel_threads" value="barrel-threads-4" onChange={this.updateState} checked={this.state.ServiceWorkModelbarrel_threads === "barrel-threads-4"}></input>
                          <span>11/16 &times; 24 RH  </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="barrel-threads-5" className="s-input">
                        <span>
                          <input type="radio" id="barrel-threads-5" name="ServiceWorkModelbarrel_threads" value="barrel-threads-5" onChange={this.updateState} checked={this.state.ServiceWorkModelbarrel_threads === "barrel-threads-5"}></input>
                          <span>3/4 &times; 24 RH  </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>7
                        </span>
                      </label>
                      <label htmlFor="barrel-threads-6" className="s-input">
                        <span>
                          <input type="radio" id="barrel-threads-6" name="ServiceWorkModelbarrel_threads" value="barrel-threads-6" onChange={this.updateState} checked={this.state.ServiceWorkModelbarrel_threads === "barrel-threads-6"}></input>
                          <span>13mm &times; 1 RH  </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="barrel-threads-7" className="s-input">
                        <span>
                          <input type="radio" id="barrel-threads-7" name="ServiceWorkModelbarrel_threads" value="barrel-threads-7" onChange={this.updateState} checked={this.state.ServiceWorkModelbarrel_threads === "barrel-threads-7"}></input>
                          <span>14mm &times; 1 RH  </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="barrel-threads-8" className="s-input">
                        <span>
                          <input type="radio" id="barrel-threads-8" name="ServiceWorkModelbarrel_threads" value="barrel-threads-8" onChange={this.updateState} checked={this.state.ServiceWorkModelbarrel_threads === "barrel-threads-8"}></input>
                          <span>15mm &times; 1 RH  </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="barrel-threads-9" className="s-input">
                        <span>
                          <input type="radio" id="barrel-threads-9" name="ServiceWorkModelbarrel_threads" value="barrel-threads-9" onChange={this.updateState} checked={this.state.ServiceWorkModelbarrel_threads === "barrel-threads-9"}></input>
                          <span>24mm &times; 1.5 RH  </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="g-group" id="swivel-installation-style">
                    <div className="form-group s-form-group " >
                      <label className="form-label">Style of Crown:</label>
                      <label htmlFor="11-degree" className="s-input">
                        <span>
                          <input type="radio" id="traditional" name="ServiceWorkModelswivel_installation_style" value="traditional" checked={this.state.ServiceWorkModelswivel_installation_style === "traditional"} onChange={this.updateState}></input>
                          <span>Traditional  <a href="/products"> <img src={AddBoxLine} alt=""></img> </a> </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="standard-recess" className="s-input">
                        <span>
                          <input type="radio" id="flush-mount-quick-detach" name="ServiceWorkModelswivel_installation_style" value="flush-mount-quick-detach" checked={this.state.ServiceWorkModelswivel_installation_style === "flush-mount-quick-detach"} onChange={this.updateState}></input>
                          <span>Flush Mount Quick Detach  <a href="/products"> <img src={AddBoxLine} alt=""></img> </a> </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                    </div>

                    <div className="form-group s-form-group " >
                      <label className="form-label">Hardware:</label>
                      <label htmlFor="provide-my-own" className="s-input">
                        <span>
                          <input type="radio" id="provide-my-own" name="ServiceWorkModelhardware" value="provide-my-own" onChange={this.updateState} checked={this.state.ServiceWorkModelhardware === "provide-my-own"}></input>
                          <span>Will provide my own </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="Shop-from-our-store" className="s-input">
                        <span>
                          <input type="radio" id="Shop-from-our-store" name="ServiceWorkModelhardware" value="Shop-from-our-store" onChange={this.updateState} checked={this.state.ServiceWorkModelhardware === "Shop-from-our-store"}></input>
                          <span>Shop from our store  <a href="/products"> <img src={AddBoxLine} alt=""></img> </a>  </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="g-group" id="recoil-hardware-pistol">
                    <div className="form-group s-form-group " >
                      <label className="form-label">Hardware:</label>
                      <label htmlFor="provide-my-own" className="s-input">
                        <span>
                          <input type="radio" id="provide-my-own" name="ServiceWorkModelrecoil_hardware_pistol" value="provide-my-own" onChange={this.updateState} checked={this.state.ServiceWorkModelrecoil_hardware_pistol === "provide-my-own"}></input>
                          <span>Will provide my own</span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>

                      <label htmlFor="Shop-from-our-store" className="s-input">
                        <span>
                          <input type="radio" id="Shop-from-our-store" name="ServiceWorkModelrecoil_hardware_pistol" value="Shop-from-our-store" onChange={this.updateState} checked={this.state.ServiceWorkModelrecoil_hardware_pistol === "Shop-from-our-store"}></input>
                          <span>Shop from our store  <a href="/products"> <img src={AddBoxLine} alt=""></img> </a>  </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="g-group" id="recoil-hardware-rifle">
                    <div className="form-group s-form-group " >
                      <label className="form-label">Hardware:</label>
                      <label htmlFor="rifle-pad" className="s-input">
                        <span>
                          <input type="radio" id="rifle-pad" name="ServiceWorkModelrecoil_hardware_rifle" checked={this.state.ServiceWorkModelrecoil_hardware_rifle === "Rifle Pad"} value="Rifle Pad" data-options="rifle-pad-d" onChange={this.openThirdInputs}></input>
                          <span>Rifle Pad</span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="field-pad" className="s-input">
                        <span>
                          <input type="radio" id="field-pad" name="ServiceWorkModelrecoil_hardware_rifle" checked={this.state.ServiceWorkModelrecoil_hardware_rifle === "Field Pad"} value="Field Pad" data-options="field-pad-d" onChange={this.openThirdInputs}></input>
                          <span>Field Pad   </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="skeet-pad" className="s-input">
                        <span>
                          <input type="radio" id="skeet-pad" name="ServiceWorkModelrecoil_hardware_rifle" checked={this.state.ServiceWorkModelrecoil_hardware_rifle === "Skeet Pad"} value="Skeet Pad" data-options="skeet-pad-d" onChange={this.openThirdInputs}></input>
                          <span>Skeet Pad   </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="trap-pad" className="s-input">
                        <span>
                          <input type="radio" id="trap-pad" name="ServiceWorkModelrecoil_hardware_rifle" checked={this.state.ServiceWorkModelrecoil_hardware_rifle === "Trap Pad"} value="Trap Pad" data-options="trap-pad-d" onChange={this.openThirdInputs}></input>
                          <span>Trap Pad   </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                    </div>

                    <div className="form-group s-form-group " id="rifle-pad-d">
                      <label className="form-label">Rifle Pad:</label>
                      <label htmlFor="rifle-pad-1" className="s-input">
                        <span>
                          <input type="radio" id="rifle-pad-1" name="ServiceWorkModelrifle_pad" value="Pachmayr RP200" onChange={this.updateState} checked={this.state.ServiceWorkModelrifle_pad === "Pachmayr RP200"}></input>
                          <span>Pachmayr RP200 </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="rifle-pad-2" className="s-input">
                        <span>
                          <input type="radio" id="rifle-pad-2" name="ServiceWorkModelrifle_pad" value="Pachmayr 500B" onChange={this.updateState} checked={this.state.ServiceWorkModelrifle_pad === "Pachmayr 500B"}></input>
                          <span>Pachmayr 500B </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="rifle-pad-3" className="s-input">
                        <span>
                          <input type="radio" id="rifle-pad-3" name="ServiceWorkModelrifle_pad" value="Pachmayr DP500" onChange={this.updateState} checked={this.state.ServiceWorkModelrifle_pad === "Pachmayr DP500"}></input>
                          <span>Pachmayr DP500 </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                    </div>

                    <div className="form-group s-form-group " id="field-pad-d">
                      <label className="form-label">Field Pad:</label>

                      <label htmlFor="field-pad-1" className="s-input">
                        <span>
                          <input type="radio" id="field-pad-1" name="ServiceWorkModelfield_pad" value="Pachmayr D750B" onChange={this.updateState} checked={this.state.ServiceWorkModelfield_pad === "Pachmayr D750B"}></input>
                          <span>Pachmayr D750B </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="field-pad-2" className="s-input">
                        <span>
                          <input type="radio" id="field-pad-2" name="ServiceWorkModelfield_pad" value="Pachmayr F325" onChange={this.updateState} checked={this.state.ServiceWorkModelfield_pad === "Pachmayr F325"}></input>
                          <span>Pachmayr F325 </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="field-pad-3" className="s-input">
                        <span>
                          <input type="radio" id="field-pad-3" name="ServiceWorkModelfield_pad" value="Pachmayr F250" onChange={this.updateState} checked={this.state.ServiceWorkModelfield_pad === "Pachmayr F250"}></input>
                          <span>Pachmayr F250 </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="field-pad-4" className="s-input">
                        <span>
                          <input type="radio" id="rifle-pad-4" name="ServiceWorkModelfield_pad" value="Pachmayr 752B" onChange={this.updateState} checked={this.state.ServiceWorkModelfield_pad === "Pachmayr 752B"}></input>
                          <span>Pachmayr 752B </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                    </div>

                    <div className="form-group s-form-group " id="skeet-pad-d">
                      <label className="form-label">Skeet Pad:</label>
                      <label htmlFor="skeet-pad-1" className="s-input">
                        <span>
                          <input type="radio" id="skeet-pad-1" name="ServiceWorkModelskeet_pad" value="Pachmayr D752B" onChange={this.updateState} checked={this.state.ServiceWorkModelskeet_pad === "Pachmayr D752B"}></input>
                          <span>Pachmayr D752B </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="skeet-pad-2" className="s-input">
                        <span>
                          <input type="radio" id="skeet-pad-2" name="ServiceWorkModelskeet_pad"  value="Pachmayr SC100" onChange={this.updateState} checked={this.state.ServiceWorkModelskeet_pad === "Pachmayr SC100"}></input>
                          <span>Pachmayr SC100 </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="skeet-pad-3" className="s-input">
                        <span>
                          <input type="radio" id="skeet-pad-3" name="ServiceWorkModelskeet_pad"  value="Pachmayr S325" onChange={this.updateState} checked={this.state.ServiceWorkModelskeet_pad === "Pachmayr S325"}></input>
                          <span>Pachmayr S325 </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                    </div>

                    <div className="form-group s-form-group " id="trap-pad-d">
                      <label className="form-label">Trap Pad:</label>

                      <label htmlFor="trap-pad-1" className="s-input">
                        <span>
                          <input type="radio" id="trap-pad-1" name="ServiceWorkModeltrap_pad" value="Pachmayr XLT 'Ultra Soft' Magnum" onChange={this.updateState} checked={this.state.ServiceWorkModeltrap_pad === "Pachmayr XLT 'Ultra Soft' Magnum"}></input>
                          <span>Pachmayr XLT "Ultra Soft" Magnum </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="trap-pad-2" className="s-input">
                        <span>
                          <input type="radio" id="trap-pad-2" name="ServiceWorkModeltrap_pad" value="Pachmayr D550 Decelerator" onChange={this.updateState} checked={this.state.ServiceWorkModeltrap_pad === "Pachmayr D550 Decelerator"}></input>
                          <span>Pachmayr D550 Decelerator </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="trap-pad-3" className="s-input">
                        <span>
                          <input type="radio" id="trap-pad-3" name="ServiceWorkModeltrap_pad" value="Pachmayr T550" onChange={this.updateState} checked={this.state.ServiceWorkModeltrap_pad === "Pachmayr T550"}></input>
                          <span>Pachmayr T550 </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="g-group" id="new-trigger-installation-pistol">
                    <div className="form-group s-form-group " >
                      <label className="form-label">Select Model:</label>

                      <label htmlFor="trigger-1" className="s-input">
                        <span>
                          <input type="radio" id="trigger-1" name="ServiceWorkModelnew_trigger_installation_pistol" value="trigger-1" onChange={this.updateState} checked={this.state.ServiceWorkModelnew_trigger_installation_pistol === "trigger-1"}></input>
                          <span> Smith & Wesson M&P-Apex Trigger </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="trigger-2" className="s-input">
                        <span>
                          <input type="radio" id="trigger-2" name="ServiceWorkModelnew_trigger_installation_pistol" value="trigger-2" onChange={this.updateState} checked={this.state.ServiceWorkModelnew_trigger_installation_pistol === "trigger-2"}></input>
                          <span>SpringFiield- Armory XD Series-Powder river Trigger</span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>

                      <label htmlFor="trigger-3" className="s-input">
                        <span>
                          <input type="radio" id="trigger-3" name="ServiceWorkModelnew_trigger_installation_pistol" value="trigger-3" onChange={this.updateState} checked={this.state.ServiceWorkModelnew_trigger_installation_pistol === "trigger-3"}></input>
                          <span> Glock Ghost Connector + Spring </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>

                      <label htmlFor="trigger-4" className="s-input">
                        <span>
                          <input type="radio" id="trigger-4" name="ServiceWorkModelnew_trigger_installation_pistol" value="trigger-4" checked={this.state.ServiceWorkModelnew_trigger_installation_pistol === "trigger-4"} onChange={this.popupOpenM}></input>
                          <span> Other </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="g-group" id="new-trigger-installation-rifle">
                    <div className="form-group s-form-group " >
                      <label className="form-label">Select Model:</label>
                      <label htmlFor="trigger-rifle-1" className="s-input">
                        <span>
                          <input type="radio" id="trigger-rifle-1" name="ServiceWorkModelnew_trigger_installation_rifle" value="trigger-rifle-1" onChange={this.updateState} checked={this.state.ServiceWorkModelnew_trigger_installation_rifle === "trigger-rifle-1"}></input>
                          <span> IWI TAVOR </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="trigger-rifle-2" className="s-input">
                        <span>
                          <input type="radio" id="trigger-rifle-2" name="ServiceWorkModelnew_trigger_installation_rifle" value="trigger-rifle-2" onChange={this.updateState} checked={this.state.ServiceWorkModelnew_trigger_installation_rifle === "trigger-rifle-2"}></input>
                          <span> FNH USA SCAR 17 </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="trigger-rifle-3" className="s-input">
                        <span>
                          <input type="radio" id="trigger-rifle-3" name="ServiceWorkModelnew_trigger_installation_rifle" value="trigger-rifle-3" onChange={this.updateState} checked={this.state.ServiceWorkModelnew_trigger_installation_rifle === "trigger-rifle-3"}></input>
                          <span> AR Tavga 2 Stage Short Trigger </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="trigger-rifle-4" className="s-input">
                        <span>
                          <input type="radio" id="trigger-rifle-4" name="ServiceWorkModelnew_trigger_installation_rifle" value="trigger-rifle-4" onChange={this.updateState} checked={this.state.ServiceWorkModelnew_trigger_installation_rifle === "trigger-rifle-4"}></input>
                          <span> AR 15 competition Trigger </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="trigger-rifle-5" className="s-input">
                        <span>
                          <input type="radio" id="trigger-rifle-5" name="ServiceWorkModelnew_trigger_installation_rifle" value="trigger-rifle-5" checked={this.state.ServiceWorkModelnew_trigger_installation_rifle === "trigger-rifle-5"} onChange={this.popupOpenM}></input>
                          <span> Other </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="g-group" id="action-function-test">
                    <div className="form-group s-form-group " >
                      <label className="form-label">Select Model:</label>
                      <label htmlFor="action-function-1" className="s-input">
                        <span>
                          <input type="radio" id="action-function-1" name="ServiceWorkModelaction_function_test" value="action-function-1" onChange={this.updateState} checked={this.state.ServiceWorkModelaction_function_test === "action-function-1"}></input>
                          <span> Smith & Wesson Model K </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="action-function-2" className="s-input">
                        <span>
                          <input type="radio" id="action-function-2" name="ServiceWorkModelaction_function_test" value="action-function-2" onChange={this.updateState} checked={this.state.ServiceWorkModelaction_function_test === "action-function-2"}></input>
                          <span>Smith & Wesson Model L</span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>

                      <label htmlFor="action-function-3" className="s-input">
                        <span>
                          <input type="radio" id="action-function-3" name="ServiceWorkModelaction_function_test" value="action-function-3" onChange={this.updateState} checked={this.state.ServiceWorkModelaction_function_test === "action-function-3"}></input>
                          <span> Smith & Wesson Model N </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>

                      <label htmlFor="action-function-4" className="s-input">
                        <span>
                          <input type="radio" id="action-function-4" name="ServiceWorkModelaction_function_test" value="action-function-4" onChange={this.updateState} checked={this.state.ServiceWorkModelaction_function_test === "action-function-4"}></input>
                          <span> Roger Blackhawk </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="action-function-5" className="s-input">
                        <span>
                          <input type="radio" id="action-function-5" name="ServiceWorkModelaction_function_test" value="action-function-5" onChange={this.updateState} checked={this.state.ServiceWorkModelaction_function_test === "action-function-5"}></input>
                          <span> Roger Redhawk </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="action-function-6" className="s-input">
                        <span>
                          <input type="radio" id="action-function-6" name="ServiceWorkModelaction_function_test" value="action-function-6" onChange={this.updateState} checked={this.state.ServiceWorkModelaction_function_test === "action-function-6"}></input>
                          <span> Roger GPIOD </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="action-function-7" className="s-input">
                        <span>
                          <input type="radio" id="action-function-7" name="ServiceWorkModelaction_function_test" value="action-function-7" checked={this.state.ServiceWorkModelaction_function_test === "action-function-7"} onChange={this.popupOpenM}></input>
                          <span> Other </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                    </div>
                  </div>
                  <button type="button" name="button" onClick={this.handleSubmit}>Get Quote</button>
                </div>
              </div>
            </div>
          </form>
        </main>
        <main className="popup-main customer-support " >
          <div className="popup-div">
            <div className="title">
              <h1>Repair Shop</h1>
            </div>
            <a onClick={this.popupClose} className="close-btn"> <span></span> </a>
            Apologize for the inconvenience at this moment we dont work on other models.
            Please send us an email at: <a href="mailto:sales@ikonweapons.com">sales@ikonweapons.com</a>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default Repair
