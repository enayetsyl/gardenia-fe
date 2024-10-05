"use client";

import CheckoutForm from "@/Components/Stripe/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Payment = () => {
  return (
     <div className="bg-background-dark min-h-screen ">
       <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
     </div>
  );
};

export default Payment;
