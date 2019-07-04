import React from "react";
import { StripeProvider } from "react-stripe-elements";
import "./stripe.css";
import MyStoreCheckout from "./MyStoreCheckout";
import TeacherNavigation from "../../components/Dashboards/Navigation/TeacherNavigation";

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
