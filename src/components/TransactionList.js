import React from "react";
import Transaction from "./Transaction";

function TransactionList({
  transactions,
  onDeleteTransaction,
  search,
  setTransactions,
  sortTransactionList,
  sortStrategy,
}) {
  return (
    <table className="ui celled table">
      <thead>
        <tr>
          <th className="sortable"
      onClick={sortTransactionList}
      style={sortStrategy.date !== 0 ? { textDecoration: "underline" } : null}
    >
      Date
    </th>
    <th
      className="sortable"
      onClick={sortTransactionList}
      style={sortStrategy.description !== 0 ? { textDecoration: "underline" } : null}
    >
      Description
    </th>
    <th
      className="sortable"
      onClick={sortTransactionList}
      style={sortStrategy.category !== 0 ? { textDecoration: "underline" } : null}
    >
      Category
    </th>
    <th
      className="sortable"
      onClick={sortTransactionList}
      style={sortStrategy.amount !== 0 ? { textDecoration: "underline" } : null}
    >
      Amount
    </th>
    <th>Actions</th>
  </tr>
  </thead>
  <tbody>
    {transactions.map((transaction) => {
      return (
        <Transaction
          key={transaction.id}
          transaction={transaction}
          onDeleteTransaction={onDeleteTransaction}
          setTransactions={setTransactions}
        />
      );
    })}
  </tbody>
</table>
  );
}

export default TransactionList;