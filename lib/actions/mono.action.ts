// mono.actions.ts
"use server";
import { useState, useCallback } from "react";
import { MonoConnect } from "@mono.co/connect.js";
import { plaidClient } from "../plaid"; // Assuming Plaid setup exists

const monoKey = process.env.NEXT_PUBLIC_MONO_PUBLIC_KEY; // Make sure this is defined in your environment variables

export const linkMonoAccount = async () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const openMonoWidget = useCallback(async () => {
    const monoInstance = new MonoConnect({
      key: monoKey || "",
      onClose: () => console.log("Widget closed"),
      onLoad: () => setScriptLoaded(true),
      onSuccess: ({ code }) => {
        console.log(`Mono account linked successfully: ${code}`);
        // Here you could call a function to exchange the Mono `code` for access data
      },
    });
    monoInstance.setup();
    monoInstance.open();
  }, []);
  
  return openMonoWidget;
};

export const reauthenticateMonoAccount = async (reauthCode: string) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const reauthenticate = useCallback(async () => {
    const monoInstance = new MonoConnect({
      key: monoKey || "",
      onClose: () => console.log("Widget closed"),
      onLoad: () => setScriptLoaded(true),
      onSuccess: ({ code }) => {
        console.log(`Reauth successful: ${code}`);
        // Use this reauth code as needed
      },
    });
    monoInstance.reauthorise(reauthCode);
    monoInstance.open();
  }, [reauthCode]);

  return reauthenticate;
};

export const payWithMono = async () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const payWithMono = useCallback(async () => {
    const monoInstance = new MonoConnect({
      key: monoKey || "",
      scope: "payments",
      data: {
        type: "one-time-debit",
        amount: 150000,
        description: "Payment for light bill",
      },
      onSuccess: ({ code }) => console.log(`Payment linked successfully: ${code}`),
    });

    monoInstance.setup();
    monoInstance.open();
  }, []);

  return payWithMono;
};

// Add additional Mono and Plaid combined logic here
// For example: creating funding sources, linking tokens, etc., using Plaid and Mono together
