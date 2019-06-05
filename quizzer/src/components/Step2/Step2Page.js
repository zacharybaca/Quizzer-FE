import React, { Component } from 'react';

// this is where customer selects a Plan

class Step2Page extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // coupon: '',
            currentPlan: 'bronze',
        };
    

        // this.onCouponChange = this.onCouponChange.bind(this);
    }

    // onCouponChange(event) {
    //     this.setState({
    //         coupon: event.target.value,
    //     });
    // }
    
    render() {
        const {
            // coupon,
            currentPlan,
        } = this.state;

        const plans = ['bronze', 'silver', 'gold'];

        return (
        <div>
            {/* <div>
                <input
                type="text"
                placeholder="Coupon"
                value={coupon}
                onChange={this.onCouponChange}
                />
            </div> */}
            <div>
                <h2>Plans</h2>
                {
                    (plans).map((plan) => {
                        if (currentPlan == plan) {
                        return (
                            <button
                               style={{
                                backgroundColor: '#d8d8d8',
                            }}
                            >
                                {plan}
                                </button>
                        )
                      }
                      return (
                        <button
                           style={{
                            backgroundColor: '#ff',
                        }}
                        >
                            {plan}
                            </button>
                     )
                    })
                }
                            </div>
                            </div>

        );
    }
}

export default Step2Page;