import React from 'react'
import { MdClose } from "react-icons/md";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
const FormTable = ({ handleSubmit, handelOnChange, handelClose }) => {
  return (
    <div className="addContainer">
      <form onSubmit={handleSubmit}>
        <div className="close-btn" onClick={handelClose}>
          <MdClose />
        </div>
        <h2>Create a ticket</h2>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter ticket name"
          onChange={handelOnChange}
          required
        />
        <button type="submit" className="btn">
          Create
        </button>
      </form>
    </div>
  );
};

export default FormTable;
