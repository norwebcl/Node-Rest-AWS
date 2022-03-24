module.exports = app => {
  const personas = require("../controllers/persona.controller.js");

  var router = require("express").Router();

  router.post("/", personas.create);

  router.get("/", personas.findAll);

  router.get("/activo", personas.findAllActivo);

  router.get("/:id", personas.findOne);

  router.put("/:id", personas.update);

  router.delete("/:id", personas.delete);

  router.delete("/", personas.deleteAll);

  app.use("/api/personas", router);
};
