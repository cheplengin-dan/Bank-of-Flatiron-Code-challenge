import React, { useEffect, useState } from "react";
import TransactionList from "./TransactionList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {

  const transactionsUrl = "http://localhost:4001/transactions"
  const [transactions, setTransactions]  = useState([]);

  // Fetch Transactions
  useEffect(() => {
    fetch(`${transactionsUrl}`)
      .then(response => response.json())
      .then(data => setTransactions(data));
  }, [])

  // Create a new transaction
  function addNewTransaction(newTransaction) {
    const updatedTransactions = [...transactions, newTransaction]
    setTransactions(updatedTransactions);
  }

  // Delete a transaction
  function deleteTransaction(id) {
    const updatedTransactions = transactions.filter(transaction => transaction.id !== id);
    setTransactions(updatedTransactions);
  }

  // Search Functionality
  const [search, setSearch] = useState("")

  // Sort Functionality
  const [sortStrategy, setSortStrategy] = useState({
    date: -1,
    description: -1,
    category: -1,
    amount: -1
  })

  function sortTransactionList(event) {
    const sortBy = event.target.textContent.toLowerCase();
    const updatedSortStrategy = { ...sortStrategy, [sortBy]: sortStrategy[sortBy] * -1 };
    setSortStrategy(updatedSortStrategy);
  }

  let sortedTransactions = [...transactions];

  if (sortStrategy.date !== 0) {
    sortedTransactions = sortedTransactions.sort((a, b) => {
      return sortStrategy.date * (new Date(b.date) - new Date(a.date));
    });
  }

  if (sortStrategy.description !== 0) {
    sortedTransactions = sortedTransactions.sort((a, b) => {
      const x = a.description.toLowerCase();
      const y = b.description.toLowerCase();
      return sortStrategy.description * (x < y ? -1 : x > y ? 1 : 0);
    });
  }

  if (sortStrategy.category !== 0) {
    sortedTransactions = sortedTransactions.sort((a, b) => {
      const x = a.category.toLowerCase();
      const y = b.category.toLowerCase();
      return sortStrategy.category * (x < y ? -1 : x > y ? 1 : 0);
    });
  }

  if (sortStrategy.amount !== 0) {
    sortedTransactions = sortedTransactions.sort((a, b) => {
      return sortStrategy.amount * (b.amount - a.amount);
    });
  }

  sortedTransactions = sortedTransactions.filter((transaction) => {
    const { date, description, category } = transaction;
    const searchString = search.toLowerCase().trim();
    return (
      date.toLowerCase().includes(searchString) ||
      description.toLowerCase().includes(searchString) ||
      category.toLowerCase().includes(searchString)
    );
  });

  return (
    <div>
      <Search search={search} setSearch={setSearch} />
      <AddTransactionForm onAddTransaction={addNewTransaction} />
      <TransactionList
        transactions={sortedTransactions}
        onDeleteTransaction={deleteTransaction}
        search={search}
        setTransactions={setTransactions}
        sortTransactionList={sortTransactionList}
        sortStrategy={sortStrategy}
      />
    </div>
  );
}

export default AccountContainer;