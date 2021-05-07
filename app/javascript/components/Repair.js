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
            serviceTypes: res.data.service_types,
            serviceCartId: res.data.service_cart_id
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
    var params = {service: {"firearm_types": {'service_types': {}}}}
    for (const item in this.state) {
      if(this.state[item] != "" && typeof(this.state[item]) != "object" && item != "serviceCartId"){
        var nameSplit = item.split('Model')
        var model = nameSplit[0]
        var service_type = nameSplit[1].split('ServiceType')[1] || nameSplit[1]
        var service_work = nameSplit[1].split('ServiceType')[0].split('Work')[1] || nameSplit[1].split('ServiceType')[0]
        var workItem = nameSplit[1].split('ServiceType')[0].split('Work')[0]
        if (model == 'FirearmType') {
          params['service']['firearm_types']['name'] = this.state[item] 
        } else if ( model == 'ServiceType' ) {
          if ( params['service']['firearm_types']['service_types'][service_type] == undefined ) {
            params['service']['firearm_types']['service_types'][service_type] = {}
          }
        } else if ( model == 'ServiceWork' ) {
          if (params['service']['firearm_types']['service_types'][service_type][service_work] != undefined) {
            params['service']['firearm_types']['service_types'][service_type][service_work][workItem] = this.state[item]
          } else {
            params['service']['firearm_types']['service_types'][service_type][service_work] = {} 
          }
        }
      }
    }

    axios
      .put("/service_carts/" + this.state.serviceCartId + ".json", params)
        .then(res => {
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
                        <input type="checkbox" id="scoup-installation" name="ServiceWorkModelscoup_installationServiceTypeframe_work" checked={this.state.ServiceWorkModelscoup_installationServiceTypeframe_work} onChange={this.updateState}></input>
                        <span>Scope/Sight Installation <a href="/products"> <img src={AddBoxLine} alt=""></img></a> </span>
                        <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                      </span>
                    </label>
                    <label htmlFor="swivel-installation" className="s-input">
                      <span>
                        <input type="checkbox" id="swivel-installation" name="ServiceWorkModelswivel_installationServiceTypeframe_work" checked={this.state.ServiceWorkModelswivel_installationServiceTypeframe_work} data-id="swivel-installation-style" onChange={this.openSecondInputs}></input>
                        <span>Swivel Installation <a href="/products"> <img src={AddBoxLine} alt=""></img> </a> </span>
                        <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                      </span>
                    </label>
                    <label htmlFor="glass-bed" className="s-input">
                      <span>
                        <input type="checkbox" id="glass-bed" checked={this.state.ServiceWorkModelglass_bedServiceTypeframe_work} name="ServiceWorkModelglass_bedServiceTypeframe_workServiceTypeframe_work" onChange={this.updateState}></input>
                        <span>Glass Bed <a href="/products"> <img src={AddBoxLine} alt=""></img> </a> </span>
                        <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                      </span>
                    </label>
                    <label htmlFor="grip-work" className="s-input">
                      <span>
                        <input type="checkbox" id="grip-work" checked={this.state.ServiceWorkModelgrip_workServiceTypeframe_work} name="ServiceWorkModelgrip_workServiceTypeframe_workServiceTypeframe_work" onChange={this.updateState}></input>
                        <span>Grip Work <a href="/products"> <img src={AddBoxLine} alt=""></img> </a> </span>
                        <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                      </span>
                    </label>
                  </div>

                  <div className="form-group s-form-group sg-group " id="barrel-work-inputs">
                    <label className="form-label">Barrel Work:</label>
                    <label htmlFor="barrel-cut" className="s-input">
                      <span>
                        <input type="checkbox" id="barrel-cut" name="ServiceWorkModelbarrel_cutServiceTypebarrel_work" checked={this.state.ServiceWorkModelbarrel_cutServiceTypebarrel_work} data-id="style-of-crown" onChange={this.openSecondInputs}></input>
                        <span>Barrel Cut + Crown + Threading   <a href="/products"> <img src={AddBoxLine} alt=""></img> </a> </span>
                        <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                      </span>
                    </label>
                    <label htmlFor="barrel-pin" className="s-input">
                      <span>
                        <input type="checkbox" id="barrel-pin" name="ServiceWorkModelbarrel_pinServiceTypebarrel_work" checked={this.state.ServiceWorkModelbarrel_pinServiceTypebarrel_work} onChange={this.updateState}></input>
                        <span>Barrel Pin + Weld <a href="/products"> <img src={AddBoxLine} alt=""></img> </a> </span>
                        <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                      </span>
                    </label>
                    <label htmlFor="barrel-change" className="s-input">
                      <span>
                        <input type="checkbox" id="barrel-change" name="ServiceWorkModelbarrel_changeServiceTypebarrel_work" checked={this.state.ServiceWorkModelbarrel_changeServiceTypebarrel_work} onChange={this.updateState}></input>
                        <span>Barrel Change <a href="/products"> <img src={AddBoxLine} alt=""></img> </a> </span>
                        <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                      </span>
                    </label>
                    <label htmlFor="barrel-re-threading" className="s-input">
                      <span>
                        <input type="checkbox" id="barrel-re-threading" name="ServiceWorkModelbarrel_re_threadingServiceTypebarrel_work" checked={this.state.ServiceWorkModelbarrel_re_threadingServiceTypebarrel_work} onChange={this.updateState}></input>
                        <span>Barrel Re-Threading "FIX" <a href="/products"> <img src={AddBoxLine} alt=""></img> </a> </span>
                        <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                      </span>
                    </label>
                    <label htmlFor="barrel-lengthen" className="s-input">
                      <span>
                        <input type="checkbox" id="barrel-lengthen" name="ServiceWorkModelbarrel_lengthenServiceTypebarrel_work" checked={this.state.ServiceWorkModelbarrel_lengthenServiceTypebarrel_work} onChange={this.updateState}></input>
                        <span>Barrel Lengthen Forcing Cone <a href="/products"> <img src={AddBoxLine} alt=""></img> </a> </span>
                        <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                      </span>
                    </label>
                    <label htmlFor="barrel-porting" className="s-input">
                      <span>
                        <input type="checkbox" id="barrel-porting" name="ServiceWorkModelbarrel_portingServiceTypebarrel_work" checked={this.state.ServiceWorkModelbarrel_portingServiceTypebarrel_work} onChange={this.updateState}></input>
                        <span>Barrel Porting <a href="/products"> <img src={AddBoxLine} alt=""></img> </a> </span>
                        <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                      </span>
                    </label>
                  </div>

                  <div className="form-group s-form-group sg-group " id="action-work-inputs">
                    <label className="form-label">Action Work: </label>
                    <label htmlFor="new-trigger" className="s-input">
                      <span>
                        <input type="checkbox" id="new-trigger" name="ServiceWorkModelnew_triggerServiceTypeaction_work" checked={this.state.ServiceWorkModelnew_triggerServiceTypeaction_work} data-id="new-trigger-installation" data-id2="new-trigger-installation" onChange={this.openSecondInputs}></input>
                        <span>New Trigger Installation <a href="/products"> <img src={AddBoxLine} alt=""></img> </a> </span>
                        <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                      </span>
                    </label>
                    <label htmlFor="function-test" className="s-input">
                      <span>
                        <input type="checkbox" id="function-test" name="ServiceWorkModelaction_function_testServiceTypeaction_work" checked={this.state.ServiceWorkModelaction_function_testServiceTypeaction_work} data-id="action-function-test" onChange={this.openSecondInputs}></input>
                        <span>Action Function Test <a href="/products"> <img src={AddBoxLine} alt=""></img> </a> </span>
                        <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                      </span>
                    </label>
                  </div>

                  <div className="form-group s-form-group sg-group " id="stock-work-inputs">
                    <label className="form-label">Stock Work:</label>
                    <label htmlFor="recoil-installation" className="s-input">
                      <span>
                        <input type="checkbox" id="recoil-installation" name="ServiceWorkModelrecoil_installationServiceTypestock_work" checked={this.state.ServiceWorkModelrecoil_installationServiceTypestock_work} data-id="recoil-hardware" data-id2="recoil-hardware" onChange={this.openSecondInputs}></input>
                        <span>Recoil Pad Installaitons <a href="/products"> <img src={AddBoxLine} alt=""></img> </a> </span>
                        <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                      </span>
                    </label>
                  </div>

                  <div className="form-group s-form-group sg-group" id="finishing-work-inputs">
                    <label className="form-label">Finishing Work:</label>
                    <label htmlFor="recoil-installaton" className="s-input">
                      <span>
                        <input type="radio" id="parkorize" name="ServiceWorkModelfinishing_work_inputsServiceTypefinishing_work" value="parkorize" checked={this.state.ServiceWorkModelfinishing_work_inputsServiceTypefinishing_work === "parkorize"} onChange={this.updateState}></input>
                        <span>Parkorize <a href="/products"> <img src={AddBoxLine} alt=""></img></a> </span>
                        <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                      </span>
                    </label>
                    <label htmlFor="recoil-installaton" className="s-input">
                      <span>
                        <input type="radio" id="cerakote" name="ServiceWorkModelfinishing_work_inputsServiceTypefinishing_work" value="cerakote" checked={this.state.ServiceWorkModelfinishing_work_inputsServiceTypefinishing_work === "cerakote"} onChange={this.updateState}></input>
                        <span>Cerakote <a href="/products"> <img src={AddBoxLine} alt=""></img></a> </span>
                        <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                      </span>
                    </label>
                    <label htmlFor="recoil-installaton" className="s-input">
                      <span>
                        <input type="radio" id="titanium-nitrate" name="ServiceWorkModelfinishing_work_inputsServiceTypefinishing_work" value="Titanium Nitrate" checked={this.state.ServiceWorkModelfinishing_work_inputsServiceTypefinishing_work === "Titanium Nitrate"} onChange={this.updateState}></input>
                        <span>Titanium Nitrate <a href="/products"> <img src={AddBoxLine} alt=""></img> </a> </span>
                        <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                      </span>
                    </label>
                    <label htmlFor="recoil-installaton" className="s-input">
                      <span>
                        <input type="radio" id="engraving" name="ServiceWorkModelfinishing_work_inputsServiceTypefinishing_work" value="engraving" checked={this.state.ServiceWorkModelfinishing_work_inputsServiceTypefinishing_work === "engraving"} onChange={this.updateState}></input>
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
                          <input type="radio" id="11-degree" name="ServiceWorkModelstyle_of_crownWorkbarrel_cutServiceTypebarrel_work" value="11Degree" checked={this.state.ServiceWorkModelstyle_of_crownWorkbarrel_cutServiceTypebarrel_work === "11Degree"} onChange={this.updateState}></input>
                          <span>11 Degree Chamber  </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="standard-recess" className="s-input">
                        <span>
                          <input type="radio" id="standard-recess" name="ServiceWorkModelstyle_of_crownWorkbarrel_cutServiceTypebarrel_work" value="standardRecess" checked={this.state.ServiceWorkModelstyle_of_crownWorkbarrel_cutServiceTypebarrel_work === "standardRecess"} onChange={this.updateState}></input>
                          <span>Standard Recess  </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="100-degree-radius" className="s-input">
                        <span>
                          <input type="radio" id="100-degree-radius" name="ServiceWorkModelstyle_of_crownWorkbarrel_cutServiceTypebarrel_work" value="100DegreeRadius" checked={this.state.ServiceWorkModelstyle_of_crownWorkbarrel_cutServiceTypebarrel_work === "100DegreeRadius"} onChange={this.updateState}></input>
                          <span>10 Degree Radius  </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Final Lenght of Barrel:</label>
                      <input type="text" name="ServiceWorkModelfinal_lenght_of_barrelWorkbarrel_cutServiceTypebarrel_work" value={this.state.ServiceWorkModelfinal_lenght_of_barrelWorkbarrel_cutServiceTypebarrel_work} onChange={this.updateState}></input>
                    </div>
                    <div className="form-group s-form-group " >
                      <label className="form-label">Barrel Threads:</label>
                      <label htmlFor="barrel-threads-1" className="s-input">
                        <span>
                          <input type="radio" id="barrel-threads-1" name="ServiceWorkModelbarrel_threadsWorkbarrel_cutServiceTypebarrel_work" value="barrel-threads-1" onChange={this.updateState} checked={this.state.ServiceWorkModelbarrel_threadsWorkbarrel_cutServiceTypebarrel_work === "barrel-threads-1"}></input>
                          <span>1/2 &times; 28 RH  </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="barrel-threads-2" className="s-input">
                        <span>
                          <input type="radio" id="barrel-threads-2" name="ServiceWorkModelbarrel_threadsWorkbarrel_cutServiceTypebarrel_work" value="barrel-threads-2" onChange={this.updateState} checked={this.state.ServiceWorkModelbarrel_threadsWorkbarrel_cutServiceTypebarrel_work === "barrel-threads-2"}></input>
                          <span>9/16 &times; 24 RH  </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="barrel-threads-3" className="s-input">
                        <span>
                          <input type="radio" id="barrel-threads-3" name="ServiceWorkModelbarrel_threadsWorkbarrel_cutServiceTypebarrel_work" value="barrel-threads-3" onChange={this.updateState} checked={this.state.ServiceWorkModelbarrel_threadsWorkbarrel_cutServiceTypebarrel_work === "barrel-threads-3"}></input>
                          <span>5/8 &times; 24 RH  </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="barrel-threads-4" className="s-input">
                        <span>
                          <input type="radio" id="barrel-threads-4" name="ServiceWorkModelbarrel_threadsWorkbarrel_cutServiceTypebarrel_work" value="barrel-threads-4" onChange={this.updateState} checked={this.state.ServiceWorkModelbarrel_threadsWorkbarrel_cutServiceTypebarrel_work === "barrel-threads-4"}></input>
                          <span>11/16 &times; 24 RH  </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="barrel-threads-5" className="s-input">
                        <span>
                          <input type="radio" id="barrel-threads-5" name="ServiceWorkModelbarrel_threadsWorkbarrel_cutServiceTypebarrel_work" value="barrel-threads-5" onChange={this.updateState} checked={this.state.ServiceWorkModelbarrel_threadsWorkbarrel_cutServiceTypebarrel_work === "barrel-threads-5"}></input>
                          <span>3/4 &times; 24 RH  </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>7
                        </span>
                      </label>
                      <label htmlFor="barrel-threads-6" className="s-input">
                        <span>
                          <input type="radio" id="barrel-threads-6" name="ServiceWorkModelbarrel_threadsWorkbarrel_cutServiceTypebarrel_work" value="barrel-threads-6" onChange={this.updateState} checked={this.state.ServiceWorkModelbarrel_threadsWorkbarrel_cutServiceTypebarrel_work === "barrel-threads-6"}></input>
                          <span>13mm &times; 1 RH  </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="barrel-threads-7" className="s-input">
                        <span>
                          <input type="radio" id="barrel-threads-7" name="ServiceWorkModelbarrel_threadsWorkbarrel_cutServiceTypebarrel_work" value="barrel-threads-7" onChange={this.updateState} checked={this.state.ServiceWorkModelbarrel_threadsWorkbarrel_cutServiceTypebarrel_work === "barrel-threads-7"}></input>
                          <span>14mm &times; 1 RH  </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="barrel-threads-8" className="s-input">
                        <span>
                          <input type="radio" id="barrel-threads-8" name="ServiceWorkModelbarrel_threadsWorkbarrel_cutServiceTypebarrel_work" value="barrel-threads-8" onChange={this.updateState} checked={this.state.ServiceWorkModelbarrel_threadsWorkbarrel_cutServiceTypebarrel_work === "barrel-threads-8"}></input>
                          <span>15mm &times; 1 RH  </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="barrel-threads-9" className="s-input">
                        <span>
                          <input type="radio" id="barrel-threads-9" name="ServiceWorkModelbarrel_threadsWorkbarrel_cutServiceTypebarrel_work" value="barrel-threads-9" onChange={this.updateState} checked={this.state.ServiceWorkModelbarrel_threadsWorkbarrel_cutServiceTypebarrel_work === "barrel-threads-9"}></input>
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
                          <input type="radio" id="traditional" name="ServiceWorkModelswivel_installation_styleWorkswivel_installationServiceTypeframe_work" value="traditional" checked={this.state.ServiceWorkModelswivel_installation_styleWorkswivel_installationServiceTypeframe_work === "traditional"} onChange={this.updateState}></input>
                          <span>Traditional  <a href="/products"> <img src={AddBoxLine} alt=""></img> </a> </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="standard-recess" className="s-input">
                        <span>
                          <input type="radio" id="flush-mount-quick-detach" name="ServiceWorkModelswivel_installation_styleWorkswivel_installationServiceTypeframe_work" value="flush-mount-quick-detach" checked={this.state.ServiceWorkModelswivel_installation_styleWorkswivel_installationServiceTypeframe_work === "flush-mount-quick-detach"} onChange={this.updateState}></input>
                          <span>Flush Mount Quick Detach  <a href="/products"> <img src={AddBoxLine} alt=""></img> </a> </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                    </div>

                    <div className="form-group s-form-group " >
                      <label className="form-label">Hardware:</label>
                      <label htmlFor="provide-my-own" className="s-input">
                        <span>
                          <input type="radio" id="provide-my-own" name="ServiceWorkModelframe_work_hardwareWorkswivel_installationServiceTypeframe_work" value="provide-my-own" onChange={this.updateState} checked={this.state.ServiceWorkModelframe_work_hardwareWorkswivel_installationServiceTypeframe_work === "provide-my-own"}></input>
                          <span>Will provide my own </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="Shop-from-our-store" className="s-input">
                        <span>
                          <input type="radio" id="Shop-from-our-store" name="ServiceWorkModelframe_work_hardwareWorkswivel_installationServiceTypeframe_work" value="Shop-from-our-store" onChange={this.updateState} checked={this.state.ServiceWorkModelframe_work_hardwareWorkswivel_installationServiceTypeframe_work === "Shop-from-our-store"}></input>
                          <span>Shop from our store  <a href="/products"> <img src={AddBoxLine} alt=""></img> </a>  </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="g-group" id="recoil-hardware-handgun/pistol" className="recoil-hardware-pistol">
                    <div className="form-group s-form-group " >
                      <label className="form-label">Hardware:</label>
                      <label htmlFor="provide-my-own" className="s-input">
                        <span>
                          <input type="radio" id="provide-my-own" name="ServiceWorkModelrecoil_hardware_pistolWorkrecoil_installationServiceTypestock_work" value="provide-my-own" onChange={this.updateState} checked={this.state.ServiceWorkModelrecoil_hardware_pistolWorkrecoil_installationServiceTypestock_work === "provide-my-own"}></input>
                          <span>Will provide my own</span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>

                      <label htmlFor="Shop-from-our-store" className="s-input">
                        <span>
                          <input type="radio" id="Shop-from-our-store" name="ServiceWorkModelrecoil_hardware_pistolWorkrecoil_installationServiceTypestock_work" value="Shop-from-our-store" onChange={this.updateState} checked={this.state.ServiceWorkModelrecoil_hardware_pistolWorkrecoil_installationServiceTypestock_work === "Shop-from-our-store"}></input>
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
                          <input type="radio" id="rifle-pad" name="ServiceWorkModelrecoil_hardware_rifleWorkrecoil_installationServiceTypestock_work" checked={this.state.ServiceWorkModelrecoil_hardware_rifleWorkrecoil_installationServiceTypestock_work === "Rifle Pad"} value="Rifle Pad" data-options="rifle-pad-d" onChange={this.openThirdInputs}></input>
                          <span>Rifle Pad</span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="field-pad" className="s-input">
                        <span>
                          <input type="radio" id="field-pad" name="ServiceWorkModelrecoil_hardware_rifleWorkrecoil_installationServiceTypestock_work" checked={this.state.ServiceWorkModelrecoil_hardware_rifleWorkrecoil_installationServiceTypestock_work === "Field Pad"} value="Field Pad" data-options="field-pad-d" onChange={this.openThirdInputs}></input>
                          <span>Field Pad   </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="skeet-pad" className="s-input">
                        <span>
                          <input type="radio" id="skeet-pad" name="ServiceWorkModelrecoil_hardware_rifleWorkrecoil_installationServiceTypestock_work" checked={this.state.ServiceWorkModelrecoil_hardware_rifleWorkrecoil_installationServiceTypestock_work === "Skeet Pad"} value="Skeet Pad" data-options="skeet-pad-d" onChange={this.openThirdInputs}></input>
                          <span>Skeet Pad   </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="trap-pad" className="s-input">
                        <span>
                          <input type="radio" id="trap-pad" name="ServiceWorkModelrecoil_hardware_rifleWorkrecoil_installationServiceTypestock_work" checked={this.state.ServiceWorkModelrecoil_hardware_rifleWorkrecoil_installationServiceTypestock_work === "Trap Pad"} value="Trap Pad" data-options="trap-pad-d" onChange={this.openThirdInputs}></input>
                          <span>Trap Pad   </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                    </div>

                    <div className="form-group s-form-group " id="rifle-pad-d">
                      <label className="form-label">Rifle Pad:</label>
                      <label htmlFor="rifle-pad-1" className="s-input">
                        <span>
                          <input type="radio" id="rifle-pad-1" name="ServiceWorkModelrifle_padWorkrecoil_installationServiceTypestock_work" value="Pachmayr RP200" onChange={this.updateState} checked={this.state.ServiceWorkModelrifle_padWorkrecoil_installationServiceTypestock_work === "Pachmayr RP200"}></input>
                          <span>Pachmayr RP200 </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="rifle-pad-2" className="s-input">
                        <span>
                          <input type="radio" id="rifle-pad-2" name="ServiceWorkModelrifle_padWorkrecoil_installationServiceTypestock_work" value="Pachmayr 500B" onChange={this.updateState} checked={this.state.ServiceWorkModelrifle_padWorkrecoil_installationServiceTypestock_work === "Pachmayr 500B"}></input>
                          <span>Pachmayr 500B </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="rifle-pad-3" className="s-input">
                        <span>
                          <input type="radio" id="rifle-pad-3" name="ServiceWorkModelrifle_padWorkrecoil_installationServiceTypestock_work" value="Pachmayr DP500" onChange={this.updateState} checked={this.state.ServiceWorkModelrifle_padWorkrecoil_installationServiceTypestock_work === "Pachmayr DP500"}></input>
                          <span>Pachmayr DP500 </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                    </div>

                    <div className="form-group s-form-group " id="field-pad-d">
                      <label className="form-label">Field Pad:</label>

                      <label htmlFor="field-pad-1" className="s-input">
                        <span>
                          <input type="radio" id="field-pad-1" name="ServiceWorkModelfield_padWorkrecoil_installationServiceTypestock_work" value="Pachmayr D750B" onChange={this.updateState} checked={this.state.ServiceWorkModelfield_padWorkrecoil_installationServiceTypestock_work === "Pachmayr D750B"}></input>
                          <span>Pachmayr D750B </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="field-pad-2" className="s-input">
                        <span>
                          <input type="radio" id="field-pad-2" name="ServiceWorkModelfield_padWorkrecoil_installationServiceTypestock_work" value="Pachmayr F325" onChange={this.updateState} checked={this.state.ServiceWorkModelfield_padWorkrecoil_installationServiceTypestock_work === "Pachmayr F325"}></input>
                          <span>Pachmayr F325 </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="field-pad-3" className="s-input">
                        <span>
                          <input type="radio" id="field-pad-3" name="ServiceWorkModelfield_padWorkrecoil_installationServiceTypestock_work" value="Pachmayr F250" onChange={this.updateState} checked={this.state.ServiceWorkModelfield_padWorkrecoil_installationServiceTypestock_work === "Pachmayr F250"}></input>
                          <span>Pachmayr F250 </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="field-pad-4" className="s-input">
                        <span>
                          <input type="radio" id="rifle-pad-4" name="ServiceWorkModelfield_padWorkrecoil_installationServiceTypestock_work" value="Pachmayr 752B" onChange={this.updateState} checked={this.state.ServiceWorkModelfield_padWorkrecoil_installationServiceTypestock_work === "Pachmayr 752B"}></input>
                          <span>Pachmayr 752B </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                    </div>

                    <div className="form-group s-form-group " id="skeet-pad-d">
                      <label className="form-label">Skeet Pad:</label>
                      <label htmlFor="skeet-pad-1" className="s-input">
                        <span>
                          <input type="radio" id="skeet-pad-1" name="ServiceWorkModelskeet_padWorkrecoil_installationServiceTypestock_work" value="Pachmayr D752B" onChange={this.updateState} checked={this.state.ServiceWorkModelskeet_padWorkrecoil_installationServiceTypestock_work === "Pachmayr D752B"}></input>
                          <span>Pachmayr D752B </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="skeet-pad-2" className="s-input">
                        <span>
                          <input type="radio" id="skeet-pad-2" name="ServiceWorkModelskeet_padWorkrecoil_installationServiceTypestock_work"  value="Pachmayr SC100" onChange={this.updateState} checked={this.state.ServiceWorkModelskeet_padWorkrecoil_installationServiceTypestock_work === "Pachmayr SC100"}></input>
                          <span>Pachmayr SC100 </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="skeet-pad-3" className="s-input">
                        <span>
                          <input type="radio" id="skeet-pad-3" name="ServiceWorkModelskeet_padWorkrecoil_installationServiceTypestock_work"  value="Pachmayr S325" onChange={this.updateState} checked={this.state.ServiceWorkModelskeet_padWorkrecoil_installationServiceTypestock_work === "Pachmayr S325"}></input>
                          <span>Pachmayr S325 </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                    </div>

                    <div className="form-group s-form-group " id="trap-pad-d">
                      <label className="form-label">Trap Pad:</label>

                      <label htmlFor="trap-pad-1" className="s-input">
                        <span>
                          <input type="radio" id="trap-pad-1" name="ServiceWorkModeltrap_padWorkrecoil_installationServiceTypestock_work" value="Pachmayr XLT 'Ultra Soft' Magnum" onChange={this.updateState} checked={this.state.ServiceWorkModeltrap_padWorkrecoil_installationServiceTypestock_work === "Pachmayr XLT 'Ultra Soft' Magnum"}></input>
                          <span>Pachmayr XLT "Ultra Soft" Magnum </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="trap-pad-2" className="s-input">
                        <span>
                          <input type="radio" id="trap-pad-2" name="ServiceWorkModeltrap_padWorkrecoil_installationServiceTypestock_work" value="Pachmayr D550 Decelerator" onChange={this.updateState} checked={this.state.ServiceWorkModeltrap_padWorkrecoil_installationServiceTypestock_work === "Pachmayr D550 Decelerator"}></input>
                          <span>Pachmayr D550 Decelerator </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="trap-pad-3" className="s-input">
                        <span>
                          <input type="radio" id="trap-pad-3" name="ServiceWorkModeltrap_padWorkrecoil_installationServiceTypestock_work" value="Pachmayr T550" onChange={this.updateState} checked={this.state.ServiceWorkModeltrap_padWorkrecoil_installationServiceTypestock_work === "Pachmayr T550"}></input>
                          <span>Pachmayr T550 </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="g-group" id="new-trigger-installation-handgun/pistol" className="new-trigger-installation-pistol">
                    <div className="form-group s-form-group " >
                      <label className="form-label">Select Model:</label>

                      <label htmlFor="trigger-1" className="s-input">
                        <span>
                          <input type="radio" id="trigger-1" name="ServiceWorkModelselect_modelWorknew_triggerServiceTypeaction_work" value="Smith & Wesson M&P-Apex Trigger" onChange={this.updateState} checked={this.state.ServiceWorkModelselect_modelWorknew_triggerServiceTypeaction_work === "Smith & Wesson M&P-Apex Trigger"}></input>
                          <span> Smith & Wesson M&P-Apex Trigger </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="trigger-2" className="s-input">
                        <span>
                          <input type="radio" id="trigger-2" name="ServiceWorkModelselect_modelWorknew_triggerServiceTypeaction_work" value="SpringFiield- Armory XD Series-Powder river Trigger" onChange={this.updateState} checked={this.state.ServiceWorkModelselect_modelWorknew_triggerServiceTypeaction_work === "SpringFiield- Armory XD Series-Powder river Trigger"}></input>
                          <span>SpringFiield- Armory XD Series-Powder river Trigger</span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>

                      <label htmlFor="trigger-3" className="s-input">
                        <span>
                          <input type="radio" id="trigger-3" name="ServiceWorkModelselect_modelWorknew_triggerServiceTypeaction_work" value="Glock Ghost Connector + Spring" onChange={this.updateState} checked={this.state.ServiceWorkModelselect_modelWorknew_triggerServiceTypeaction_work === "Glock Ghost Connector + Spring"}></input>
                          <span> Glock Ghost Connector + Spring </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>

                      <label htmlFor="trigger-4" className="s-input">
                        <span>
                          <input type="radio" id="trigger-4" name="ServiceWorkModelselect_modelWorknew_triggerServiceTypeaction_work" value="Other" checked={this.state.ServiceWorkModelselect_modelWorknew_triggerServiceTypeaction_work === "Other"} onChange={this.popupOpenM}></input>
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
                          <input type="radio" id="trigger-rifle-1" name="ServiceWorkModelselect_modelWorknew_triggerServiceTypeaction_work" value="IWI TAVOR" onChange={this.updateState} checked={this.state.ServiceWorkModelselect_modelWorknew_triggerServiceTypeaction_work === "IWI TAVOR"}></input>
                          <span> IWI TAVOR </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="trigger-rifle-2" className="s-input">
                        <span>
                          <input type="radio" id="trigger-rifle-2" name="ServiceWorkModelselect_modelWorknew_triggerServiceTypeaction_work" value="FNH USA SCAR 17" onChange={this.updateState} checked={this.state.ServiceWorkModelselect_modelWorknew_triggerServiceTypeaction_work === "FNH USA SCAR 17"}></input>
                          <span> FNH USA SCAR 17 </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="trigger-rifle-3" className="s-input">
                        <span>
                          <input type="radio" id="trigger-rifle-3" name="ServiceWorkModelselect_modelWorknew_triggerServiceTypeaction_work" value="AR Tavga 2 Stage Short Trigger" onChange={this.updateState} checked={this.state.ServiceWorkModelselect_modelWorknew_triggerServiceTypeaction_work === "AR Tavga 2 Stage Short Trigger"}></input>
                          <span> AR Tavga 2 Stage Short Trigger </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="trigger-rifle-4" className="s-input">
                        <span>
                          <input type="radio" id="trigger-rifle-4" name="ServiceWorkModelselect_modelWorknew_triggerServiceTypeaction_work" value="AR 15 competition Trigger" onChange={this.updateState} checked={this.state.ServiceWorkModelselect_modelWorknew_triggerServiceTypeaction_work === "AR 15 competition Trigger"}></input>
                          <span> AR 15 competition Trigger </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="trigger-rifle-5" className="s-input">
                        <span>
                          <input type="radio" id="trigger-rifle-5" name="ServiceWorkModelselect_modelWorknew_triggerServiceTypeaction_work" value="Other" checked={this.state.ServiceWorkModelselect_modelWorknew_triggerServiceTypeaction_work === "Other"} onChange={this.popupOpenM}></input>
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
                          <input type="radio" id="action-function-1" name="ServiceWorkModelselect_modelWorkaction_function_testServiceTypeaction_work" value="Smith & Wesson Model K" onChange={this.updateState} checked={this.state.ServiceWorkModelselect_modelWorkaction_function_testServiceTypeaction_work === "Smith & Wesson Model K"}></input>
                          <span> Smith & Wesson Model K </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="action-function-2" className="s-input">
                        <span>
                          <input type="radio" id="action-function-2" name="ServiceWorkModelselect_modelWorkaction_function_testServiceTypeaction_work" value="Smith & Wesson Model L" onChange={this.updateState} checked={this.state.ServiceWorkModelselect_modelWorkaction_function_testServiceTypeaction_work === "Smith & Wesson Model L"}></input>
                          <span> Smith & Wesson Model L</span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>

                      <label htmlFor="action-function-3" className="s-input">
                        <span>
                          <input type="radio" id="action-function-3" name="ServiceWorkModelselect_modelWorkaction_function_testServiceTypeaction_work" value="Smith & Wesson Model N" onChange={this.updateState} checked={this.state.ServiceWorkModelselect_modelWorkaction_function_testServiceTypeaction_work === "Smith & Wesson Model N"}></input>
                          <span> Smith & Wesson Model N </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>

                      <label htmlFor="action-function-4" className="s-input">
                        <span>
                          <input type="radio" id="action-function-4" name="ServiceWorkModelselect_modelWorkaction_function_testServiceTypeaction_work" value="Roger Blackhawk" onChange={this.updateState} checked={this.state.ServiceWorkModelselect_modelWorkaction_function_testServiceTypeaction_work === "Roger Blackhawk"}></input>
                          <span> Roger Blackhawk </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="action-function-5" className="s-input">
                        <span>
                          <input type="radio" id="action-function-5" name="ServiceWorkModelselect_modelWorkaction_function_testServiceTypeaction_work" value="Roger Redhawk" onChange={this.updateState} checked={this.state.ServiceWorkModelselect_modelWorkaction_function_testServiceTypeaction_work === "Roger Redhawk"}></input>
                          <span> Roger Redhawk </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="action-function-6" className="s-input">
                        <span>
                          <input type="radio" id="action-function-6" name="ServiceWorkModelselect_modelWorkaction_function_testServiceTypeaction_work" value="Roger GPIOD" onChange={this.updateState} checked={this.state.ServiceWorkModelselect_modelWorkaction_function_testServiceTypeaction_work === "Roger GPIOD"}></input>
                          <span> Roger GPIOD </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="action-function-7" className="s-input">
                        <span>
                          <input type="radio" id="action-function-7" name="ServiceWorkModelselect_modelWorkaction_function_testServiceTypeaction_work" value="Other" checked={this.state.ServiceWorkModelselect_modelWorkaction_function_testServiceTypeaction_work === "Other"} onChange={this.popupOpenM}></input>
                          <span> Other </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                    </div>
                  </div>
                  <button type="button" name="button" onClick={this.handleSubmit}>Get Quote & Repair Time</button>
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
