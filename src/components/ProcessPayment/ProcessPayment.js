import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import SimpleCardForm from "./SimpleCardForm";

const stripePromise = loadStripe(
  "pk_test_51IgCraGqFNE26ZDxHm4gFMQja2aI9FuxzwGbqZYojzfz4xN6QPAAxjZF3fv6UNl54QQ0JnYYl2gjkyKWgTNu2PV900KaUPVu9t"
);

const ProcessPayment = ({ handlePayment }) => {
  return (
    <Elements stripe={stripePromise}>
      <SimpleCardForm handlePayment={handlePayment}></SimpleCardForm>
    </Elements>
  );
};

export default ProcessPayment;
