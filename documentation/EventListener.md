<div id="top" align="center">

<h1><a href="https://github.com/ThePywon/emitter">emitter</a></h1>
 
[![npm version](https://img.shields.io/npm/v/@protagonists/emitter)](https://npmjs.com/package/@protagonists/emitter)
[![npm downloads](https://img.shields.io/npm/dt/@protagonists/emitter)](https://npmjs.com/package/@protagonists/emitter)
[![discord server](https://img.shields.io/discord/937758194736955443?logo=discord&logoColor=white)](https://discord.gg/cwhj3EgqGP)
[![last commit](https://img.shields.io/github/last-commit/ThePywon/emitter)](https://github.com/ThePywon/emitter)
 
</div>



# About

A simple event handler package

---

<br/><br/><br/>

# Table of content

* [**EventListener**](#eventlistener)

* <details open><summary><a href="#properties"><b>Properties</b></a></summary>
  <p>
  
  * [**`.once`**](#once) &nbsp; ![Read Only](https://shields.io/badge/-Read%20Only-green)
  * [**`.order`**](#order) &nbsp; ![Read Only](https://shields.io/badge/-Read%20Only-green)
  * [**`.overridable`**](#overridable) &nbsp; ![Read Only](https://shields.io/badge/-Read%20Only-green)
  * [**`.enabled`**](#enabled)
    
  </p>
</details>

* <details open><summary><a href="#methods"><b>Methods</b></a></summary>
  <p>
  
  * [**`.run`**](#run)
    
  </p>
</details>

---

<br/><br/><br/>



# EventListener

The class holding all info for an event subscription

<br/>

**Syntax:** &nbsp; `new EventListener(callback, options)`

|**Parameters**|**Types**|
|-|-|
|`callback`|[**Function**](https://javascript.info/function-basics)|
|`options`|[**Object**](https://javascript.info/object-basics)|

<br/>

### **Example**

**Code:**

```js
// Imports
const Emitter = require("@protagonists/emitter");
// Create Emitter instance
const myEmitter = new Emitter();

// Create event listener
myEmitter.on("test", () => {
  console.log("Do something...");
});

// Get the first listener for event 'test'
console.log(myEmitter.events.get("test")[0]);
```

**Output:**

```
EventListener {
  run: [Function: run],
  once: false,
  order: 1,
  overridable: false,
  enabled: true
}
```

---

<br/><br/><br/>

# Properties

Some info about the event listener's state

<br/>

## `.once` &nbsp; ![Read Only](https://shields.io/badge/-Read%20Only-green)

This tells us either the event listener will be able listen to an event once or more than once  
Please take in note that this property has no effect on default event listeners, they will always be able to react to the event more than once

<br/>

**Type:** &nbsp; [**Boolean**](https://javascript.info/types#boolean-logical-type)

<br/>

### **Example**

**Code:**

```js
// Imports
const Emitter = require("@protagonists/emitter");
// Create Emitter instance
const myEmitter = new Emitter();

// Create some event listeners
myEmitter.on("test", () => {
  // Some code
});
myEmitter.once("test", () => {
  // Some code
});

// Log all events' .once property
console.log(myEmitter.events.get("test")[0].once);
console.log(myEmitter.events.get("test")[1].once);
```

**Output:**

```
false
true
```

<br/><br/>

## `.order` &nbsp; ![Read Only](https://shields.io/badge/-Read%20Only-green)

A number between 0 and 2 (inclusive) that determines the order of priority on event listeners  
Please take in note that this doesn't affect default event listeners, they are always in priority, in higher priority even than order 0

<br/>

**Type:** &nbsp; [**Number**](https://javascript.info/number)

<br/>

### **Example**

**Code:**

```js
// Imports
const Emitter = require("@protagonists/emitter");
// Create Emitter instance
const myEmitter = new Emitter();

// Create some event listeners
myEmitter.on("test", () => {
  // Some code
});
myEmitter.pre("test", () => {
  // Some code
});
myEmitter.pro("test", () => {
  // Some code
});
myEmitter.on("test", () => {
  // Some code
}, 0);

// Log all events
console.log(myEmitter.events.get("test")[0].order);
console.log(myEmitter.events.get("test")[1].order);
console.log(myEmitter.events.get("test")[2].order);
console.log(myEmitter.events.get("test")[3].order);
```

**Output:**

```
1
0
2
0
```


<br/><br/>


## `.overridable` &nbsp; ![Read Only](https://shields.io/badge/-Read%20Only-green)

This tells us either we can or cannot override the current event listener (only used for default event listeners)

<br/>

**Type:** &nbsp; [**Boolean**](https://javascript.info/types#boolean-logical-type)

<br/>

### **Example**

**Code:**

```js
// Imports
const Emitter = require("@protagonists/emitter");
// Create Emitter instance
const myEmitter = new Emitter();

// Create some event listeners
myEmitter.on("test", () => {
  // Some code
});
myEmitter.pre("test", () => {
  // Some code
});
myEmitter.pro("test", () => {
  // Some code
});
myEmitter.on("test", () => {
  // Some code
}, 0);

// Log all events
console.log(myEmitter.events.get("test")[0].order);
console.log(myEmitter.events.get("test")[1].order);
console.log(myEmitter.events.get("test")[2].order);
console.log(myEmitter.events.get("test")[3].order);
```

**Output:**

```
1
0
2
0
```


<br/><br/>


## `.enabled`

This tells us either the current event listener is enabled or not

<br/>

**Type:** &nbsp; [**Boolean**](https://javascript.info/types#boolean-logical-type)

<br/>

### **Example**

**Code:**

```js
// Imports
const Emitter = require("@protagonists/emitter");
// Create Emitter instance
const myEmitter = new Emitter();

// Create some event listeners
myEmitter.on("test", () => {
  console.log("This gets logged!");
});
myEmitter.on("test", () => {
  console.log("This never gets logged!");
}, 0);
// Disable second event listener
myEmitter.events.get("test")[1].enabled = false;

// Log all events
myEmitter.emit("test");
```

**Output:**

```
This gets logged!
```

---



<br/><br/><br/>

# Methods

<br/>

## `.run`

Runs the associated callback function with the passed arguments

<br/>

**Syntax:** &nbsp; `run(...args)`

|**Parameters**|**Types**|
|-|-|
|`...args`|**Any**|

<br/>

### **Example**

**Code:**

```js
// Imports
const Emitter = require("@protagonists/emitter");
// Create Emitter instance
const myEmitter = new Emitter();

// Create event listener
myEmitter.on("test", (name) => {
  console.log(`Hello ${name}!`);
});

// Run the first event listener
myEmitter.events.get("test")[0].run("John");
// Equivalent to myEmitter.emit("test", "John");
```

**Output:**

```
Hello John!
```

---



<br/><br/><br/><br/><br/>

<h1 align="center">This is the bottom, there is nothing more.<br/>
Go <a href="#top">back up?</a></h1>
