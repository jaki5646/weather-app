import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import "../css/Form.css";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState("");
  const handleChange = (e) => {
    setInput(e.target.value)
  }
  const handleClick = (e) => {
    e.preventDefault();
    setInput("")
    navigate(`/search?key=${input}`);
  };

  return (
    <form>
      <input
        type="text"
        placeholder="Enter your location"
        onChange={handleChange}
        value={input}
      />
      <button onClick={handleClick}>
        <CiSearch />
      </button>
    </form>
  );
};

export default Form;
