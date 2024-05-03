import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import FormTableUpdate from "./components/FormTableUpdate";
import FormTable from "./components/FormTable";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8080"; // Corrected baseURL syntax

function App() {

  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false); // Add editSection state
  
  const [formData, setFormData] = useState({
    name: "",
  });
  const [formDataEdit, setFormDataEdit] = useState({
    name: "",
    _id: "",
  });
  const [dataList, setDataList] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State to store search term

  const handelOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post("/create", formData);
    console.log(data);
    if (data.data.success) {
      setAddSection(false);
      getFetchData();
    }
  };

  const getFetchData = async () => {
    const data = await axios.get("/");
    console.log(data);
    if (data.data.success) {
      setDataList(data.data.data);
    }
  };
  useEffect(() => {
    getFetchData();
  }, []);

  const handleDelete = async (id) => {
    const data = await axios.delete("/delete/" + id);

    if (data.data.success) {
      getFetchData();
      alert(data.data.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = await axios.put("/update", formDataEdit);
    if (data.data.success) {
      setEditSection(false);
      getFetchData();
    }
  };

  const handelEditOnChange = async (e) => {
    const { value, name } = e.target;
    setFormDataEdit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = (el) => {
    setFormDataEdit(el);
    setEditSection(true);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    if (searchTerm.trim() === "") {
      getFetchData();
      return;
    }
    const filteredData = dataList.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );
    setDataList(filteredData);
  };

  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <div className="container">
          <div className="navbar-brand">Ticketmaster</div>
          <button className="btn btn-add" onClick={() => setAddSection(true)}>
            Create new ticket
          </button>
        </div>
      </nav>

      {addSection && (
        <FormTable
          handleSubmit={handleSubmit}
          handelOnChange={handelOnChange}
          handelClose={() => setAddSection(false)}
        />
      )}
      {editSection && (
        <FormTableUpdate
          handleSubmit={handleUpdate}
          handelOnChange={handelEditOnChange}
          handelClose={() => setEditSection(false)}
          rest={formDataEdit}
        />
      )}

      <div className="tableContainer table-responsive ">
        <div
          className="search-container"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th style={{ textAlign: "left" }}>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dataList[0] ? (
              dataList.map((el, index) => {
                return (
                  <tr key={index}>
                    <td>#{el.sequentialNumber}</td>
                    <td style={{ textAlign: "left" }}>{el.name}</td>
                    <td>
                      <button
                        className="btn btn-edit"
                        onClick={() => handleEdit(el)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-delete"
                        onClick={() => handleDelete(el._id)} // Corrected parameter name to `el._id`
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <h5 className="no-data">Oops. No tickets.</h5>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
