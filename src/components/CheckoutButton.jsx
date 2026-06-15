"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from 'react';
import Script from 'next/script';
import { sendGTMEvent } from '@next/third-parties/google';

export default function CheckoutButton({ amount, planName, className }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    // Send conversion event to Google Analytics / Ads
    sendGTMEvent({ event: 'begin_checkout', value: { planName, amount } });
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', { 'send_to': 'AW-XXXXXXXXX/checkout_initiated' });
    }

    if (!session) {
      alert("Please sign in first to upgrade your account.");
      router.push("/api/auth/signin");
      return;
    }

    setLoading(true);
    try {
      const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://wise-action-3f2ccfecaa.strapiapp.com';
      const orderRes = await fetch(`${strapiUrl}/api/payment/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount })
      });
      
      if (!orderRes.ok) throw new Error("Could not create order");
      const order = await orderRes.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
        amount: order.amount, 
        currency: order.currency,
        name: "Neuron Labs",
        description: `${planName} Plan Upgrade`,
        order_id: order.id,
        handler: async function (response) {
          const verifyRes = await fetch(`${strapiUrl}/api/payment/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              user_email: session.user.email
            })
          });
          
          if (verifyRes.ok) {
            alert(`Payment Successful! Welcome to the ${planName} Plan.`);
            router.push('/dashboard');
          } else {
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          email: session.user.email,
        },
        theme: {
          color: "#0f9d58"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response){
        alert("Payment failed: " + response.error.description);
      });
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Something went wrong loading the payment gateway.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <button 
        onClick={handleCheckout} 
        disabled={loading}
        className={className || "w-full py-4 rounded-full font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg hover:shadow-cyan-500/25 transition-all disabled:opacity-50"}
      >
        {loading ? 'Processing...' : 'Upgrade Now'}
      </button>
    </>
  );
}
