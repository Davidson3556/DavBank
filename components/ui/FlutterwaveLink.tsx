import React, { useEffect, useState } from "react";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import { initializePayment } from "@/lib/flutterwave";

interface FlutterwaveLinkProps {
  user: {
    email: string;
    phonenumber?: string;
    name: string;
  };
  variant: "primary" | "ghost" | "default";
  amount: number; // Amount to charge
}

const FlutterwaveLink: React.FC<FlutterwaveLinkProps> = ({ user, variant, amount }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      // Initialize the payment with Flutterwave
      const paymentData = await initializePayment(amount, "NGN", user);

      if (paymentData?.data?.link) {
        // Redirect the user to the payment link
        window.location.href = paymentData.data.link;
      } else {
        console.error("Failed to generate payment link:", paymentData);
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Payment initialization failed:", error);
      alert("Payment initialization failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {variant === "primary" ? (
        <Button
          onClick={handlePayment}
          disabled={loading}
          className="flutterwave-link-primary"
        >
          {loading ? "Connecting..." : "Connect Bank"}
        </Button>
      ) : variant === "ghost" ? (
        <Button onClick={handlePayment} disabled={loading} className="flutterwave-link-ghost">
          {loading ? "Connecting..." : "Connect Bank"}
        </Button>
      ) : (
        <Button onClick={handlePayment} disabled={loading} className="flutterwave-link-default">
          {loading ? "Connecting..." : "Connect Bank"}
        </Button>
      )}
    </>
  );
};

export default FlutterwaveLink;
