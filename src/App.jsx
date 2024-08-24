import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./views/Home";
import "./App.css";
import Transactions from "./views/Transactions";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Define the route for the homepage */}
        <Route path="/" element={<Home />} />

        {/* Define the route for the transactions page */}
        <Route path="/transactions" element={<Transactions />} />

        {/* Redirect any unknown route to the homepage */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
