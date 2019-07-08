import React, { Component } from "react";
import { Link } from "react-router-dom";
import TeacherNavigation from "../../components/Dashboards/Navigation/TeacherNavigation";
import Folders from '../../components/InfoComponents/Folders'
import axios from 'axios';
import "../StripePage/stripe.css";

// this is where customer selects a Plan via Stripe
class Step2Page extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coupon: "",
      currentPlan: "",
      selectedPlan: false,
      isPaid: null
    };

    this.onCouponChange = this.onCouponChange.bind(this);
    this.switchPlan = this.switchPlan.bind(this);
    this.nextStep = this.nextStep.bind(this);
  }

  componentDidMount() {
    const id = localStorage.getItem("id");

    axios(
      `${process.env.REACT_APP_BE_URL ||
        process.env.REACT_APP_BE_LOCAL}/api/profile/teacher/${id}`
    )
      .then(res =>
        this.setState({isPaid: res.data.isPaid})
      )
      .catch(err => console.error(err));
  }

  onCouponChange(event) {
    this.setState({
      coupon: event.target.value
    });
  }

  switchPlan(currentPlan) {
    this.setState({
      currentPlan
    });
  }

  nextStep() {
    const { currentPlan, coupon } = this.state;

    // heroku: https://labs13-quizzer.herokuapp.com/api/stripe/customer/subscribe
    //   fetch('http://localhost:8000/api/stripe/customer/subscribe', {

    fetch(
      `${process.env.REACT_APP_BE_URL ||
        process.env.REACT_APP_BE_LOCAL}/api/stripe/customer/subscribe`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          plan: currentPlan,
          coupon: coupon
        })
      }
    )
      .then(res => res.json())
      .then(response => {
        console.log("response", response);
        alert(
          `Thank you for selecting the ${currentPlan} plan for all your testing needs, its our best seller!`
        );
      });

    this.setState({ selectedPlan: !this.state.selectedPlan });
  }

  render() {
    const { coupon, currentPlan } = this.state;

    console.log("coupon", coupon);
    console.log("currentPlan", currentPlan);

    const plans = [
      "Free",
      "Pro"
      // 'silver', 'gold'
    ];
    
    if (this.state.isPaid) {
     return (
       <div>
         <TeacherNavigation />
         <Folders />
         <div className='current-plan'>
           <h1>Your plan is Pro</h1>
         </div>
       </div>
     )
    }

  
    return (
      <div>
        <TeacherNavigation />
        <div className="stripe-plans">
          <div>
            <h1 className="header-stripe">Subscription Plans</h1>
            <div className="plan-options">
              {plans.map(plan => {
                if (currentPlan === plan) {
                  return (
                    <div>
                      <div className="plans-for-teacher">
                        <button
                          onClick={() => this.switchPlan(plan)}
                          className="selected-plan"
                        >
                          {plan}
                        </button>
                        <p>
                          {plan === "Pro"
                            ? "Unlimited created quizzes"
                            : "10 created quizzes"}
                        </p>
                      </div>
                    </div>
                  );
                }
                return (
                  <>
                    <div>
                      <div className="plans-for-teacher">
                        <button
                          onClick={() => this.switchPlan(plan)}
                          className={`${plan === "Pro" ? "gold" : "bronze"}`}
                        >
                          {plan}
                        </button>
                        <p>
                          {plan === "Pro"
                            ? "Unlimited created quizzes"
                            : "10 created quizzes"}
                        </p>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div className="stripe-next-buttons">
            {!this.state.selectedPlan ? (
              <Link to="/step2">
                <button class="choose-button" onClick={this.nextStep}>
                  Choose
                </button>
              </Link>
            ) : null}

            {this.state.selectedPlan ? (
              <Link to="/step2">
                <button class="choose-button-next">Next</button>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Step2Page;
