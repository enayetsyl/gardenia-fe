"use client";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { StripeCardElementOptions } from "@stripe/stripe-js";
import toast from 'react-hot-toast';
import CustomButton from "../Shared/CustomButton";
import Link from "next/link";

const CheckoutForm: React.FC = () => {
  const [error, setError] = useState<string>("");
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState<string>("");
  const [transactionId, setTransactionId] = useState<string>("");
  const stripe = useStripe();
  const [price] = useState<number>(5);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/payment/create-payment-intent`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ price }),
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch data. Status: ${res.status}`);
        }

        const response: { success: boolean; message: string; data: { client_secret: string } } = await res.json();

        setClientSecret(response.data.client_secret);
        // toast.success('Payment intent created successfully');
      } catch (error) {
        // console.error("Error fetching data:", (error as Error).message);
        toast.error('Failed to create payment intent');
      }
    };

    fetchData();
  }, [price]);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true); // Set loading to true when payment starts

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message ?? "An error occurred");
    } else {
      setError("");
    }

    try {
      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
          },
        });

      if (confirmError) {
        toast.error(confirmError.message || 'Payment failed');
      } else {
        if (paymentIntent.status === "succeeded") {
          setTransactionId(paymentIntent.id);
          toast.success('Payment successful!');
        }
      }
    } catch (error) {
      toast.error('An error occurred during payment');
    } finally {
      setIsLoading(false); // Set loading back to false when payment completes (success or failure)
    }
  };

  const cardElementOptions: StripeCardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#2e7d32", // Dark gray text
        "::placeholder": {
          color: "#718096", // Light gray placeholder
        }, // Light gray border
      },
      invalid: {
        color: "#e53e3e", // Red for invalid input
      },
    },
  };

  return (
   <div className="pt-40">
     <div className="max-w-md min-w-md mx-auto  p-6 bg-background-light rounded-lg shadow-2xl">
      <h2 className=" font-bold mb-6 text-primary  text-center text-h2">Checkout</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="p-3 border border-primary focus:border-border-focus rounded-md">
          <CardElement options={cardElementOptions} />
        </div>

<CustomButton
text={isLoading ? "Processing..." : `Pay $${price}`}
disabled={!stripe || !clientSecret || isLoading}
type="submit"
className="w-full py-2 px-4 bg-button-bg text-button-text font-semibold hover:bg-button-hover disabled:opacity-50 disabled:cursor-not-allowed"
/>
       
        
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {transactionId && (
          <>
          <p className="text-green-600 text-sm pb-5"> <strong>Your transaction id: </strong>{transactionId}</p>
          <Link href="/">
            <CustomButton text="Go to Home" 
            className="w-full py-2 px-4 bg-button-bg text-button-text font-semibold hover:bg-button-hover"
            type="button"

            />
          </Link>
          </>
        )}
      </form>
    </div>
   </div>
  );
};

export default CheckoutForm;

