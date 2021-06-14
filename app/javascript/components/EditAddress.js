import React from "react"
import PropTypes from "prop-types"
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

class EditAddress extends React.Component {
  state = {
    options: [],
    userInput: '',
    address_line_one: '',
    address_line_two: '',
    city: '',
    state: '',
    country: '',
    pincode: ''
  };

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setCsrfToken = this.setCsrfToken.bind(this);
    this.popupClose = this.popupClose.bind(this);
  }

  componentDidMount() {
    this.setCsrfToken();
  }

  getSchema(){
    return yup.object().shape({
      address_line_one: yup.string().required('Address Line 1 is Required'),
      city: yup.string().required('City is Required'),
      state: yup.string().required('State is Required'),
      country: yup.string().required('Country is Required'),
      pincode: yup.number('Enter number value').required('Pincode is Required')
    });
  }

  handleChange = (values) => {
    this.setState({ [event.target.name]: event.target.value })
    this.setState({ address_line_one: values.address_line_one })
    this.setState({ address_line_two: values.address_line_two })
    this.setState({ city: values.city })
    this.setState({ state: values.state })
    this.setState({ country: values.country })
    this.setState({ pincode: values.pincode })
    // this.props.onEditChange(event.target.name, event.target.value)
  }

  setCsrfToken() {
    const csrfToken = document.querySelector("meta[name=csrf-token]").content
    axios.defaults.headers.common['X-CSRF-Token'] = csrfToken
  }

  handleSubmit(event) {
    const userInputs = {
      address_line_one: this.state.address_line_one || this.props.properties.address_line_one,
      address_line_two: this.state.address_line_two || this.props.properties.address_line_two,
      city: this.state.city || this.props.properties.city,
      state: this.state.state || this.props.properties.state,
      country: this.state.country || this.props.properties.country,
      pincode: this.state.pincode || this.props.properties.pincode
    }
    axios
      .put("/addresses/" + this.props.properties.id + ".json", userInputs)
        .then(res => {
          this.setState({ msg: res.data.msg, errors: res.data.errors })
          if(res.data.msg != ''){
            this.props.updateAddressList()
            this.popupClose()
          }
        })
       .catch(err => {
           console.log(err);
           return null;
       });
    
  }

  popupClose(){
    this.props.setPopupProps('showEditForm', 'close')
    this.props.setPopupProps('properties', {})
  }

  render () {
    return (
      <React.Fragment>
        <Formik
          initialValues={{
            address_line_one: this.props.properties.address_line_one,
            address_line_two: this.props.properties.address_line_two,
            state: this.props.properties.state,
            city: this.props.properties.city,
            country: this.props.properties.country,
            pincode: this.props.properties.pincode
          }}
          onSubmit={(values, formikBag) => {
            this.handleChange(values)
            this.handleSubmit();
            formikBag.resetForm();
          }}
          validationSchema={this.getSchema()}
          enableReinitialize
        >
        {({errors, touched, values}) => (
          <main className={this.props.showEditForm + " popup-main"}>
            <div className="popup-div">
              <a onClick={this.popupClose} className="close-btn"> <span></span> </a>
              <div className="repair-form">
                <Form>
                  <div className="form-group">
                    <label className="form-label">Address Line 1</label>
                    <Field name="address_line_one" placeholder="Address Line One"/>
                    <ErrorMessage name="address_line_one" render={msg => <div className="color-red">{msg}</div>}/>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Address Line 2</label>
                    <Field name="address_line_two" placeholder="Address Line Two"/>
                    <ErrorMessage name="address_line_two" render={msg => <div className="color-red">{msg}</div>}/>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Postal Code</label>
                    <Field name="pincode" placeholder="Pincode"/>
                    <ErrorMessage name="pincode" render={msg => <div className="color-red">{msg}</div>}/>
                  </div>
                  <div className="form-group">
                    <label className="form-label">City</label>
                    <Field name="city" placeholder="City"/>
                    <ErrorMessage name="city" render={msg => <div className="color-red">{msg}</div>}/>
                  </div>
                  <div className="form-group">
                    <label className="form-label">State</label>
                    <Field name="state" placeholder="State"/>
                    <ErrorMessage name="state" render={msg => <div className="color-red">{msg}</div>}/>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Country</label>
                    <Field name="country" as="select">
                      <option value="">Choose Country</option>
                      <option value="AF">AFGHANISTAN</option>
                      <option value="AX">ALAND ISLANDS</option>
                      <option value="AL">ALBANIA</option>
                      <option value="DZ">ALGERIA</option>
                      <option value="AS">AMERICAN SAMOA</option>
                      <option value="AD">ANDORRA</option>
                      <option value="AO">ANGOLA</option>
                      <option value="AI">ANGUILLA</option>
                      <option value="AQ">ANTARCTICA</option>
                      <option value="AG">ANTIGUA / BARBUDA</option>
                      <option value="AR">ARGENTINA</option>
                      <option value="AM">ARMENIA</option>
                      <option value="AW">ARUBA</option>
                      <option value="AU">AUSTRALIA</option>
                      <option value="CX">AUSTRALIA (CHRISTMAS ISLANDS)</option>
                      <option value="CC">AUSTRALIA (COCOS KEELING ISLANDS)</option>
                      <option value="NF">AUSTRALIA (NORFOLK ISLANDS)</option>
                      <option value="AT">AUSTRIA</option>
                      <option value="AZ">AZERBAIJAN</option>
                      <option value="BS">BAHAMAS</option>
                      <option value="BH">BAHRAIN</option>
                      <option value="BD">BANGLADESH</option>
                      <option value="BB">BARBADOS</option>
                      <option value="BY">BELARUS</option>
                      <option value="BE">BELGIUM</option>
                      <option value="BZ">BELIZE</option>
                      <option value="BJ">BENIN</option>
                      <option value="BM">BERMUDA</option>
                      <option value="BT">BHUTAN</option>
                      <option value="BO">BOLIVIA</option>
                      <option value="XB">BONAIRE (NETHERLANDS ANTILLES)</option>
                      <option value="BA">BOSNIA / HERZEGOVINA</option>
                      <option value="BW">BOTSWANA</option>
                      <option value="BV">BOUVET ISLAND</option>
                      <option value="BR">BRAZIL</option>
                      <option value="IO">BRITISH INDIAN OCEAN TERRITORY</option>
                      <option value="BN">BRUNEI</option>
                      <option value="BG">BULGARIA</option>
                      <option value="BF">BURKINA FASO</option>
                      <option value="BI">BURUNDI</option>
                      <option value="KH">CAMBODIA</option>
                      <option value="CM">CAMEROON</option>
                      <option value="CA">CANADA</option>
                      <option value="IC">CANARY ISLANDS</option>
                      <option value="CV">CAPE VERDE</option>
                      <option value="KY">CAYMAN ISLANDS</option>
                      <option value="CF">CENTRAL AFRICAN REPUBLIC</option>
                      <option value="TD">CHAD</option>
                      <option value="CL">CHILE</option>
                      <option value="CN">CHINA</option>
                      <option value="CO">COLOMBIA</option>
                      <option value="KM">COMOROS</option>
                      <option value="CG">CONGO</option>
                      <option value="CD">CONGO, DEMOCRATIC REPUBLIC OF THE</option>
                      <option value="CK">COOK ISLANDS</option>
                      <option value="CR">COSTA RICA</option>
                      <option value="HR">CROATIA</option>
                      <option value="CU">CUBA</option>
                      <option value="CW">CURACAO</option>
                      <option value="CY">CYPRUS</option>
                      <option value="CZ">CZECH REPUBLIC</option>
                      <option value="DK">DENMARK</option>
                      <option value="DJ">DJIBOUTI</option>
                      <option value="DM">DOMINICA</option>
                      <option value="DO">DOMINICAN REPUBLIC</option>
                      <option value="TL">EAST TIMOR</option>
                      <option value="EC">ECUADOR</option>
                      <option value="EG">EGYPT</option>
                      <option value="SV">EL SALVADOR</option>
                      <option value="ER">ERITREA</option>
                      <option value="EE">ESTONIA</option>
                      <option value="ET">ETHIOPIA</option>
                      <option value="FK">FALKLAND ISLANDS (MALVINAS)</option>
                      <option value="FO">FAROE ISLANDS</option>
                      <option value="FJ">FIJI</option>
                      <option value="WF">FIJI (WALLIS / FUTUNA ISLANDS)</option>
                      <option value="FI">FINLAND</option>
                      <option value="FR">FRANCE</option>
                      <option value="GF">FRENCH GUYANA</option>
                      <option value="PF">FRENCH POLYNESIA</option>
                      <option value="TF">FRENCH SOUTHERN TERRITORIES</option>
                      <option value="GA">GABON</option>
                      <option value="GM">GAMBIA</option>
                      <option value="GE">GEORGIA</option>
                      <option value="DE">GERMANY</option>
                      <option value="GH">GHANA</option>
                      <option value="GI">GIBRALTAR</option>
                      <option value="GR">GREECE</option>
                      <option value="GL">GREENLAND</option>
                      <option value="GD">GRENADA</option>
                      <option value="GP">GUADELOUPE</option>
                      <option value="GU">GUAM</option>
                      <option value="GT">GUATEMALA</option>
                      <option value="GG">GUERNSEY</option>
                      <option value="GQ">GUINEA (EQUATORIAL GUINEA)</option>
                      <option value="GW">GUINEA BISSAU</option>
                      <option value="GN">GUINEA REPUBLIC (GUINEA)</option>
                      <option value="GY">GUYANA (BRITISH)</option>
                      <option value="HT">HAITI</option>
                      <option value="HM">HEARD ISLAND AND MCDONALD ISLANDS</option>
                      <option value="HN">HONDURAS</option>
                      <option value="HK">HONG KONG</option>
                      <option value="HU">HUNGARY</option>
                      <option value="IS">ICELAND</option>
                      <option value="IN">INDIA</option>
                      <option value="ID">INDONESIA</option>
                      <option value="IR">IRAN (ISLAMIC REPUBLIC OF)</option>
                      <option value="IQ">IRAQ</option>
                      <option value="IE">IRELAND, REPUBLIC OF (IRELAND)</option>
                      <option value="IL">ISRAEL</option>
                      <option value="IT">ITALY</option>
                      <option value="SM">ITALY (SAN MARINO)</option>
                      <option value="VA">ITALY (VATICAN CITY)</option>
                      <option value="CI">IVORY COAST</option>
                      <option value="JM">JAMAICA</option>
                      <option value="JP">JAPAN</option>
                      <option value="JE">JERSEY</option>
                      <option value="JO">JORDAN</option>
                      <option value="KZ">KAZAKHSTAN</option>
                      <option value="KE">KENYA</option>
                      <option value="KI">KIRIBATI</option>
                      <option value="KR">KOREA, REPUBLIC OF (KOREA SOUTH)</option>
                      <option value="KP">KOREA, THE D.P.R. OF (KOREA NORTH)</option>
                      <option value="KV">KOSOVO</option>
                      <option value="KW">KUWAIT</option>
                      <option value="KG">KYRGYZSTAN</option>
                      <option value="LA">LAOS</option>
                      <option value="LV">LATVIA</option>
                      <option value="LB">LEBANON</option>
                      <option value="LS">LESOTHO</option>
                      <option value="LR">LIBERIA</option>
                      <option value="LY">LIBYAN ARAB JAMAHIRIYA</option>
                      <option value="LI">LIECHTENSTEIN</option>
                      <option value="LT">LITHUANIA</option>
                      <option value="LU">LUXEMBOURG</option>
                      <option value="MO">MACAO</option>
                      <option value="MK">MACEDONIA, REPUBLIC OF (FYROM)</option>
                      <option value="MG">MADAGASCAR</option>
                      <option value="MW">MALAWI</option>
                      <option value="MY">MALAYSIA</option>
                      <option value="MV">MALDIVES</option>
                      <option value="ML">MALI</option>
                      <option value="MT">MALTA</option>
                      <option value="MH">MARSHALL ISLANDS</option>
                      <option value="MQ">MARTINIQUE</option>
                      <option value="MR">MAURITANIA</option>
                      <option value="MU">MAURITIUS</option>
                      <option value="YT">MAYOTTE</option>
                      <option value="MX">MEXICO</option>
                      <option value="FM">MICRONESIA, FEDERATED STATES OF</option>
                      <option value="MD">MOLDOVA, REPUBLIC OF</option>
                      <option value="MC">MONACO</option>
                      <option value="MN">MONGOLIA</option>
                      <option value="ME">MONTENEGRO</option>
                      <option value="MS">MONTSERRAT</option>
                      <option value="MA">MOROCCO</option>
                      <option value="MZ">MOZAMBIQUE</option>
                      <option value="MM">MYANMAR</option>
                      <option value="NA">NAMIBIA</option>
                      <option value="NR">NAURU, REPUBLIC OF</option>
                      <option value="NP">NEPAL</option>
                      <option value="NL">NETHERLANDS</option>
                      <option value="AN">NETHERLANDS ANTILLES</option>
                      <option value="XN">NEVIS</option>
                      <option value="NC">NEW CALEDONIA</option>
                      <option value="NZ">NEW ZEALAND</option>
                      <option value="NI">NICARAGUA</option>
                      <option value="NE">NIGER</option>
                      <option value="NG">NIGERIA</option>
                      <option value="NU">NIUE</option>
                      <option value="MP">NORTHERN MARIANA ISLANDS</option>
                      <option value="NO">NORWAY</option>
                      <option value="OM">OMAN</option>
                      <option value="PK">PAKISTAN</option>
                      <option value="PW">PALAU</option>
                      <option value="PS">PALESTINIAN TERRITORY, OCCUPIED</option>
                      <option value="PA">PANAMA</option>
                      <option value="PG">PAPUA NEW GUINEA</option>
                      <option value="PY">PARAGUAY</option>
                      <option value="PE">PERU</option>
                      <option value="PH">PHILIPPINES</option>
                      <option value="PN">PITCAIRN</option>
                      <option value="PL">POLAND</option>
                      <option value="PT">PORTUGAL</option>
                      <option value="PR">PUERTO RICO</option>
                      <option value="QA">QATAR</option>
                      <option value="RE">REUNION ISLANDS</option>
                      <option value="RO">ROMANIA</option>
                      <option value="RU">RUSSIAN FEDERATION (RUSSIA)</option>
                      <option value="RW">RWANDA</option>
                      <option value="PM">SAINT PIERRE AND MIQUELON</option>
                      <option value="WS">SAMOA</option>
                      <option value="ST">SAO TOME / PRINCIPE</option>
                      <option value="SA">SAUDI ARABIA</option>
                      <option value="SN">SENEGAL</option>
                      <option value="RS">SERBIA</option>
                      <option value="SC">SEYCHELLES</option>
                      <option value="SL">SIERRA LEONE</option>
                      <option value="SG">SINGAPORE</option>
                      <option value="SK">SLOVAKIA</option>
                      <option value="SI">SLOVENIA</option>
                      <option value="SB">SOLOMON ISLANDS</option>
                      <option value="SO">SOMALIA</option>
                      <option value="XS">SOMALILAND, REP OF (NORTH SOMALIA)</option>
                      <option value="ZA">SOUTH AFRICA</option>
                      <option value="SH">SOUTH AFRICA (ST HELENA)</option>
                      <option value="GS">SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS</option>
                      <option value="SS">SOUTH SUDAN</option>
                      <option value="ES">SPAIN</option>
                      <option value="LK">SRI LANKA</option>
                      <option value="XY">ST BARTHELEMY</option>
                      <option value="XE">ST EUSTATIUS (NETHERLANDS ANTILLES)</option>
                      <option value="KN">ST KITTS</option>
                      <option value="LC">ST LUCIA</option>
                      <option value="XM">ST MAARTEN (NETHERLANDS ANTILLES)</option>
                      <option value="VC">ST VINCENT / GRENADINE</option>
                      <option value="SD">SUDAN</option>
                      <option value="SR">SURINAME (SURINAM)</option>
                      <option value="SJ">SVALBARD AND JAN MAYEN</option>
                      <option value="SZ">SWAZILAND</option>
                      <option value="SE">SWEDEN</option>
                      <option value="CH">SWITZERLAND</option>
                      <option value="SY">SYRIA</option>
                      <option value="TW">TAIWAN</option>
                      <option value="TJ">TAJIKISTAN</option>
                      <option value="TZ">TANZANIA, UNITED REPUBLIC OF</option>
                      <option value="TH">THAILAND</option>
                      <option value="TG">TOGO</option>
                      <option value="TK">TOKELAU</option>
                      <option value="TO">TONGA</option>
                      <option value="TT">TRINIDAD / TOBAGO</option>
                      <option value="TN">TUNISIA</option>
                      <option value="TR">TURKEY</option>
                      <option value="TM">TURKMENISTAN</option>
                      <option value="TC">TURKS / CAICOS ISLANDS</option>
                      <option value="TV">TUVALU</option>
                      <option value="UG">UGANDA</option>
                      <option value="UA">UKRAINE</option>
                      <option value="AE">UNITED ARAB EMIRATES</option>
                      <option value="GB">UNITED KINGDOM</option>
                      <option value="US">UNITED STATES</option>
                      <option value="UM">UNITED STATES MINOR OUTLYING ISLANDS</option>
                      <option value="UY">URUGUAY</option>
                      <option value="UZ">UZBEKISTAN</option>
                      <option value="VU">VANUATU</option>
                      <option value="VE">VENEZUELA</option>
                      <option value="VN">VIETNAM</option>
                      <option value="VG">VIRGIN ISLANDS (BRITISH)</option>
                      <option value="VI">VIRGIN ISLANDS (USA)</option>
                      <option value="EH">WESTERN SAHARA</option>
                      <option value="YE">YEMEN</option>
                      <option value="ZM">ZAMBIA</option>
                      <option value="ZW">ZIMBABWE</option>
                    </Field>
                    <ErrorMessage name="country" render={msg => <div className="color-red">{msg}</div>}/>
                  </div>
                  <button type="submit" className="" style={{backgroundColor: "rgb(230, 35, 70)"}}>Update</button>
                </Form>
              </div>
            </div>
          </main>
        )}
        </Formik>
      </React.Fragment>
    );
  }
}

export default EditAddress
