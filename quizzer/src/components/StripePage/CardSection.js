// CardSection.js
import React from 'react';
import {CardElement} from 'react-stripe-elements';
import "./stripe.css";

class CardSection extends React.Component {
  render() {
    return (
      <label >
        <h1>Card details</h1>
        <CardElement style={{base: {fontSize: '16px'}}} />
      </label>
    );
  }
}

export default CardSection;