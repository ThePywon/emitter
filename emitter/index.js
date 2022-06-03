"use strict";

const EventListener = require("./EventListener");

function Emitter() {
  const events = new Map();
  const defaults = new Map();
  
  Object.defineProperties(this, {
    events: {
      enumerable: true,
      get: () => {
        const result = new Map();

        for(const key of events.keys())
          result.set(key, Array.from(events.get(key)));

        return result;
      }
    },
    defaults: {
      enumerable: true,
      value: defaults
    }
  });

  Object.defineProperty(this, "setDefault", {
    enumerable:true,
    value:(name, callback, overridable) => {
      if(typeof name !== "string") throw new Error("Emitter event name must be of type String.");
      if(typeof callback !== "function") throw new Error("Emitter event callback must be of type Function.");
  
      if(defaults.get(name) && !defaults.get(name).overridable)
        throw new Error("Default event callback non overridable");

      defaults.set(name, new EventListener(callback, {
        order: 0,
        overridable: !!overridable,
        enabled: !defaults[name] || defaults[name].enabled
      }));
      return this;
    },
    writable:false
  });

  Object.defineProperty(this, "disableDefault", {
    enumerable:true,
    value:(name) => {
      if(defaults.get(name)) defaults.get(name).enabled = false;
      return this;
    },
    writable:false
  });

  Object.defineProperty(this, "enableDefault", {
    enumerable: true,
    value: (name) => {
      if(defaults.get(name)) defaults.get(name).enabled = true;
      else throw new Error("Default event behaviour is undefined!");
      return this;
    },
    writable: false
  });

  

  Object.defineProperty(this, "on", {
    enumerable: true,
    value: (name, callback, order) => {
      if(typeof name != "string") throw new Error("Emitter event name must be of type String.");
      if(typeof callback != "function") throw new Error("Emitter event callback must be of type Function.");

      if(!events.get(name))
        events.set(name, []);
      
      events.get(name).push(new EventListener(callback, { order }));
      events.get(name).sort((a, b) => a.order - b.order);
      return this;
    },
    writable: false
  });

  Object.defineProperty(this, "pre", {
    enumerable: true,
    value: (name, callback) => {
      this.on(name, callback, 0);
    }
  });

  Object.defineProperty(this, "pro", {
    enumerable: true,
    value: (name, callback) => {
      this.on(name, callback, 2);
    }
  });

  Object.defineProperty(this, "once", {
    enumerable:true,
    value: (name, callback, order) => {
      if(typeof name != "string") throw new Error("Emitter event name must be of type String.");
      if(typeof callback != "function") throw new Error("Emitter event callback must be of type Function.");

      if(!events.get(name))
        events.set(name, []);
      
      events.get(name).push(new EventListener(callback, {once: true, order}));
      events.get(name).sort((a, b) => a.order - b.order);
      return this;
    }
  });

  Object.defineProperty(this, "emit", {
    enumerable: true,
    value: (name, ...args) => {
      if(typeof name != "string") throw new Error("Emitter event name must be of type String.");
    
      if(defaults.get(name) && defaults.get(name).enabled)
        defaults.get(name).run(...args);

      for(let i = 0; i < events.get(name).length; i++) {
        const _events = events.get(name);
        _events.sort((a, b) => a.order - b.order);
        
        if(_events[i].once) {
          _events[i].run(...args);
          _events.splice(i, 1);
          i--;
        }
        else _events[i].run(...args);
      }

      return this;
    }
  });
}

Emitter.setEmitter = Emitter.call;

Object.defineProperties(Emitter.prototype, {
  valueOf: {
    value: () => {return this.events}
  },
  toString: {
    value: () => {return "[object Emitter]"}
  }
});

module.exports = Emitter;
