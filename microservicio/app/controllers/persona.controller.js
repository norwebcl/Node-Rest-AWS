const db = require("../models");
const Persona = db.personas;

// Nueva Persona
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nombre) {
    res.status(400).send({ message: "El contenido no puede estar vacio!" });
    return;
  }

  // Crear Persona
  const persona = new Persona({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    activo: req.body.activo ? req.body.activo : false
  });

  // Guardar Persona en bd
  persona
    .save(persona)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ha ocurrido un error."
      });
    });
};

// Todas las personas
exports.findAll = (req, res) => {
  const nombre = req.query.nombre;
  var condition = nombre ? { nombre: { $regex: new RegExp(nombre), $options: "i" } } : {};

  Persona.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
        err.message || "Ha ocurrido un error."
      });
    });
};

// Buscar persona por id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Persona.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "No existe la persona: " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "No se encuentra la persona " + id });
    });
};

// Actualizar persona por id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "La data no puede estar vacía"
    });
  }

  const id = req.params.id;

  Persona.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `No se encuentra la persona`
        });
      } else res.send({ message: "Persona actualizada." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error actualizando id: " + id
      });
    });
};

// Eliminar persona por id
exports.delete = (req, res) => {
  const id = req.params.id;

  Persona.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `No se puede eliminar la persona ${id}.`
        });
      } else {
        res.send({
          message: "La persona ha sido eliminada"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se puede eliminar el id: " + id
      });
    });
};

// Eliminar todas las personas.
exports.deleteAll = (req, res) => {
  Persona.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Personas fueron eliminadas`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error eliminando las personas."
      });
    });
e};

// Personas activas
exports.findAllActivo = (req, res) => {
  Persona.find({ activo: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error al cargar las personas activas."
      });
    });
};
