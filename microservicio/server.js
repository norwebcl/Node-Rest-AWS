require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

console.log(db.url);

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Conectado a la base de datos!");
  })
  .catch(err => {
    console.log("No se puede conectar a la base de datos", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Bienvenido a MS Node.JS" });
});

require("./app/routes/persona.routes")(app);

const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server corriendo en puerto ${PORT}.`);
});
