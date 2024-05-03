const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());






const PORT = process.env.PORT || 8080;


const schemaData = new mongoose.Schema(
  {
    name: { type: String, required: true },
    // Remove the unique index from sequentialNumber
    sequentialNumber: { type: Number },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to generate unique sequential number
schemaData.pre("save", async function (next) {
  if (!this.sequentialNumber) {
    const lastDocument = await userModel.findOne(
      {},
      {},
      { sort: { sequentialNumber: -1 } }
    );
    if (lastDocument) {
      this.sequentialNumber = lastDocument.sequentialNumber + 1;
    } else {
      // If no documents exist, start sequential number from 1
      this.sequentialNumber = 1;
    }
  }
  next();
});

const userModel = mongoose.model("user", schemaData);

// read
//​http://localhost:8080/
app.get("/", async (req, res) => {
  try {
    const data = await userModel.find({});
    res.json({ success: true, data: data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


// create data || save data in mongoDB
//​http://localhost:8080/create
app.post("/create", async (req, res) => {
  console.log(req.body);
  const data = new userModel(req.body);
  await data.save();
  res.json({ success: true, message: "Ticket saved successfully", data: data });
});

// update data 
//​http://localhost:8080/update
app.put("/update", async (req, res) => {
  console.log(req.body);
  const {_id, ...rest} = req.body;

  console.log(rest);
  const data = await userModel.updateOne({_id : _id},rest);
  res.json({ success: true, message: "Ticket updated successfully", data: data });
});


// delete data 
//​http://localhost:8080/delete/id
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const data = await userModel.deleteOne({ _id : id });
  res.json({
    success: true,
    message: "Ticket deleted successfully",
    data: data,
  });
});









// Connect to MongoDB and start server
mongoose
  .connect("mongodb://localhost:27017/crudtest")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));
