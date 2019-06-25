// CheckoutForm.js
import React from 'react';
import {injectStripe} from 'react-stripe-elements';
// import AddressSection from './AddressSection';
import CardSection from './CardSection';
import { Link } from 'react-router-dom';
import "./stripe.css";
import "./checkout.css";



class CheckoutForm extends React.Component {

  handleSubmit = (ev) => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();

    // Within the context of `Elements`, this call to createPaymentMethod knows from which Element to
    // create the PaymentMethod, since there's only one in this group.
    // See our createPaymentMethod documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-create-payment-method

    this.props.stripe
      .createPaymentMethod('card', {billing_details: {name: 'Jenny Rosen'}})
      .then(({paymentMethod}) => {
        console.log('Received Stripe PaymentMethod:', paymentMethod);
      });

      
    // You can also use handleCardPayment with the Payment Intents API automatic confirmation flow.
    // See our handleCardPayment documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-handle-card-payment
    
    // uncomment below!  "data is empty"
    // this.props.stripe.handleCardPayment('{PAYMENT_INTENT_CLIENT_SECRET}', data);

    // You can also use createToken to create tokens.
    // See our tokens documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-create-token
    
    this.props.stripe.createToken({})
      .then(({token}) => {
      console.log('Received Stripe token:', token);
     
      // heruko: https://labs13-quizzer.herokuapp.com/api/stripe/customer/create
      // fetch('http://localhost:8000/api/stripe/customer/create', {
    
     fetch(`${process.env.REACT_APP_BE_URL || process.env.REACT_APP_BE_LOCAL}/api/stripe/customer/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: token.id
        })
      }).then((res) => res.json()).then((response) => {
        console.log('response', response)
        alert(`Thank you for doing business with us!` );
      });
      console.log('here:', this.props)
      //this.props.history.push('/teachersDashboard')
    })

    // token type can optionally be inferred if there is only one one Element
    // with which to create tokens
    // this.props.stripe.createToken({name: 'Jenny Rosen'});

    // You can also use createSource to create Sources.
    // See our Sources documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-create-source
    
    this.props.stripe.createSource({
      type: 'card',
      owner: {
        name: 'Jenny Rosen',
      },
    });
   
  }; 


  render() {
    return (
      <form class="Checkout" onSubmit={this.handleSubmit}>
        {/* <AddressSection /> */}
        <CardSection />
        <Link to="/teachersDashboard">
        <button class="button" type="submit">Confirm order</button>
          </Link>
        <Link to='/step1' ><button class="button">back</button></Link>
      </form>
    );
  
  }
}

export default injectStripe(CheckoutForm);