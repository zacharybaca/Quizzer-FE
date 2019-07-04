// CardSection.js
import React from "react";
import { CardElement } from "react-stripe-elements";
import "./stripe.css";

class CardSection extends React.Component {
  render() {
    return (
      <label className="credit-card-ask">
        <h2>Add Card Number Below</h2>
        <CardElement style={{ base: { fontSize: "16px" } }} />
      </label>
    );
  }
}

export default CardSection;

// original working
// class CardSection extends React.Component {
//   render() {
//     return (
//       <label >
//         <h2>Add payment Option</h2>
//         <CardElement
//         // className="box"
//         style={{base: {fontSize: '16px'}}} />
//       </label>

//     );
//   }
// }

// export default CardSection;
