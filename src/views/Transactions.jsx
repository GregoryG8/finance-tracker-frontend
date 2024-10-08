import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import ModalFormEdit from "../components/ModalFormEdit";
import { IconButton } from "@mui/material";
import {
  MdOutlineEdit,
  MdOutlineAddCircleOutline,
  MdOutlineDeleteOutline,
} from "react-icons/md";
import ModalFormCreate from "../components/ModalFromCreate";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [error, setError] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

  // Fetch transactions from the API when the component mounts
  const fetchTransactions = async () => {
    try {
      const response = await fetch("http://localhost:4343/transactions");
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setTransactions(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Handle click event for editing a transaction
  const handleEditClick = (transaction) => {
    setSelectedTransaction(transaction);
    setOpenEdit(true);
  };

  // Handle delete action for a transaction
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        const response = await fetch(
          `http://localhost:4343/transactions/${id}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        // Refresh the transactions list after deletion
        refreshTransactions();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  // Handle click event for creating a new transaction
  const handleCreateClick = () => {
    setOpenCreate(true);
  };

  // Handlers for opening and closing modals
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  const handleOpenCreate = () => setOpenCreate(true);
  const handleCloseCreate = () => setOpenCreate(false);

  // Refresh transactions list
  const refreshTransactions = () => {
    fetchTransactions();
  };

  console.log(error);

  return (
    <>
      <NavBar />
      <main className="flex h-full justify-center items-center">
        <div className="relative w-3/4 h-3/4 overflow-x-auto shadow-md sm:rounded-3xl">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
              Financial Transactions Overview
              <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                Explore and manage your financial transactions, including income
                and expenses. This table provides a comprehensive view of your
                financial activities, allowing you to track your spending,
                categorize transactions, and maintain control over your budget.
              </p>
              <IconButton
                aria-label="create"
                onClick={() => handleCreateClick()}
              >
                <MdOutlineAddCircleOutline />
              </IconButton>
            </caption>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="bg-white cursor-pointer border-b hover:bg-primary dark:bg-gray-800 dark:border-gray-700"
                >
                  <th scope="row" className="px-6 py-4">
                    {transaction.id}
                  </th>
                  <td className="px-6 py-4">{transaction.type}</td>
                  <td className="px-6 py-4">${transaction.amount}</td>
                  <td className="px-6 py-4">{transaction.date}</td>
                  <td className="px-6 py-4">{transaction.description}</td>
                  <td className="px-6 py-4">{transaction.category.name}</td>
                  <td className="px-6 py-4 text-right">
                    <IconButton
                      aria-label="update"
                      onClick={() => handleEditClick(transaction)}
                    >
                      <MdOutlineEdit />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDelete(transaction.id)}
                    >
                      <MdOutlineDeleteOutline />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ModalFormEdit
          transaction={selectedTransaction}
          handleOpen={handleOpenEdit}
          handleClose={handleCloseEdit}
          openModal={openEdit}
          onUpdate={refreshTransactions}
        />
        <ModalFormCreate
          handleOpen={handleOpenCreate}
          handleClose={handleCloseCreate}
          openModal={openCreate}
          onUpdate={refreshTransactions}
        />
      </main>
    </>
  );
}
