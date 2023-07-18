require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const server = require("http").createServer(app);

app.get("/", (req, res) => {
  res.send("hello yellow world");
});

// const employees = require("./employees");

app.use(express.json({ limit: "256mb" }));

app.use(express.urlencoded({ limit: "256mb", extended: true }));

app.use(cors());

app.use(require("./middleware/api-response")); // Adding usefull functions for api responses
app.use(require("./middleware/api-routes")); // Binding all routes with controllers
app.use(require("./middleware/all-errors")); // Handling route fallback, and any expected errors in app




const port = process.env.API_PORT || 9000;
server.listen(port, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`server started listening on ${port}`);
  }
});


