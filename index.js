"use strict";

const LockedArray = require("./locked_array.js");
const plus = require("./object-plus.js");

function Emitter() {
  const events = new LockedArray();
  const eventKey = events.key;
  const defaults = {};
  
  Object.defineProperties(this, {
    events:{
      enumerable:true,
      get:()=>{return events.value}
    },
    defaults:{
      enumerable:true,
      get:()=>{return defaults}
    }
  });

  Object.defineProperty(this, "setDefault", {
    enumerable:true,
    value:function Default(name, callback, overridable) {
      if(typeof name !== "string") throw new Error("Emitter event name must be of type String.");
      if(typeof callback !== "function") throw new Error("Emitter event callback must be of type Function.");

      if(defaults[name] && !defaults[name].overridable)
        throw new Error("Default event callback non overridable");
      
      defaults[name] = {name,callback,overridable,enabled:!defaults[name]||defaults[name].enabled};
    },
    writable:false
  });

  Object.defineProperty(this, "disableDefault", {
    enumerable:true,
    value:function disableDefault(name) {
      if(defaults[name])
        defaults[name].enabled = false;
    },
    writable:false
  });

  Object.defineProperty(this, "enableDefault", {
    enumerable:true,
    value:function enableDefault(name) {
      defaults[name] ? defaults[name].enabled = true : defaults[name] = {enabled:true};
    },
    writable:false
  });

  Object.defineProperty(this, "on", {
    enumerable:true,
    value:function on(name, callback) {
      if(typeof name != "string") throw new Error("Emitter event name must be of type String.");
      if(typeof callback != "function") throw new Error("Emitter event callback must be of type Function.");

      events.unlock(eventKey);
      events.add({name,callback});
      events.lock();
    },
    writable:false
  });

  Object.defineProperty(this, "once", {
    enumerable:true,
    value:function once(name, callback) {
      if(typeof name != "string") throw new Error("Emitter event name must be of type String.");
      if(typeof callback != "function") throw new Error("Emitter event callback must be of type Function.");

      events.unlock(eventKey);
      events.add({name,callback,once:true});
      events.lock();
    },
    writable:false
  });

  Object.defineProperty(this, "emit", {
    enumerable:true,
    value:function emit(name, ...args) {
      if(typeof name != "string") throw new Error("Emitter event name must be of type String.");
    
      if(this.defaults[name] && this.defaults[name].enabled && this.defaults[name].callback)
        this.defaults[name].callback(...args);

      let deletion = [];
      for(let i = 0; i < this.events.length; i++)
        if(this.events[i].name === name)
          if(this.events[i].once) {
            deletion.push(this.events[i]);
            this.events[i].callback(...args);
          }
          else this.events[i].callback(...args);
      
      for(let i = 0; i < deletion.length; i++) {
        events.unlock(eventKey);
        events.remove(this.events[i]);
        events.lock();
      }
    },
    writable:false
  });
}

Object.defineProperty(Emitter, "setEmitter", {
  enumerable:true,
  value:function setEmitter(obj) {
    plus.inheritBaseProperties(obj, new Emitter());
  },
  writable:false
});

Object.defineProperties(Emitter.prototype, {
  valueOf:{
    value:function valueOf() {return this.events}
  },
  toString:{
    value:function toString() {return "[object Emitter]"}
  }
});

module.exports = Emitter;
