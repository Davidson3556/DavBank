'use server';

import { ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { addFundingSource } from "./mono.action";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
  APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,
} = process.env;

export const getUserInfo = async ({ userId }: GetUserInfoProps) => {
  try {
    const { database } = await createAdminClient();

    const user = await database.listDocuments(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );

    return user.documents[0];
  } catch (error) {
    console.error("Error fetching user info:", error);
  }
};

export const signIn = async ({ email, password }: SignInProps) => {
  try {
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    const user = await getUserInfo({ userId: session.userId });

    return user;
  } catch (error) {
    console.error("Error signing in:", error);
  }
};

export const signUp = async ({ password, ...userData }: SignUpParams) => {
  try {
    const { email, firstName, lastName } = userData;
    const { account, database } = await createAdminClient();

    const newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`
    );

    if (!newUserAccount) throw new Error("Error creating user account");

    const newUser = await database.createDocument(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      ID.unique(),
      {
        ...userData,
        userId: newUserAccount.$id,
      }
    );

    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return newUser;
  } catch (error) {
    console.error("Error signing up:", error);
  }
};

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const session = await account.get();
    const user = await getUserInfo({ userId: session.$id });

    return user;
  } catch (error) {
    console.error("Error fetching logged-in user:", error);
    return null;
  }
}

export const logoutAccount = async () => {
  try {
    const { account } = await createSessionClient();

    cookies().delete("appwrite-session");

    await account.deleteSession("current");
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

export const createBankAccount = async ({
  userId,
  bankId,
  accountId,
  fundingSourceUrl,
  sharableId,
  
}: CreateBankAccountProps) => {
  try {
    const { database } = await createAdminClient();

    const bankAccount = await database.createDocument(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      ID.unique(),
      {
        userId,
        bankId,
        accountId,
        fundingSourceUrl,
        sharableId,
      }
    );

    return bankAccount;
  } catch (error) {
    console.error("Error creating bank account:", error);
  }
};

export const addMonoBankAccount = async ({
    publicToken,
    userId,
    bankName,
  }: {
    publicToken: string;
    userId: string;
    bankName: string;
  }) => {
    try {
      // Fetch user info to get monoCustomerId
      const user = await getUserInfo({ userId });
      if (!user || !user.monoCustomerId) {
        throw new Error("User monoCustomerId not found");
      }
  
      // Use Mono API to retrieve account data and create funding source
      const fundingSourceUrl = await addFundingSource({
        monoCustomerId: user.monoCustomerId, // Pass the required monoCustomerId
        processorToken: publicToken,        // Rename publicToken to processorToken
        bankName,
      });
  
      if (!fundingSourceUrl) throw new Error("Error creating funding source");
  
      // Simulate or retrieve an accessToken
      const accessToken = `accessToken-${Date.now()}`; // Replace with actual accessToken from Mono or another source
  
      const sharableId = `mono-${Date.now()}`;
  
      // Save the bank account in Appwrite
      await createBankAccount({
        userId,
        bankId: fundingSourceUrl, // Use fundingSourceUrl as a unique identifier for simplicity
        accountId: fundingSourceUrl,
        accessToken,              // Include the required accessToken
        fundingSourceUrl,
        sharableId,
      });
  
      revalidatePath("/");
  
      return {
        success: true,
        message: "Bank account added successfully",
      };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error("Error adding Mono bank account:", errorMessage);
        return {
          success: false,
          message: "Failed to add bank account",
          error: errorMessage,
        };
      }
    };
  
export const getBanks = async ({ userId }: GetBanksProps) => {
  try {
    const { database } = await createAdminClient();

    const banks = await database.listDocuments(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );

    return banks.documents;
  } catch (error) {
    console.error("Error fetching banks:", error);
  }
};
