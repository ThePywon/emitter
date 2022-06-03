const { Schema, SchemaTypes } = require("@protagonists/coerce");

const Options = new Schema({
  once: Boolean,
  order: SchemaTypes.IntRange(0, 2),
  enabled: Boolean,
  overridable: Boolean
});

Options.setDefaults({
  once: false,
  order: 1,
  enabled: true,
  overridable: false
});

module.exports = Options;
