// index.js

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

// SETTING PORT
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// TAMBAH ROUTES
const router = require("./routes/router.js");
app.use("/api", router);

// JALANKAN SERVER
app.listen(PORT, () => console.log(`Server bekerja pada port ${PORT}`));
