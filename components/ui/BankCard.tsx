import { formatAmount } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Copy from "./Copy";

const BankCard = ({
  account,
  userName,
  className,
  showBalance = true,
}: CreditCardProps & { className?: string }) => {
  return (
    <div className="flex flex-col">
      <Link
        href={`/transaction-history/?id=${account.appwriteItemId}`}
        className="bank-card "
      >
        <div className="bank-card_content">
          <div className="flex">
            <h1
              className="text-16 font-semibold 
                    text-white"
            >
              {account.name}
            </h1>
            <Image
            src="/icons/mastercardlogo.svg"
            width={30}
            height={32}
            alt="mastercard"
            className="ml-auto"
          />
          </div>
          <div>
            <h1 className="text-[#FFFFFF66] tracking-[3px] pt-4 ">
              Card  Balance
            </h1>

        <div className="flex mt-1">
          <p
              className="font-ibm-plex-serif font-black 
                    text-white"
            >
              {formatAmount(account.currentBalance)}
            </p>

             <Image
            src="/icons/chip.svg"
            width={25}
            height={25}
            alt="chip"
            className="ml-28"
          />
          <Image
            src="/icons/wifi.svg"
            width={25}
            height={25}
            alt="mastercard"
            className="ml-auto"
          />
          </div>
          </div>
          <div className="flex flex-col gap-2 bg-[#0E0E0E] mt-5 mx-[-20px] rounded-b-xl">
            <div className="flex justify-between">
              <h1
                className="text-12 font-semibold
                         text-[#FFFFFF9E] ml-4 mt-2"
              >
                 ●●/●●
              </h1>
              <h2
                className="text-12 font-normal
                          text-white tracking-[1.1px] mr-1 mt-2"
              >
              ●●●● ●●●● ●●●● <span >1234</span>
              </h2>
            </div>
            <p
              className="
                    text-white text-12 font-normal ml-4"
            >
              {userName}
            </p>
            
            
          </div>
        </div>

       
       
      </Link>
      {showBalance && <Copy title={account?.shareableId} />}
    </div>
  );
};

export default BankCard;
