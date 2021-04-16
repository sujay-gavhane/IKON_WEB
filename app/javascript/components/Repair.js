import React from "react"
import PropTypes from "prop-types"
import InformationLine from 'images/information-line.png'
import AddBoxLine from 'images/add-box-line.png'
class Repair extends React.Component {
  state = {
    firearmType: "rifle",
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
  }

  componentDidMount() {
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
    document.getElementById("frame-work").checked = false;
    document.getElementById("barrel-work").checked = false;
    document.getElementById("action-work").checked = false;
    document.getElementById("stock-work").checked = false;
    document.getElementById("finishing-work").checked = false;
    // document.getElementById("checkbox").checked = false;
  }

  openInputs(){
    this.updateState(event)
    var id = event.target.id
    if (document.getElementById(id).checked ) {
      document.getElementById(id+"-inputs").style.display="flex";
    }else{
      document.getElementById(id+"-inputs").style.display="none";
    }
  }

  openThirdInputs(){
    this.updateState(event)
    var idM = event.target.dataset.options
    document.getElementById("rifle-pad-d").style.display="none";
    document.getElementById("field-pad-d").style.display="none";
    document.getElementById("skeet-pad-d").style.display="none";
    document.getElementById("trap-pad-d").style.display="none";
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

  render () {
    return (
      <React.Fragment>
        <main className="cart-m quote-form-m">
          <form className="" action="index.html" method="post">
            <div className="cart-d active" id="">
              <div className="cart-top">
                <h1><span>Select from our gunsmithing services</span> </h1>
              </div>

              <div className="quote-form-d">
                <div className="options-form-fields">
                  <div className="form-group">
                    <label className="form-label">Select Type of Firearm:</label>
                    <select className="" value={this.state.firearmType} name="firearmType" id="type-of-firearm" onChange={this.reloadThis}>
                      <option value="rifle">Rifle</option>
                      <option value="shotgun">Shotgun</option>
                      <option value="pistol">Handgun/Pistol</option>
                      <option value="nfa">NFA</option>
                    </select>
                  </div>

                  <div className="form-group s-form-group ">
                    <label className="form-label">Select Gunsmith Service:</label>
                    <label htmlFor="frame-work" className="s-input">
                      <span>
                        <input type="checkbox" id="frame-work" name="frameWork" checked={this.state.frameWork} onChange={this.openInputs}></input>
                        <span>Frame/Reciever Work</span>
                        <span className="info"><img src={InformationLine} alt="" title="Includes Scope mounting, swivel installation, Glass and Pillar bed, Grip work"></img></span>
                      </span>
                    </label>
                    <label htmlFor="barrel-work" className="s-input">
                      <span>
                        <input type="checkbox" id="barrel-work" name="barrelWork" checked={this.state.barrelWork} onChange={this.openInputs}></input>
                        <span>Barrel Work</span>
                        <span className="info"><img src={InformationLine} alt="" title="Includes Cut, Crown, Threading pin & weld, barrel change"></img></span>
                      </span>
                    </label>
                    <label htmlFor="action-work" className="s-input">
                      <span>
                        <input type="checkbox" id="action-work" name="actionWork" checked={this.state.actionWork} onChange={this.openInputs}></input>
                        <span>Action Work</span>
                        <span className="info"><img src={InformationLine} alt="" title="Includes trigger installations, Action Cleanin, Lubricate, Function test"></img></span>
                      </span>
                    </label>
                    <label htmlFor="stock-work" className="s-input">
                      <span>
                        <input type="checkbox" id="stock-work" name="stockWork" checked={this.state.stockWork} onChange={this.openInputs}></input>
                        <span>Stock Work</span>
                        <span className="info"><img src={InformationLine} alt="" title="Recoil Pad Installations"></img></span>
                      </span>
                    </label>
                    <label htmlFor="finishing-work" className="s-input">
                      <span>
                        <input type="checkbox" id="finishing-work" name="finishingWork" checked={this.state.finishingWork} onChange={this.openInputs}></input>
                        <span>Finishing Work</span>
                        <span className="info"><img src={InformationLine} alt="" title="Pakoreize, Cerakole Coating, Titanium Nitrate (Parts only)"></img></span>
                      </span>
                    </label>
                  </div>

                  <div className="form-group s-form-group sg-group " id="frame-work-inputs">
                    <label className="form-label">Frame Reciever Work:</label>
                    <label htmlFor="scoup-installation" className="s-input">
                      <span>
                        <input type="checkbox" id="scoup-installation" name="scoupInstallation" checked={this.state.scoupInstallation} onChange={this.updateState}></input>
                        <span>Scoup/Sight Installation <a href="/products"> <img src={AddBoxLine} alt=""></img></a> </span>
                        <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                      </span>
                    </label>
                    <label htmlFor="swivel-installation" className="s-input">
                      <span>
                        <input type="checkbox" id="swivel-installation" name="swivelInstallation" checked={this.state.swivelInstallation} data-id="swivel-installation-style" onChange={this.openSecondInputs}></input>
                        <span>Swivel Installation <a href="/products"> <img src={AddBoxLine} alt=""></img> </a> </span>
                        <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                      </span>
                    </label>
                    <label htmlFor="glass-bed" className="s-input">
                      <span>
                        <input type="checkbox" id="glass-bed" checked={this.state.glassBed} name="glassBed" onChange={this.updateState}></input>
                        <span>Glass Bed <a href="/products"> <img src={AddBoxLine} alt=""></img> </a> </span>
                        <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                      </span>
                    </label>
                    <label htmlFor="grip-work" className="s-input">
                      <span>
                        <input type="checkbox" id="grip-work" checked={this.state.gripWork} name="gripWork" onChange={this.updateState}></input>
                        <span>Grip Work <a href="/products"> <img src={AddBoxLine} alt=""></img> </a> </span>
                        <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                      </span>
                    </label>
                  </div>

                  <div className="form-group s-form-group sg-group " id="barrel-work-inputs">
                    <label className="form-label">Barrel Work:</label>
                    <label htmlFor="barrel-cut" className="s-input">
                      <span>
                        <input type="checkbox" id="barrel-cut" name="barrelCut" checked={this.state.barrelCut} data-id="style-of-crown" onChange={this.openSecondInputs}></input>
                        <span>Barrel Cut + Crown + Threading   <a href="/products"> <img src={AddBoxLine} alt=""></img> </a> </span>
                        <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                      </span>
                    </label>
                    <label htmlFor="barrel-pin" className="s-input">
                      <span>
                        <input type="checkbox" id="barrel-pin" name="barrelPin" checked={this.state.barrelPin} onChange={this.updateState}></input>
                        <span>Barrel Pin + Weld <a href="/products"> <img src={AddBoxLine} alt=""></img> </a> </span>
                        <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                      </span>
                    </label>
                    <label htmlFor="barrel-change" className="s-input">
                      <span>
                        <input type="checkbox" id="barrel-change" name="barrelChange" checked={this.state.barrelChange} onChange={this.updateState}></input>
                        <span>Barrel Change <a href="/products"> <img src={AddBoxLine} alt=""></img> </a> </span>
                        <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                      </span>
                    </label>
                    <label htmlFor="barrel-re-threading" className="s-input">
                      <span>
                        <input type="checkbox" id="barrel-re-threading" name="barrelReThreading" checked={this.state.barrelReThreading} onChange={this.updateState}></input>
                        <span>Barrel Re-Threading "FIX" <a href="/products"> <img src={AddBoxLine} alt=""></img> </a> </span>
                        <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                      </span>
                    </label>
                    <label htmlFor="barrel-lengthen" className="s-input">
                      <span>
                        <input type="checkbox" id="barrel-lengthen" name="barrelLengthen" checked={this.state.barrelLengthen} onChange={this.updateState}></input>
                        <span>Barrel Lengthen Forcing Cone <a href="/products"> <img src={AddBoxLine} alt=""></img> </a> </span>
                        <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                      </span>
                    </label>
                    <label htmlFor="barrel-porting" className="s-input">
                      <span>
                        <input type="checkbox" id="barrel-porting" name="barrelPorting" checked={this.state.barrelPorting} onChange={this.updateState}></input>
                        <span>Barrel Porting <a href="/products"> <img src={AddBoxLine} alt=""></img> </a> </span>
                        <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                      </span>
                    </label>
                  </div>

                  <div className="form-group s-form-group sg-group " id="action-work-inputs">
                    <label className="form-label">Action Work: </label>
                    <label htmlFor="new-trigger" className="s-input">
                      <span>
                        <input type="checkbox" id="new-trigger" name="newTrigger" checked={this.state.newTrigger} data-id="new-trigger-installation" data-id2="new-trigger-installation" onChange={this.openSecondInputs}></input>
                        <span>New Trigger Installation <a href="/products"> <img src={AddBoxLine} alt=""></img> </a> </span>
                        <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                      </span>
                    </label>
                    <label htmlFor="function-test" className="s-input">
                      <span>
                        <input type="checkbox" id="function-test" name="functionTest" checked={this.state.functionTest} data-id="action-function-test" onChange={this.openSecondInputs}></input>
                        <span>Action Function Test <a href="/products"> <img src={AddBoxLine} alt=""></img> </a> </span>
                        <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                      </span>
                    </label>
                  </div>

                  <div className="form-group s-form-group sg-group " id="stock-work-inputs">
                    <label className="form-label">Stock Work:</label>
                    <label htmlFor="recoil-installation" className="s-input">
                      <span>
                        <input type="checkbox" id="recoil-installation" name="recoilInstallation" checked={this.state.recoilInstallation} data-id="recoil-hardware" data-id2="recoil-hardware" onChange={this.openSecondInputs}></input>
                        <span>Recoil Pad Installaitons <a href="/products"> <img src={AddBoxLine} alt=""></img> </a> </span>
                        <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                      </span>
                    </label>
                  </div>

                  <div className="form-group s-form-group sg-group" id="finishing-work-inputs">
                    <label className="form-label">Finishing Work:</label>
                    <label htmlFor="recoil-installaton" className="s-input">
                      <span>
                        <span>Parkorize <a href="/products"> <img src={AddBoxLine} alt=""></img></a> </span>
                        <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                      </span>
                    </label>
                    <label htmlFor="recoil-installaton" className="s-input">
                      <span>
                        <span>Cerakote <a href="/products"> <img src={AddBoxLine} alt=""></img></a> </span>
                        <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                      </span>
                    </label>
                    <label htmlFor="recoil-installaton" className="s-input">
                      <span>
                        <span>Titanium Nitrate <a href="/products"> <img src={AddBoxLine} alt=""></img> </a> </span>
                        <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                      </span>
                    </label>
                    <label htmlFor="recoil-installaton" className="s-input">
                      <span>
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
                          <input type="radio" id="11-degree" name="styleOfCrown" value="11Degree" checked={this.state.styleOfCrown === "11Degree"} onChange={this.updateState}></input>
                          <span>11 Degree Chamber  </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="standard-recess" className="s-input">
                        <span>
                          <input type="radio" id="standard-recess" name="styleOfCrown" value="standardRecess" checked={this.state.styleOfCrown === "standardRecess"} onChange={this.updateState}></input>
                          <span>Standard Recess  </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="100-degree-radius" className="s-input">
                        <span>
                          <input type="radio" id="100-degree-radius" name="styleOfCrown" value="100DegreeRadius" checked={this.state.styleOfCrown === "100DegreeRadius"} onChange={this.updateState}></input>
                          <span>10 Degree Radius  </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Final Lenght of Barrel:</label>
                      <input type="text" name="finalLenghtOfBarrel" value={this.state.finalLenghtOfBarrel} onChange={this.updateState}></input>
                    </div>
                    <div className="form-group s-form-group " >
                      <label className="form-label">Barrel Threads:</label>
                      <label htmlFor="barrel-threads-1" className="s-input">
                        <span>
                          <input type="radio" id="barrel-threads-1" name="barrelThreads" value="barrel-threads-1" onChange={this.updateState} checked={this.state.barrelThreads === "barrel-threads-1"}></input>
                          <span>1/2 &times; 28 RH  </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="barrel-threads-2" className="s-input">
                        <span>
                          <input type="radio" id="barrel-threads-2" name="barrelThreads" value="barrel-threads-2" onChange={this.updateState} checked={this.state.barrelThreads === "barrel-threads-2"}></input>
                          <span>9/16 &times; 24 RH  </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="barrel-threads-3" className="s-input">
                        <span>
                          <input type="radio" id="barrel-threads-3" name="barrelThreads" value="barrel-threads-3" onChange={this.updateState} checked={this.state.barrelThreads === "barrel-threads-3"}></input>
                          <span>5/8 &times; 24 RH  </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="barrel-threads-4" className="s-input">
                        <span>
                          <input type="radio" id="barrel-threads-4" name="barrelThreads" value="barrel-threads-4" onChange={this.updateState} checked={this.state.barrelThreads === "barrel-threads-4"}></input>
                          <span>11/16 &times; 24 RH  </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="barrel-threads-5" className="s-input">
                        <span>
                          <input type="radio" id="barrel-threads-5" name="barrelThreads" value="barrel-threads-5" onChange={this.updateState} checked={this.state.barrelThreads === "barrel-threads-5"}></input>
                          <span>3/4 &times; 24 RH  </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>7
                        </span>
                      </label>
                      <label htmlFor="barrel-threads-6" className="s-input">
                        <span>
                          <input type="radio" id="barrel-threads-6" name="barrelThreads" value="barrel-threads-6" onChange={this.updateState} checked={this.state.barrelThreads === "barrel-threads-6"}></input>
                          <span>13mm &times; 1 RH  </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="barrel-threads-7" className="s-input">
                        <span>
                          <input type="radio" id="barrel-threads-7" name="barrelThreads" value="barrel-threads-7" onChange={this.updateState} checked={this.state.barrelThreads === "barrel-threads-7"}></input>
                          <span>14mm &times; 1 RH  </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="barrel-threads-8" className="s-input">
                        <span>
                          <input type="radio" id="barrel-threads-8" name="barrelThreads" value="barrel-threads-8" onChange={this.updateState} checked={this.state.barrelThreads === "barrel-threads-8"}></input>
                          <span>15mm &times; 1 RH  </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="barrel-threads-9" className="s-input">
                        <span>
                          <input type="radio" id="barrel-threads-9" name="barrelThreads" value="barrel-threads-9" onChange={this.updateState} checked={this.state.barrelThreads === "barrel-threads-9"}></input>
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
                          <input type="radio" id="traditional" name="swivelInstallationStyle" value="traditional" checked={this.state.swivelInstallationStyle === "traditional"} onChange={this.updateState}></input>
                          <span>Traditional  <a href="/products"> <img src={AddBoxLine} alt=""></img> </a> </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="standard-recess" className="s-input">
                        <span>
                          <input type="radio" id="flush-mount-quick-detach" name="swivelInstallationStyle" value="flush-mount-quick-detach" checked={this.state.swivelInstallationStyle === "flush-mount-quick-detach"} onChange={this.updateState}></input>
                          <span>Flush Mount Quick Detach  <a href="/products"> <img src={AddBoxLine} alt=""></img> </a> </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                    </div>

                    <div className="form-group s-form-group " >
                      <label className="form-label">Hardware:</label>
                      <label htmlFor="provide-my-own" className="s-input">
                        <span>
                          <input type="radio" id="provide-my-own" name="hardware" value="provide-my-own" onChange={this.updateState} checked={this.state.hardware === "provide-my-own"}></input>
                          <span>Will provide my own </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="Shop-from-our-store" className="s-input">
                        <span>
                          <input type="radio" id="Shop-from-our-store" name="hardware" value="Shop-from-our-store" onChange={this.updateState} checked={this.state.hardware === "Shop-from-our-store"}></input>
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
                          <input type="radio" id="provide-my-own" name="recoilHardwarePistol" value="provide-my-own" onChange={this.updateState} checked={this.state.recoilHardwarePistol === "provide-my-own"}></input>
                          <span>Will provide my own</span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>

                      <label htmlFor="Shop-from-our-store" className="s-input">
                        <span>
                          <input type="radio" id="Shop-from-our-store" name="recoilHardwarePistol" value="Shop-from-our-store" onChange={this.updateState} checked={this.state.recoilHardwarePistol === "Shop-from-our-store"}></input>
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
                          <input type="radio" id="rifle-pad" name="recoilHardwareRifle" checked={this.state.recoilHardwareRifle === "rifle-pad"} value="rifle-pad" data-options="rifle-pad-d" onChange={this.openThirdInputs}></input>
                          <span>Rifle Pad</span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="field-pad" className="s-input">
                        <span>
                          <input type="radio" id="field-pad" name="recoilHardwareRifle" checked={this.state.recoilHardwareRifle === "field-pad"} value="field-pad" data-options="field-pad-d" onChange={this.openThirdInputs}></input>
                          <span>Field Pad   </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="skeet-pad" className="s-input">
                        <span>
                          <input type="radio" id="skeet-pad" name="recoilHardwareRifle" checked={this.state.recoilHardwareRifle === "skeet-pad"} value="skeet-pad" data-options="skeet-pad-d" onChange={this.openThirdInputs}></input>
                          <span>Skeet Pad   </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="trap-pad" className="s-input">
                        <span>
                          <input type="radio" id="trap-pad" name="recoilHardwareRifle" checked={this.state.recoilHardwareRifle === "trap-pad"} value="trap-pad" data-options="trap-pad-d" onChange={this.openThirdInputs}></input>
                          <span>Trap Pad   </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                    </div>

                    <div className="form-group s-form-group " id="rifle-pad-d">
                      <label className="form-label">Rifle Pad:</label>
                      <label htmlFor="rifle-pad-1" className="s-input">
                        <span>
                          <input type="radio" id="rifle-pad-1" name="riflePad" value="rifle-pad-1" onChange={this.updateState} checked={this.state.riflePad === "rifle-pad-1"}></input>
                          <span>Pachmayr RP200 </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="rifle-pad-2" className="s-input">
                        <span>
                          <input type="radio" id="rifle-pad-2" name="riflePad" value="rifle-pad-2" onChange={this.updateState} checked={this.state.riflePad === "rifle-pad-2"}></input>
                          <span>Pachmayr 500B </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="rifle-pad-3" className="s-input">
                        <span>
                          <input type="radio" id="rifle-pad-3" name="riflePad" value="rifle-pad-3" onChange={this.updateState} checked={this.state.riflePad === "rifle-pad-3"}></input>
                          <span>Pachmayr DP500 </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                    </div>

                    <div className="form-group s-form-group " id="field-pad-d">
                      <label className="form-label">Field Pad:</label>

                      <label htmlFor="rifle-pad-1" className="s-input">
                        <span>
                          <input type="radio" id="Pachmayr" name="fieldPad" value="PachmayrD750B" onChange={this.updateState} checked={this.state.fieldPad === "PachmayrD750B"}></input>
                          <span>Pachmayr D750B </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="rifle-pad-2" className="s-input">
                        <span>
                          <input type="radio" id="rifle-pad-2" name="fieldPad" value="PachmayrF325" onChange={this.updateState} checked={this.state.fieldPad === "PachmayrF325"}></input>
                          <span>Pachmayr F325 </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="rifle-pad-3" className="s-input">
                        <span>
                          <input type="radio" id="rifle-pad-3" name="fieldPad" value="PachmayrF250" onChange={this.updateState} checked={this.state.fieldPad === "PachmayrF250"}></input>
                          <span>Pachmayr F250 </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="rifle-pad-4" className="s-input">
                        <span>
                          <input type="radio" id="rifle-pad-4" name="fieldPad" value="Pachmayr752B" onChange={this.updateState} checked={this.state.fieldPad === "Pachmayr752B"}></input>
                          <span>Pachmayr 752B </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                    </div>

                    <div className="form-group s-form-group " id="skeet-pad-d">
                      <label className="form-label">Skeet Pad:</label>
                      <label htmlFor="skeet-pad-1" className="s-input">
                        <span>
                          <input type="radio" id="skeet-pad-1" name="skeetPad" value="skeet-pad-1" onChange={this.updateState} checked={this.state.skeetPad === "skeet-pad-1"}></input>
                          <span>Pachmayr D752B </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="skeet-pad-2" className="s-input">
                        <span>
                          <input type="radio" id="skeet-pad-2" name="skeetPad"  value="skeet-pad-2" onChange={this.updateState} checked={this.state.skeetPad === "skeet-pad-2"}></input>
                          <span>Pachmayr SC100 </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="skeet-pad-3" className="s-input">
                        <span>
                          <input type="radio" id="skeet-pad-3" name="skeetPad"  value="skeet-pad-3" onChange={this.updateState} checked={this.state.skeetPad === "skeet-pad-3"}></input>
                          <span>Pachmayr S325 </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                    </div>

                    <div className="form-group s-form-group " id="trap-pad-d">
                      <label className="form-label">Trap Pad:</label>

                      <label htmlFor="trap-pad-1" className="s-input">
                        <span>
                          <input type="radio" id="trap-pad-1" name="trapPad" value="skeet-pad-3" onChange={this.updateState} checked={this.state.trapPad === "trap-pad-1"}></input>
                          <span>Pachmayr XLT "Ultra Soft" Magnum </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="trap-pad-2" className="s-input">
                        <span>
                          <input type="radio" id="trap-pad-2" name="trapPad" value="skeet-pad-3" onChange={this.updateState} checked={this.state.trapPad === "trap-pad-2"}></input>
                          <span>Pachmayr D550 Decelerator </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="trap-pad-3" className="s-input">
                        <span>
                          <input type="radio" id="trap-pad-3" name="trapPad" value="skeet-pad-3" onChange={this.updateState} checked={this.state.trapPad === "trap-pad-3"}></input>
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
                          <input type="radio" id="trigger-1" name="newTriggerInstallationPistol" value="trigger-1" onChange={this.updateState} checked={this.state.newTriggerInstallationPistol === "trigger-1"}></input>
                          <span> Smith & Wesson M&P-Apex Trigger </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="trigger-2" className="s-input">
                        <span>
                          <input type="radio" id="trigger-2" name="newTriggerInstallationPistol" value="trigger-2" onChange={this.updateState} checked={this.state.newTriggerInstallationPistol === "trigger-2"}></input>
                          <span>SpringFiield- Armory XD Series-Powder river Trigger</span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>

                      <label htmlFor="trigger-3" className="s-input">
                        <span>
                          <input type="radio" id="trigger-3" name="newTriggerInstallationPistol" value="trigger-3" onChange={this.updateState} checked={this.state.newTriggerInstallationPistol === "trigger-3"}></input>
                          <span> Glock Ghost Connector + Spring </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>

                      <label htmlFor="trigger-4" className="s-input">
                        <span>
                          <input type="radio" id="trigger-4" name="newTriggerInstallationPistol" value="trigger-4" checked={this.state.newTriggerInstallationPistol === "trigger-4"} onChange={this.popupOpenM}></input>
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
                          <input type="radio" id="trigger-rifle-1" name="newtriggerInstallationRifle" value="trigger-rifle-1" onChange={this.updateState} checked={this.state.newtriggerInstallationRifle === "trigger-rifle-1"}></input>
                          <span> IWI TAVOR </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="trigger-rifle-2" className="s-input">
                        <span>
                          <input type="radio" id="trigger-rifle-2" name="newtriggerInstallationRifle" value="trigger-rifle-2" onChange={this.updateState} checked={this.state.newtriggerInstallationRifle === "trigger-rifle-2"}></input>
                          <span> FNH USA SCAR 17 </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="trigger-rifle-3" className="s-input">
                        <span>
                          <input type="radio" id="trigger-rifle-3" name="newtriggerInstallationRifle" value="trigger-rifle-3" onChange={this.updateState} checked={this.state.newtriggerInstallationRifle === "trigger-rifle-3"}></input>
                          <span> AR Tavga 2 Stage Short Trigger </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="trigger-rifle-4" className="s-input">
                        <span>
                          <input type="radio" id="trigger-rifle-4" name="newtriggerInstallationRifle" value="trigger-rifle-4" onChange={this.updateState} checked={this.state.newtriggerInstallationRifle === "trigger-rifle-4"}></input>
                          <span> AR 15 competition Trigger </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="trigger-rifle-5" className="s-input">
                        <span>
                          <input type="radio" id="trigger-rifle-5" name="newtriggerInstallationRifle" value="trigger-rifle-5" checked={this.state.newtriggerInstallationRifle === "trigger-rifle-5"} onChange={this.popupOpenM}></input>
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
                          <input type="radio" id="action-function-1" name="actionFunctionTest" value="action-function-1" onChange={this.updateState} checked={this.state.actionFunctionTest === "action-function-1"}></input>
                          <span> Smith & Wesson Model K </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="action-function-2" className="s-input">
                        <span>
                          <input type="radio" id="action-function-2" name="actionFunctionTest" value="action-function-2" onChange={this.updateState} checked={this.state.actionFunctionTest === "action-function-2"}></input>
                          <span>Smith & Wesson Model L</span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>

                      <label htmlFor="action-function-3" className="s-input">
                        <span>
                          <input type="radio" id="action-function-3" name="actionFunctionTest" value="action-function-3" onChange={this.updateState} checked={this.state.actionFunctionTest === "action-function-3"}></input>
                          <span> Smith & Wesson Model N </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>

                      <label htmlFor="action-function-4" className="s-input">
                        <span>
                          <input type="radio" id="action-function-4" name="actionFunctionTest" value="action-function-4" onChange={this.updateState} checked={this.state.actionFunctionTest === "action-function-4"}></input>
                          <span> Roger Blackhawk </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="action-function-5" className="s-input">
                        <span>
                          <input type="radio" id="action-function-5" name="actionFunctionTest" value="action-function-5" onChange={this.updateState} checked={this.state.actionFunctionTest === "action-function-5"}></input>
                          <span> Roger Redhawk </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="action-function-6" className="s-input">
                        <span>
                          <input type="radio" id="action-function-6" name="actionFunctionTest" value="action-function-6" onChange={this.updateState} checked={this.state.actionFunctionTest === "action-function-6"}></input>
                          <span> Roger GPIOD </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                      <label htmlFor="action-function-7" className="s-input">
                        <span>
                          <input type="radio" id="action-function-7" name="actionFunctionTest" value="action-function-7" checked={this.state.actionFunctionTest === "action-function-7"} onChange={this.popupOpenM}></input>
                          <span> Other </span>
                          <span className="info"><img src={InformationLine} alt="" title="xyz"></img></span>
                        </span>
                      </label>
                    </div>
                  </div>
                  <button type="button" name="button">Get Quote</button>
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
