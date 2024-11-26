"use server";

import axios from "axios";

const MONO_BASE_URL = "https://api.withmono.com/v1";

/**
 * Create a funding source using Mono's API.
 * @param options {AddFundingSourceParams} - Details required to create the funding source.
 * @returns {Promise<string | null>} - Funding source URL if successful.
 */
export const createFundingSource = async ({
  monoCustomerId,
  bankName,
}: AddFundingSourceParams): Promise<string | null> => {
  try {
    const response = await axios.post(
      `${MONO_BASE_URL}/accounts/funding-sources`,
      {
        monoCustomer_id: monoCustomerId,
        bankName,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.MONO_SECRET}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Return the funding source URL
    return response.data?.fundingSourceUrl || null;
  } catch (error) {
    console.error("Creating a Funding Source Failed: ", error);
    return null;
  }
};

/**
 * Initialize a payment using Flutterwave.
 * @param amount {number} - Payment amount.
 * @param currency {string} - Payment currency (e.g., NGN, USD).
 * @param customer {object} - Customer details.
 * @returns {Promise<any>} - Flutterwave payment initialization response.
 */
export const initializePayment = async (
  amount: number,
  currency: string,
  customer: { email: string; phonenumber?: string; name: string }
): Promise<any> => {
  try {
    const response = await axios.post(
      "https://api.flutterwave.com/v3/payments",
      {
        tx_ref: `mono_tx_${Date.now()}`,
        amount,
        currency,
        redirect_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment-success`,
        customer,
        payment_options: "card,banktransfer",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Return payment initialization response
    return response.data;
  } catch (error) {
    console.error("Initializing payment failed: ", error);
    throw new Error("Payment initialization failed");
  }
};

/**
 * Verify a Flutterwave transaction.
 * @param transactionId {string} - Transaction ID to verify.
 * @returns {Promise<any>} - Transaction verification response.
 */
export const verifyTransaction = async (
  transactionId: string
): Promise<any> => {
  try {
    const response = await axios.get(
      `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
      {
        headers: {
          Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
        },
      }
    );

    // Return transaction verification response
    return response.data;
  } catch (error) {
    console.error("Transaction verification failed: ", error);
    throw new Error("Transaction verification failed");
  }
};

/**
 * Add a funding source for a customer.
 * @param params {AddFundingSourceParams} - Details required for funding source creation.
 * @returns {Promise<string | null>} - Funding source URL if successful.
 */
export const addFundingSource = async ({
  monoCustomerId,
  bankName,
}: AddFundingSourceParams): Promise<string | null> => {
  try {
    // Create funding source using Mono
    const fundingSourceUrl = await createFundingSource({
      monoCustomerId,
      bankName,
    });

    if (!fundingSourceUrl) {
      throw new Error("Failed to create funding source");
    }

    return fundingSourceUrl;
  } catch (error) {
    console.error("Adding funding source failed: ", error);
    return null;
  }
};
