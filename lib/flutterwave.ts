import axios from "axios";

// Create an Axios instance for Flutterwave
const flutterwaveClient = axios.create({
  baseURL: "https://api.flutterwave.com/v3",
  headers: {
    Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`, // Use your secret key here
    "Content-Type": "application/json",
  },
});

/**
 * Function to initialize a payment
 * @param {number} amount - The payment amount
 * @param {string} currency - The currency for the payment (e.g., NGN)
 * @param {Object} customer - The customer details
 * @returns {Promise<any>} - The response from Flutterwave API
 */
export const initializePayment = async (
  amount: number,
  currency: string,
  customer: { email: string; phonenumber?: string; name: string }
): Promise<any> => {
  try {
    const response = await flutterwaveClient.post("/payments", {
      tx_ref: `tx-${Date.now()}`, // Unique transaction reference
      amount,
      currency,
      customer,
      redirect_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment-callback`, // Redirect after payment
    });
    return response.data; // Contains payment link and transaction details
  } catch (error) {
    console.error("Error initializing payment:", error);
    throw error;
  }
};

/**
 * Function to verify a transaction
 * @param {string} transactionId - The ID of the transaction to verify
 * @returns {Promise<any>} - The response from Flutterwave API
 */
export const verifyTransaction = async (transactionId: string): Promise<any> => {
  try {
    const response = await flutterwaveClient.get(`/transactions/${transactionId}/verify`);
    return response.data; // Contains transaction verification details
  } catch (error) {
    console.error("Error verifying transaction:", error);
    throw error;
  }
};
