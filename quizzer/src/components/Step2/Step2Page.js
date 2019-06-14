import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// this is where customer selects a Plan via Stripe
class Step2Page extends Component {
    constructor(props) {
        super(props);

        this.state = {
            coupon: '',
            currentPlan: 'bronze',
        };
    

        this.onCouponChange = this.onCouponChange.bind(this);
        this.switchPlan = this.switchPlan.bind(this);
        this.nextStep = this.nextStep.bind(this);
    }

    onCouponChange(event) {
        this.setState({
            coupon: event.target.value,
        });
    }

    switchPlan(currentPlan) {
        this.setState({
         currentPlan,
        });
    }

    nextStep() {
        const {
            currentPlan, 
            coupon
        } = this.state;

      // heroku: https://labs13-quizzer.herokuapp.com/api/stripe/customer/subscribe
    //   fetch('http://localhost:8000/api/stripe/customer/subscribe', {
        
    fetch('https://labs13-quizzer.herokuapp.com/api/stripe/customer/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          plan: currentPlan, 
          coupon: coupon
        })
      }).then((res) => res.json()).then((response) => {
        console.log('response', response)
        alert(`Thank you for selecting the ${currentPlan} plan for all your testing needs, its our best seller!`);        
      });
    }
    
    render() {
        const {
            coupon,
            currentPlan,
        } = this.state;

        console.log('coupon', coupon);
        console.log('currentPlan', currentPlan);


        const plans = ['bronze', 'silver', 'gold'];

        return (
        <div>
            <div>
                <input
                type="text"
                placeholder="Coupon"
                value={coupon}
                onChange={this.onCouponChange}
                />
            </div>
            <div>
                <h2>Plans</h2>
                {  
                    (plans).map((plan) => {
                        if (currentPlan === plan) {
                        return (
                            <button
                               style={{
                                backgroundColor: '#d8d8d8',
                            }}
                            onClick={() => this.switchPlan(plan)}
                            >
                                {plan}
                                </button>
                        )
                      }
                      return (
                        <button
                           style={{
                            backgroundColor: '#ffffff',
                        }}
                        >
                            {plan}
                            </button>
                     )
                    })
                }
            </div>
            <div>
                <button onClick={this.nextStep} >Next</button>
                <Link to='/step1' ><button>Back</button></Link>
            </div>
        </div>
        );
    }
}

export default Step2Page;

