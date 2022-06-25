import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import styled from "@emotion/styled";
import axios from "axios";

import Row from "./prebuilt/Row";
import BillingDetailsFields from "./prebuilt/BillingDetailsFields";
import SubmitButton from "./prebuilt/SubmitButton";
import CheckoutError from "./prebuilt/CheckoutError";

const CardElementContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: center;

  & .StripeElement {
    width: 100%;
    padding: 15px;
  }
`;

/**
 * It renders a form that collects billing details and a card element, and when the form is submitted,
 * it creates a payment method and confirms the payment
 * @returns The CheckoutForm component is being returned.
 */

const CheckoutForm = ({ price, onSuccessfulCheckout }) => {
/* Setting the state of the component. */
  const [isProcessing, setProcessingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState();

/* Setting up the Stripe API. */
  const stripe = useStripe();
  const elements = useElements();

  const handleCardDetailsChange = ev => {
    ev.error ? setCheckoutError(ev.error.message) : setCheckoutError();
  };

/**
 * The function creates a customer in Stripe's database, creates a payment intent, creates a payment
 * method, and confirms the payment.
 */
  const handleFormSubmit = async ev => {
    ev.preventDefault();

  /* Creating an object with the billing details. */
    const billingDetails = {
      name: ev.target.name.value,
      email: ev.target.email.value,
      address: {
        city: ev.target.city.value,
        line1: ev.target.address.value,
        state: ev.target.state.value,
        postal_code: ev.target.zip.value
      }
    };

    /* Add studio name as meta data. */
    const metaData = {
      studioName: ev.target.studio.value,
    }

    /* Setting the state of the component to true. */
    setProcessingTo(true);

   /* Getting the card element from the Stripe API. */
    const cardElement = elements.getElement("card");

    /* This is the code that is responsible for creating a payment method and confirming the
    payment. */
    try 
    {
    /* Creating a customer in stripes database for record keeping. */
      const customer = await stripe.customers.create({
        email: ev.target.name.value,
        name: ev.target.email.value,
      });
    /* Getting the customer id back that can be added for future payments for record keeping. */
      const { id } = customer;

      /* Creating a payment intent. Note that amount needs to be in cents. We are also adding a receipt email.*/
      const amountInCents = price * 100;
      const { data: clientSecret } = await axios.post("/api/payment_intents", {
        amount: amountInCents,
        currency: 'usd',
        customer: id,
        receipt_email: email,
        metaData
      });

     /* Creating a payment method. */
      const paymentMethodReq = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: billingDetails
      });

      /* Checking if there is an error in the payment method request. If there is an error, it sets the
      error message to the state of the component and sets the processing state to false. */
      if (paymentMethodReq.error) {
        setCheckoutError(paymentMethodReq.error.message);
        setProcessingTo(false);
        return;
      }

      /* Confirming the payment. */
      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodReq.paymentMethod.id
      });

      /* Checking if there is an error in the payment method request. If there is an error, it sets the
      error message to the state of the component and sets the processing state to false. */
      if (error) {
        setCheckoutError(error.message);
        setProcessingTo(false);
        return;
      }
      onSuccessfulCheckout();
    } catch (err) {
      setCheckoutError(err.message);
    }
  };

  const iframeStyles = {
    base: {
      color: "#fff",
      fontSize: "16px",
      iconColor: "#fff",
      "::placeholder": {
        color: "#87bbfd"
      }
    },
    invalid: {
      iconColor: "#FFC7EE",
      color: "#FFC7EE"
    },
    complete: {
      iconColor: "#cbf4c9"
    }
  };

  const cardElementOpts = {
    iconStyle: "solid",
    style: iframeStyles,
    hidePostalCode: true
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <Row>
        <BillingDetailsFields />
      </Row>
      <Row>
      </Row>
      <Row>
        <CardElementContainer>
          <CardElement
            options={cardElementOpts}
            onChange={handleCardDetailsChange}
          />
        </CardElementContainer>
      </Row>
      {checkoutError && <CheckoutError>{checkoutError}</CheckoutError>}
      <Row>
        <SubmitButton disabled={isProcessing || !stripe}>
          {isProcessing ? "Processing..." : `Pay $${price}`}
        </SubmitButton>
      </Row>
    </form>
  );
};

export default CheckoutForm;
