import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatAmount, getTransactionStatus } from "@/lib/utils";

import React from "react";

const TransactionsTable = ({transactions}: TransactionTableProps) => {
  return (
    <Table>
      <TableHeader className="bg-[#FDF6FF7A]">
        <TableRow >
            <TableHead className="px-2">Transactions</TableHead>
            <TableHead className="px-2">Amount</TableHead>
            <TableHead className="px-2">Status</TableHead>
            <TableHead className="px-2">Date</TableHead>
            <TableHead className="px-2 max-md:hidden">Channel</TableHead>
            <TableHead className="px-2 max-md:hidden">Category</TableHead>        
        </TableRow>
      </TableHeader>
      <TableBody>
       {transactions.map((t:Transaction) => {
        const status =getTransactionStatus(new Date(t.date))
        const amount = formatAmount(t.amount)
        const isDebit = t.type === 'debit';
        const isCredit = t.type === 'credit';
        
        return(
            <TableRow key={t.id}>
                <TableCell>
                    <div>
                        <h1>
                            {t.name}
                        </h1>
                    </div>
                </TableCell>
            </TableRow>
        )

       })}
      </TableBody>
    </Table>
  );
};

export default TransactionsTable;
