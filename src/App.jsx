import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Searched from "./pages/Searched";

const App = () => {
  return (
    <Routes>
      <Route path="/search" element={<Searched />}></Route>
      <Route path="/" element={<Home />}></Route>
    </Routes>
  );
};

export default App;
