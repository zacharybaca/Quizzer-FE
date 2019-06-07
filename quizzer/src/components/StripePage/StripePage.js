import React from 'react';
import {render} from 'react-dom';
import {StripeProvider} from 'react-stripe-elements';

import MyStoreCheckout from './MyStoreCheckout';

const StripePage = () => {
    return (
    <StripeProvider apiKey="pk_test_hJ4ymeWUIsyUjYOAiTXmMMUG00HWO2eMEX">
    <MyStoreCheckout />
    </StripeProvider>
    );
};

export default StripePage;