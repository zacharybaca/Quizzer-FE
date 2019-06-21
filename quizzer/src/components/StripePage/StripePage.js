import React from "react";
import { render } from "react-dom";
import { StripeProvider } from "react-stripe-elements";
import "./stripe.css";
import MyStoreCheckout from "./MyStoreCheckout";
import TeacherNavigation from "../Dashboards/Navigation/TeacherNavigation";

const StripePage = () => {
  return (
    <>
      <TeacherNavigation />
      <StripeProvider apiKey="pk_test_hJ4ymeWUIsyUjYOAiTXmMMUG00HWO2eMEX">
        <MyStoreCheckout />
      </StripeProvider>
    </>
  );
};

export default StripePage;
