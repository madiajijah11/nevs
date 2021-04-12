const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8080",
};

app.use(cors(corsOptions));

//PARSING REQUEST DARI Content-Type - Application/Json
app.use(bodyParser.json());

//PARSING REQUEST DARI Content-Type - Application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//DATABASE
const db = require("./models");
const Role = db.role;

db.sequelize.sync();
//db.sequelize.sync({ force: true }).then(() => {
  //console.log("Drop dan re-sync database.");
  //initial();
//});

app.get("/", (req, res) => {
  res.json({ message: "Apa yang kamu lakukan disini??" });
});

//ROUTERS
require("./routes/auth.routes")(app);
require("./routes/pengguna.routes")(app);

// SETTING PORT
const PORT = process.env.PORT || 3000;
// JALANKAN SERVER
app.listen(PORT, () => console.log(`Server bekerja pada port ${PORT}`));

function initial() {
  Role.create({
    id: 1,
    nama: "pengguna",
  });

  Role.create({
    id: 2,
    nama: "moderator",
  });

  Role.create({
    id: 3,
    nama: "admin",
  });
}