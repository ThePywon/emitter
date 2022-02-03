"use strict";

function Emitter() {
  const events = [];
  Object.defineProperty(this, "events", {
    enumerable:true,
    get:()=>{return Array.from(events)}
  });

  Object.defineProperty(this, "on", {
    enumerable:true,
    value:function on(name, callback) {
      if(typeof name != "string") throw new Error("Emitter event name must be of type String.");
      if(typeof callback != "function") throw new Error("Emitter event callback must be of type Function.");

      events.push({name,callback});
    },
    writable:false
  });

  Object.defineProperty(this, "once", {
    enumerable:true,
    value:function once(name, callback) {
      if(typeof name != "string") throw new Error("Emitter event name must be of type String.");
      if(typeof callback != "function") throw new Error("Emitter event callback must be of type Function.");

      events.push({name,callback,once:true});
    },
    writable:false
  });

  Object.defineProperty(this, "emit", {
    enumerable:true,
    value:function emit(name, ...args) {
      if(typeof name != "string") throw new Error("Emitter event name must be of type String.");
    
      for(let i = 0; i < this.events.length; i++)
        if(this.events[i].name == name)
          if(this.events[i].once) {
            const callback = this.events[i].callback;
            events.slice(1,i).concat(events.slice(i+1,events.length));
            callback(...args);
          }
          else this.events[i].callback(...args);
    },
    writable:false
  });
}

Object.defineProperties(Emitter.prototype, {
  valueOf:{
    value:function valueOf() {return this.events}
  },
  toString:{
    value:function toString() {return "[object Emitter]"}
  }
});

module.exports = Emitter;
