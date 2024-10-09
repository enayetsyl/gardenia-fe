"use client";

import CheckoutForm from "@/Components/Stripe/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const PaymentPage = () => {
  return (
  <Suspense fallback={<div>Loading...</div>}>
    <Payment />
  </Suspense>
  )}

const Payment = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  if (!userId) {
    return <div>Error: User ID is missing from the URL parameters.</div>;
  }
  return (
     <div className="bg-background-dark min-h-screen ">
       <Elements stripe={stripePromise}>
       <CheckoutForm userId={userId} />
      </Elements>
     </div>
  );
};

export default PaymentPage;
