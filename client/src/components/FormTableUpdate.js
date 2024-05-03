import React from "react";
import { MdClose } from "react-icons/md";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
const FormTableUpdate = ({
  handleSubmit,
  handelOnChange,
  handelClose,
  rest,
}) => {
  return (
    <div className="addContainer">
      <form onSubmit={handleSubmit}>
        <div className="close-btn" onClick={handelClose}>
          <MdClose />
        </div>
        <h2>Edit a ticket</h2>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          name="name"
          value={rest.name}
          onChange={handelOnChange}
        />
        <button type="submit" className="btn">
          Create
        </button>
      </form>
    </div>
  );
};

export default FormTableUpdate;
