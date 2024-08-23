import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./views/Home";
import "./App.css";
import Transactions from "./views/Transactions";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/transactions" element={<Transactions/>}/>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
