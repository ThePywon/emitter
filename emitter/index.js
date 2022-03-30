"use strict";

const LockedArray = require("@protagonists/locked-array");

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
      get:()=>{return {...defaults}}
    }
  });

  Object.defineProperty(this, "setDefault", {
    enumerable:true,
    value:(function setDefault(name, callback, overridable) {
      if(typeof name !== "string") throw new Error("Emitter event name must be of type String.");
      if(typeof callback !== "function") throw new Error("Emitter event callback must be of type Function.");
  
      if(defaults[name] && !defaults[name].overridable)
        throw new Error("Default event callback non overridable");
        
      defaults[name] = {callback,overridable:!!overridable,enabled:!defaults[name]||defaults[name].enabled};
      return this;
    }).bind(this),
    writable:false
  });

  Object.defineProperty(this, "disableDefault", {
    enumerable:true,
    value:(function disableDefault(name) {
      if(defaults[name]) defaults[name].enabled = false;
      return this;
    }).bind(this),
    writable:false
  });

  Object.defineProperty(this, "enableDefault", {
    enumerable:true,
    value:(function enableDefault(name) {
      if(defaults[name]) defaults[name].enabled = true;
      else throw new Error("Default event behaviour is undefined!");
      return this;
    }).bind(this),
    writable:false
  });

  

  Object.defineProperty(this, "on", {
    enumerable:true,
    value:(function on(name, callback) {
      if(typeof name != "string") throw new Error("Emitter event name must be of type String.");
      if(typeof callback != "function") throw new Error("Emitter event callback must be of type Function.");

      events.unlock(eventKey);
      events.add({name,callback});
      events.lock();
      return this;
    }).bind(this),
    writable:false
  });

  Object.defineProperty(this, "once", {
    enumerable:true,
    value:(function once(name, callback) {
      if(typeof name != "string") throw new Error("Emitter event name must be of type String.");
      if(typeof callback != "function") throw new Error("Emitter event callback must be of type Function.");

      events.unlock(eventKey);
      events.add({name,callback,once:true});
      events.lock();
    }).bind(this),
    writable:false
  });

  Object.defineProperty(this, "emit", {
    enumerable:true,
    value:(function emit(name, ...args) {
      if(typeof name != "string") throw new Error("Emitter event name must be of type String.");
    
      if(this.defaults[name] && this.defaults[name].enabled && this.defaults[name].callback)
        this.defaults[name].callback(...args);

      for(let i = 0; i < this.events.length; i++)
        if(this.events[i].name === name)
          if(this.events[i].once) {
            const callback = this.events[i].callback;
            events.unlock(eventKey);
            events.remove(this.events[i]);
            events.lock();
            i--;
            callback(...args);
          }
          else this.events[i].callback(...args);

      return this;
    }).bind(this),
    writable:false
  });
}

Emitter.setEmitter = Emitter.call;

Object.defineProperties(Emitter.prototype, {
  valueOf:{
    value:(function valueOf() {return this.events}).bind(Emitter.prototype)
  },
  toString:{
    value:(function toString() {return "[object Emitter]"}).bind(Emitter.prototype)
  }
});

module.exports = Emitter;
