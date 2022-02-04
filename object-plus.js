"use strict";

function getAllPropertyNames(obj) {
  const props = [];

  do {
    const names = Object.getOwnPropertyNames(obj);
    for(let i = 0; i < names.length; i++) {
      if(props.indexOf(names[i]) === -1)
        props.push(names[i]);
    }
  } while (obj = Object.getPrototypeOf(obj));

  return props;
}

function inheritBaseProperties(original, ...objects) {
  for(let i = 0; i < objects.length; i++) {
    for(let prop in objects[i]) {
      const desc = Object.getOwnPropertyDescriptor(objects[i], prop);
      if(desc === undefined)
        original[prop] = objects[i][prop];
      else if(desc.value !== undefined)
        Object.defineProperty(original, prop, {
          configurable:desc.configurable,
          enumerable:desc.enumerable,
          value:desc.value,
          writable:desc.writable
        });
      else Object.defineProperty(original, prop, {
        configurable:desc.configurable,
        enumerable:desc.enumerable,
        get:desc.get,
        set:desc.set
      });
    }
  }
}

function optionalChain(obj, names) {
  if(!Array.isArray(names)) throw new Error("property names must be passed in as an array");
  if(typeof obj !== "object" || obj === null) return undefined;
  let result = obj;
  for(let i = 0; i < names.length; i++) {
    if(Object.prototype.hasOwnProperty.call(obj, names[i]))
      result = result[names[i]];
    else {
      result = undefined;
      break;
    }
  }
  return result;
}

module.exports = { getAllPropertyNames, inheritBaseProperties, optionalChain }
