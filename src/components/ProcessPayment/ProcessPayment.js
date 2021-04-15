import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import SimpleCardForm from "./SimpleCardForm";

const ProcessPayment = () => {
  const stripePromise = loadStripe(
    "pk_test_51IgCraGqFNE26ZDxHm4gFMQja2aI9FuxzwGbqZYojzfz4xN6QPAAxjZF3fv6UNl54QQ0JnYYl2gjkyKWgTNu2PV900KaUPVu9t"
  );
  return (
    <Elements stripe={stripePromise}>
      <SimpleCardForm></SimpleCardForm>
    </Elements>
  );
};

export default ProcessPayment;
