module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      nombre: String,
      apellido: String,
      activo: Boolean
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Persona = mongoose.model("persona", schema);
  return Persona;
};
