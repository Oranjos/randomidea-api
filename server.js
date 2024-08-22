const path = require("path");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 8000;
const connectDB = require("./config/db");

connectDB();

const app = express();

// Static folder
app.use(express.static(path.join(__dirname, "public")));

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cors middleware
app.use(
  cors({
    origin: ["http://localhost:8000", "http://localhost:3000"],
    credentials: true,
  })
);

//  app route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the RandomIdeas API" });
});

const ideasRouter = require("./routes/ideas");
app.use("/api/ideas", ideasRouter);

app.listen(port, () => console.log(`Server is listening on port ${port}`));
