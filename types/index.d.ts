/* eslint-disable no-unused-vars */

// Route Parameter Types
declare type SearchParamProps = {
  params: Record<string, string>;
  searchParams: Record<string, string | string[] | undefined>;
};

// ========================================

// User Management
declare type SignUpParams = {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  email: string;
  password: string;
  phoneNumber?: string;
};

declare type LoginUser = {
  email: string;
  password: string;
};

declare type User = {
  $id: string;
  email: string;
  userId: string;
  monoCustomerUrl: string;
  monoCustomerId: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  name: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
};

declare type NewUserParams = {
  userId: string;
  email: string;
  name: string;
  password: string;
};

// Account and Bank Management
declare type Account = {
  id: string;
  availableBalance: number;
  currentBalance: number;
  officialName?: string;
  mask: string;
  institutionId: string;
  name: string;
  type: string;
  subtype: string;
  appwriteItemId: string;
  sharableId: string;
};

declare type Bank = {
  $id: string;
  accountId: string;
  bankId: string;
  accessToken: string;
  fundingSourceUrl: string;
  userId: string;
  sharableId: string;
};

declare type AccountTypes = "depository" | "credit" | "loan" | "investment" | "other";

// Transaction Management
declare type Transaction = {
  id: string;
  $id: string;
  name: string;
  paymentChannel: string;
  type: string;
  accountId: string;
  amount: number;
  pending: boolean;
  category: string;
  date: string;
  image?: string;
  $createdAt: string;
  channel?: string;
  senderBankId?: string;
  receiverBankId?: string;
};

declare type Category = "Food and Drink" | "Travel" | "Transfer";

declare type CategoryCount = {
  name: string;
  count: number;
  totalCount: number;
};

// Funding Source and Transfers
declare type TransferParams = {
  sourceFundingSourceUrl: string;
  destinationFundingSourceUrl: string;
  amount: string;
};

declare type AddFundingSourceParams = {
  monoCustomerId: string;
  processorToken?: string;
  bankName: string;
};

declare interface CreateFundingSourceOptions {
  customerId: string; // Mono or Flutterwave Customer ID
  fundingSourceName: string; // Funding Source Name
  plaidToken?: string; // Plaid Processor Token (if applicable)
  monoCustomerId: string;
  bankName: string;
}

// Flutterwave Integration
declare type FlutterwaveCustomer = {
  firstName: string;
  lastName: string;
  email: string;
  type: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
};

// UI Component Props
declare interface CreditCardProps {
  account: Account;
  userName: string;
  showBalance?: boolean;
}

declare interface BankInfoProps {
  account: Account;
  appwriteItemId?: string;
  type: "full" | "card";
}

declare interface HeaderBoxProps {
  type?: "title" | "greeting";
  title: string;
  subtext: string;
  user?: string;
}

declare interface MobileNavProps {
  user: User;
}

declare interface PageHeaderProps {
  topTitle: string;
  bottomTitle: string;
  topDescription: string;
  bottomDescription: string;
  connectBank?: boolean;
}

declare interface PaginationProps {
  page: number;
  totalPages: number;
}

declare interface TotalBalanceBoxProps {
  accounts: Account[];
  totalBanks: number;
  totalCurrentBalance: number;
}

// Actions
declare interface GetAccountsProps {
  userId: string;
}

declare interface GetAccountProps {
  appwriteItemId: string;
}

declare interface GetInstitutionProps {
  institutionId: string;
}

declare interface GetTransactionsProps {
  accessToken: string;
}

declare interface CreateTransactionProps {
  name: string;
  amount: string;
  senderId: string;
  senderBankId: string;
  receiverId: string;
  receiverBankId: string;
  email: string;
}

declare interface GetTransactionsByBankIdProps {
  bankId: string;
}

declare interface SignInProps {
  email: string;
  password: string;
}

declare interface GetUserInfoProps {
  userId: string;
}

declare interface ExchangePublicTokenProps {
  publicToken: string;
  user: User;
}

declare interface CreateBankAccountProps {
  userId: string;
  bankId: string;
  accountId: string;
  accessToken: string; // Required
  fundingSourceUrl: string;
  sharableId: string;
}

declare interface GetBanksProps {
  userId: string;
}

declare interface GetBankProps {
  documentId: string;
}

declare interface GetBankByAccountIdProps {
  accountId: string;
}
