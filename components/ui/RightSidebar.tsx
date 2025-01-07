import Image from "next/image";
import Link from "next/link";
import React from "react";
import BankCard from "./BankCard";
import { countTransactionCategories } from "@/lib/utils";
import Category from "./Category";

const RightSidebar = ({ user, transactions, banks }: RightSidebarProps) => {
  const categories: CategoryCount[] = countTransactionCategories(transactions);
  console.log(categories);

  return (
    <aside className="right-sidebar">
     
      <section className="banks">
        <div className="flex w-full justify-between">
          <h2 className="header-2">My Banks</h2>
          <Link href="/" className="flex gap-2">
            <Image
              src="/icons/plus.svg"
              width={20}
              height={20}
              alt="plus"
              className="text-[#8906BF]"
            />
            <h2
              className="text-14 text-[#8906BF]
                    font-semibold"
            >
              Add bank
            </h2>
          </Link>
        </div>

        {banks?.length > 0 && (
          <div
            className="relative flex flex-1 flex-col
                items-center gap-5"
          >
            <div className="relative z-10">
              <BankCard
                key={banks[0].$id}
                account={banks[0]}
                userName={`${user.firstName} ${user.lastName}`}
                showBalance={false}
                className="bank-gradient"
              />
            </div>
            {banks[1] && (
              <div className="absolute left-0 top-[3rem] z-10 w-[90%]">
                <BankCard
                  key={banks[1].$id}
                  account={banks[1]}
                  userName={`${user.firstName} ${user.lastName}`}
                  showBalance={false}
                  className="card-gradient"
                />
              </div>
            )}
          </div>
        )}
        <div className="mt-10 flex flex-1 flex-col gap-6">
          <h2 className="header-2">Top Categories</h2>
          <div className="space-y-5">
            {categories.map((category, index) => (
              <Category key={category.name} category={category} />
            ))}
          </div>
        </div>
      </section>
    </aside>
  );
};

export default RightSidebar;
