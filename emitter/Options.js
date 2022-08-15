const { Schema } = require("@protagonists/coerce");
const { BooleanType, IntRange } = require("@protagonists/coerce-basics");

const Options = new Schema({
  once: BooleanType,
  order: IntRange(0, 2),
  enabled: BooleanType,
  overridable: BooleanType
});

Options.setDefaults({
  once: false,
  order: 1,
  enabled: true,
  overridable: false
});

module.exports = Options;
