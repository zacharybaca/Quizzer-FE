// CheckoutForm.js
import React from "react";
import { injectStripe } from "react-stripe-elements";
// import AddressSection from './AddressSection';
import CardSection from "./CardSection";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import "./stripe.css";
import "./checkout.css";

class CheckoutForm extends React.Component {
  state = {
    paid: false,
    accessCode: "",
    email: "",
    name: ""
  };

  componentDidMount() {
    const id = localStorage.getItem("id");

    axios(
      `${process.env.REACT_APP_BE_URL ||
        process.env.REACT_APP_BE_LOCAL}/api/profile/teacher/${id}`
    )
      .then(res =>
        this.setState({
          accessCode: res.data.accessCode,
          email: res.data.email,
          name: res.data.name
        })
      )
      .catch(err => console.error(err));
  }

  handleSubmit = ev => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();

    // Within the context of `Elements`, this call to createPaymentMethod knows from which Element to
    // create the PaymentMethod, since there's only one in this group.
    // See our createPaymentMethod documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-create-payment-method

    this.props.stripe
      .createPaymentMethod("card", { billing_details: { name: "Jenny Rosen" } })
      .then(({ paymentMethod }) => {
        console.log("Received Stripe PaymentMethod:", paymentMethod);
      });

    // You can also use handleCardPayment with the Payment Intents API automatic confirmation flow.
    // See our handleCardPayment documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-handle-card-payment

    // uncomment below!  "data is empty"
    // this.props.stripe.handleCardPayment('{PAYMENT_INTENT_CLIENT_SECRET}', data);

    // You can also use createToken to create tokens.
    // See our tokens documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-create-token

    this.props.stripe.createToken({}).then(({ token }) => {
      console.log("Received Stripe token:", token);
      const id = localStorage.getItem('id')
      const data = {
        access_code: this.state.accessCode,
        name: this.state.name,
        email: this.state.email,
        isPaid: true
      };

      // heruko: https://labs13-quizzer.herokuapp.com/api/stripe/customer/create
      // fetch('http://localhost:8000/api/stripe/customer/create', {
      axios
        .put(
          `${process.env.REACT_APP_BE_URL ||
            process.env.REACT_APP_BE_LOCAL}/api/profile/teacher/${id}`, data
        )
        .then(res => console.log(res.data))
        .catch(err => console.error(err));

      fetch(
        `${process.env.REACT_APP_BE_URL ||
          process.env.REACT_APP_BE_LOCAL}/api/stripe/customer/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            token: token.id
          })
        }
      )
        .then(res => res.json())
        .then(response => {
          console.log("response", response);
          const a = window.confirm(`Thank you for doing business with us!`);
          if (a) {
            this.setState({ paid: !this.state.paid });
          }
        });
    });

    // token type can optionally be inferred if there is only one one Element
    // with which to create tokens
    // this.props.stripe.createToken({name: 'Jenny Rosen'});

    // You can also use createSource to create Sources.
    // See our Sources documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-create-source

    this.props.stripe.createSource({
      type: "card",
      owner: {
        name: "Jenny Rosen"
      }
    });
  };

  render() {
    return (
      <>
        <div className="checkout-container">
          <div className="checkout-page">
            {this.state.paid ? <Redirect to="teachersDashboard" /> : null}
            <form class="Checkout" onSubmit={this.handleSubmit}>
              {/* <AddressSection /> */}
              <CardSection />
              <button class="confirm-button" type="submit">
                Confirm Order
              </button>
              <Link to="/step1">
                <button class="back-button">Back</button>
              </Link>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default injectStripe(CheckoutForm);
