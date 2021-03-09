import PropTypes from "prop-types"
import React, { useRef, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
const CreditCard = props => {
  const [element, setElement] = useState();
  const [number, setNumber] = useState();
  const cvvInput = useRef();
  const handleTransition = (cardInner, numberItem) => {
    setElement(cardInner);
    setNumber(numberItem);
  };
  const getSchema = () =>
    yup.object().shape({
      cardNumber: yup.string().min(16, "not less than 16"),
      cardHolder: yup.string().required(),
      cardMonth: yup.string().required(),
      cardYear: yup.string().required(),
      cvv: yup.string().required().min(3, "not less than 3")
    });
    return (
      <React.Fragment>
        <Formik
          initialValues={{
            cardNumber: "",
            cardHolder: "",
            cardMonth: "",
            cardYear: "",
            cvv: ""
          }}
          onSubmit={(values, formikBag) => {
            alert(JSON.stringify(values, null, 2));
            props.updateChange(values)
            props.placeOrder();
            formikBag.resetForm();
          }}
          validationSchema={getSchema()}
        >
          {props => (
            <form onSubmit={props.handleSubmit}>
              {" "}

              <div className="form">
                <input
                  type="text"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.cardNumber
                    .replace(/\s/g, "")
                    .replace(/(\d{4})/g, "$1 ")
                    .trim()}
                  name="cardNumber"
                  maxLength="19"
                  placeholder="Card Number"
                  onKeyDown={e => {
                    console.log(e.which);
                    if (e.which !== "#")
                      event.target.classList.add("numberTransform");
                  }}
                />
                <input
                  type="text"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.cardHolder}
                  name="cardHolder"
                  placeholder="Card Holder Name"
                />
                <div className="row card-date">
                  <div className="column">
                    <div>
                      <select
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.cardMonth}
                        placeholder="Month"
                        name="cardMonth"
                      >
                        <option value="" disabled>
                          Month
                        </option>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m, i) => (
                          <option key={i} value={m}>{m < 10 ? `0${m}` : m}</option>
                        ))}
                      </select>

                      <select
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.cardYear}
                        name="cardYear"
                      >
                        <option value="" disabled>
                          Year
                        </option>
                        {[
                          2020,
                          2021,
                          2023,
                          2024,
                          2025,
                          2026,
                          2027,
                          2028,
                          2029,
                          2030,
                          2031,
                          2032
                        ].map((y, i) => (
                          <option key={i} value={y}>{y}</option>
                        ))}
                      </select>
                    </div>
                  </div>{" "}
                  <div className="column">
                    <input
                      type="text"
                      ref={cvvInput}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.cvv}
                      name="cvv"
                      placeholder="CVV"
                    />
                  </div>
                </div>
                {props.errors.name && (
                  <div id="feedback">{props.errors.name}</div>
                )}
                <button disabled={!props.isValid} className="pay-btn checkout-btn" type="submit" disabled={!props.isValid}>
                  Pay
                </button>
              </div>
            </form>
          )}
        </Formik>
      </React.Fragment>
    );
}

export default CreditCard
