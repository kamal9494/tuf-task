const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const codeRoutes = require("./routes/codeRoutes");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/", codeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
