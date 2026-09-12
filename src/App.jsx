import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Rates from "./pages/Rates";
import History from "./pages/History";
import About from "./pages/About";
import "./index.css";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="rates" element={<Rates />} />
        <Route path="history" element={<History />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  );
}
