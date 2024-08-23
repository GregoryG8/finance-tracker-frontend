import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

export default function ModalForm({
  transaction,
  handleClose,
  handleOpen,
  openModal,
  onUpdate,
}) {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    type: "",
    amount: "",
    category: "",
    date: "",
    description: "",
  });
  const [error, setError] = useState(null);

  ModalForm.propTypes = {
    transaction: PropTypes.shape({
      id: PropTypes.number,
      type: PropTypes.string,
      amount: PropTypes.number.toString,
      category: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
      date: PropTypes.string,
      description: PropTypes.string,
    }),
    handleClose: PropTypes.func.isRequired,
    handleOpen: PropTypes.func.isRequired,
    openModal: PropTypes.bool.isRequired,
    onUpdate: PropTypes.func,
  };

  useEffect(() => {
    if (transaction) {
      setFormData({
        id: transaction.id,
        type: transaction.type,
        amount: transaction.amount,
        category: transaction.category.name,
        date: transaction.date,
        description: transaction.description,
      });
      handleOpen;
    }
  }, [transaction, handleOpen]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:4343/categories");
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Asegúrate de que amount sea un número
    const updatedData = {
      ...formData,
      amount: parseFloat(formData.amount), // Convertir a número
      category: {
        id: categories.find((cat) => cat.name === formData.category).id,
        name: formData.category,
      },
    };

    console.log("Amount as a number:", updatedData.amount); // Verifica el valor aquí

    try {
      const response = await fetch(
        `http://localhost:4343/transactions/${transaction.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      handleClose();
      if (onUpdate) onUpdate();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle} className="relative bg-white">
          <div className="flex items-center justify-between">
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              className="text-lg font-bold"
            >
              Edit Transaction
            </Typography>
            <Button onClick={handleClose}>
              <span className="text-xl">×</span>
            </Button>
          </div>

          <form className="p-4 md:p-5" onSubmit={handleSubmit}>
            {error && <p className="text-red-500">{error}</p>}
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="type"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                >
                  <option value="" aria-disabled>
                    Select Type
                  </option>
                  <option value="INCOME">INCOME</option>
                  <option value="EXPENSE">EXPENSE</option>
                </select>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="amount"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Amount
                </label>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="$2999"
                  required
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                >
                  <option value="" aria-disabled>
                    Select category
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="date"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write description here"
                  required
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="me-1 -ms-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"></path>
              </svg>
              Update Transaction
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
