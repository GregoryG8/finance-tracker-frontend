import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  // useEffect para hacer la solicitud HTTP cuando el componente se monte
  useEffect(() => {
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

    fetchTransactions();
  }, []);
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
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
