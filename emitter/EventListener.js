const { SchemaTypes } = require("@protagonists/coerce");
const Options = require("./Options");

class EventListener {
  constructor(callback, options) {
    callback = new SchemaTypes._Function_().call(callback);
    options = Options(options || {});
    
    if(callback === undefined)
      throw new Error("EventListener: Constructor parameter 'callback' is not a function");

    Object.defineProperties(this, {
      run: {
        enumerable: true,
        value: function run(...args) { callback(...args) }
      },
      once: {
        enumerable: true,
        value: options.once
      },
      order: {
        enumerable: true,
        value: options.order
      },
      overridable: {
        enumerable: true,
        value: options.overridable
      },
      enabled: {
        enumerable: true,
        value: options.enabled
      }
    });
  }
}

module.exports = EventListener;
