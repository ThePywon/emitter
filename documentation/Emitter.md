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

* [**Emitter**](#emitter-1)

* <details open><summary><a href="#properties"><b>Properties</b></a></summary>
  <p>
  
  * [**`.events`**](#events) &nbsp; ![Read Only](https://shields.io/badge/-Read%20Only-green)
  * [**`.defaults`**](#defaults) &nbsp; ![Read Only](https://shields.io/badge/-Read%20Only-green)
    
  </p>
</details>

* <details open><summary><a href="#methods"><b>Methods</b></a></summary>
  <p>

  * [**`.setEmitter`**](#setemitter) &nbsp; ![Static](https://shields.io/badge/-Static-red)
  * [**`.setDefault`**](#setdefault)
  * [**`.disableDefault`**](#disabledefault)
  * [**`.enableDefault`**](#enabledefault)
  * [**`.on`**](#on)
  * [**`.pre`**](#pre)
  * [**`.pro`**](#pro)
  * [**`.once`**](#once)
  * [**`.emit`**](#emit)
  * [**`.toString`**](#tostring) &nbsp; [![Prototype](https://shields.io/badge/-Prototype-orange)](https://javascript.info/prototype-inheritance)
  * [**`.valueOf`**](#valueof) &nbsp; [![Prototype](https://shields.io/badge/-Prototype-orange)](https://javascript.info/prototype-inheritance)
    
  </p>
</details>

---

<br/><br/><br/>



# Emitter

The function that handles events and listeners

<br/>

**Syntax:** &nbsp; `new Emitter()`

> The lack of the `new` keyword may cause unwanted behaviour

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

// Emit event
myEmitter.emit("test");
```

**Output:**

```
Do something...
```

---

<br/><br/><br/>

# Properties

Some maps of event listeners held by the emitter

<br/>

## `.events` &nbsp; ![Read Only](https://shields.io/badge/-Read%20Only-green)

This is where all event listeners except default ones are stored

<br/>

**Type:** &nbsp; [**Map**](https://javascript.info/map-set)**\<**[**Array**](https://javascript.info/array)**\<**[**EventListener**](https://github.com/ThePywon/emitter/blob/main/documentation/EventListener.md)**\>\>**

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
myEmitter.on("test2", () => {
  // Some code
});
myEmitter.on("test", () => {
  // Some code
});

// Log all events
console.log(myEmitter.events);
```

**Output:**

```
Map(2) {
  'test' => [
    EventListener {
      run: [Function: run],
      once: false,
      order: 1,
      overridable: false,
      enabled: true
    },
    EventListener {
      run: [Function: run],
      once: false,
      order: 1,
      overridable: false,
      enabled: true
    }
  ],
  'test2' => [
    EventListener {
      run: [Function: run],
      once: false,
      order: 1,
      overridable: false,
      enabled: true
    }
  ]
}
```

<br/><br/>

## `.defaults` &nbsp; ![Read Only](https://shields.io/badge/-Read%20Only-green)

This is where all default event listeners are stored

<br/>

**Type:** &nbsp; [**Map**](https://javascript.info/map-set)**\<**[**EventListener**](https://github.com/ThePywon/emitter/blob/main/documentation/EventListener.md)**\>**

<br/>

### **Example**

**Code:**

```js
// Imports
const Emitter = require("@protagonists/emitter");
// Create Emitter instance
const myEmitter = new Emitter();

// Create some event listeners
myEmitter.setDefault("test", () => {
  // Some code
});

// Log all events
console.log(myEmitter.defaults);
```

**Output:**

```
Map(1) {
  'test' => EventListener {
    run: [Function: run],
    once: false,
    order: 0,
    overridable: false,
    enabled: true
  }
}
```

---



<br/><br/><br/>

# Methods

Methods used to create event listeners and emit events

<br/>

## `.setEmitter` &nbsp; ![Static](https://shields.io/badge/-Static-red)

This function is equivalent to `Emitter.call`

<br/>

**Syntax:** &nbsp; `setEmitter(obj)`

|**Parameters**|**Types**|
|-|-|
|`obj`|[**Object**](https://javascript.info/object)|

<br/>

**Returns:** &nbsp; [**Emitter**](https://github.com/ThePywon/emitter/blob/main/documentation/Emitter.md)

<br/>

### **Example**

**Code:**

```js
// Imports
const Emitter = require("@protagonists/emitter");

// Create 'Person' class and make it an emitter
class Person {
  constructor(name) {
    this.name = name;
    Emitter.setEmitter(this);
  }

  wakeUp() {
    this.emit("ready");
  }
}

// Create new Person instance
const John = new Person("John");

// Create event listener
John.on("ready", () => {
  console.log(`${John.name} is ready to start the day!`);
});

// Emit event
John.wakeUp();
```

**Output:**

```
John is ready to start the day
```


<br/><br/>


## `.setDefault`

Creates and sets a default event listener for a specified event

<br/>

**Syntax:** &nbsp; `setDefault(name, callback, overridable)`

|**Parameters**|**Types**|
|-|-|
|`name`|[**String**](https://javascript.info/string)|
|`callback`|[**Function**](https://javascript.info/function-basics)|
|`overridable`|[**Boolean**](https://javascript.info/types#boolean-logical-type)|

<br/>

**Returns:** &nbsp; [**Emitter**](https://github.com/ThePywon/emitter/blob/main/documentation/Emitter.md)
> Returns the same Emitter instance

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
  console.log("Some other behaviour");
});

// Create default event listener
myEmitter.setDefault("test", () => {
  console.log("My default behaviour (always prioritized)");
});

// Emit event
myEmitter.emit("test");
```

**Output:**

```
My default behaviour (always prioritized)
Some other behaviour
```


<br/><br/>


## `.enableDefault`

Enable the default event listener

<br/>

**Syntax:** &nbsp; `enableDefault(name)`

|**Parameters**|**Types**|
|-|-|
|`name`|[**String**](https://javascript.info/string)|

<br/>

**Returns:** &nbsp; [**Emitter**](https://github.com/ThePywon/emitter/blob/main/documentation/Emitter.md)
> Returns the same Emitter instance

<br/>

### **Example**

**Code:**

```js
// Imports
const Emitter = require("@protagonists/emitter");
// Create Emitter instance
const myEmitter = new Emitter();


// Create default event listener
myEmitter.setDefault("test", () => {
  console.log("My default behaviour (always prioritized)");
});
// Disable default event listener
myEmitter.disableDefault("test");


// Log default event listeners
console.log(myEmitter.defaults);


// Enable default event listener
myEmitter.enableDefault("test");


// Log default event listeners
console.log(myEmitter.defaults);
```

**Output:**

```
Map(1) {
  'test' => EventListener {
    run: [Function: run],
    once: false,
    order: 0,
    overridable: false,
    enabled: false
  }
}
Map(1) {
  'test' => EventListener {
    run: [Function: run],
    once: false,
    order: 0,
    overridable: false,
    enabled: true
  }
}
```


<br/><br/>


## `.disableDefault`

Disable default event listener

<br/>

**Syntax:** &nbsp; `disableDefault(name)`

|**Parameters**|**Types**|
|-|-|
|`name`|[**String**](https://javascript.info/string)|

<br/>

**Returns:** &nbsp; [**Emitter**](https://github.com/ThePywon/emitter/blob/main/documentation/Emitter.md)
> Returns the same Emitter instance

<br/>

### **Example**

**Code:**

```js
// Imports
const Emitter = require("@protagonists/emitter");
// Create Emitter instance
const myEmitter = new Emitter();


// Create default event listener
myEmitter.setDefault("test", () => {
  console.log("Annoying default behaviour");
});

// Create event listener
myEmitter.on("test", () => {
  console.log("Do something");
});

// Disable default event listener
myEmitter.disableDefault("test");


// Log default event listeners
myEmitter.emit("test");
```

**Output:**

```
Do something
```


<br/><br/>


## `.on`

Create event listener

<br/>

**Syntax:** &nbsp; `on(name, callback, order)`

|**Parameters**|**Types**|
|-|-|
|`name`|[**String**](https://javascript.info/string)|
|`callback`|[**Function**](https://javascript.info/function-basics)|
|`order`|[**Number**](https://javascript.info/number)|

<br/>

**Returns:** &nbsp; [**Emitter**](https://github.com/ThePywon/emitter/blob/main/documentation/Emitter.md)
> Returns the same Emitter instance

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
  console.log("Do something");
});

// Log default event listeners
myEmitter.emit("test");
```

**Output:**

```
Do something
```


<br/><br/>


## `.pre`

Create event listener with order value of 0

<br/>

**Syntax:** &nbsp; `pre(name, callback)`

|**Parameters**|**Types**|
|-|-|
|`name`|[**String**](https://javascript.info/string)|
|`callback`|[**Function**](https://javascript.info/function-basics)|

<br/>

**Returns:** &nbsp; [**Emitter**](https://github.com/ThePywon/emitter/blob/main/documentation/Emitter.md)
> Returns the same Emitter instance

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
  console.log("Some other behaviour");
});

// Create event listener
myEmitter.pre("test", () => {
  console.log("Behaviour in priority");
});

// Emit event
myEmitter.emit("test");
```

**Output:**

```
Behaviour in priority
Some other behaviour
```


<br/><br/>


## `.pro`

Create event listener with order value of 2

<br/>

**Syntax:** &nbsp; `pro(name, callback)`

|**Parameters**|**Types**|
|-|-|
|`name`|[**String**](https://javascript.info/string)|
|`callback`|[**Function**](https://javascript.info/function-basics)|

<br/>

**Returns:** &nbsp; [**Emitter**](https://github.com/ThePywon/emitter/blob/main/documentation/Emitter.md)
> Returns the same Emitter instance

<br/>

### **Example**

**Code:**

```js
// Imports
const Emitter = require("@protagonists/emitter");
// Create Emitter instance
const myEmitter = new Emitter();

// Create event listener
myEmitter.pro("test", () => {
  console.log("Some other behaviour");
});

// Create event listener
myEmitter.on("test", () => {
  console.log("Behaviour in priority");
});

// Emit event
myEmitter.emit("test");
```

**Output:**

```
Behaviour in priority
Some other behaviour
```


<br/><br/>


## `.once`

Create event listener

<br/>

**Syntax:** &nbsp; `once(name, callback, order)`

|**Parameters**|**Types**|
|-|-|
|`name`|[**String**](https://javascript.info/string)|
|`callback`|[**Function**](https://javascript.info/function-basics)|
|`order`|[**Number**](https://javascript.info/number)|

<br/>

**Returns:** &nbsp; [**Emitter**](https://github.com/ThePywon/emitter/blob/main/documentation/Emitter.md)
> Returns the same Emitter instance

<br/>

### **Example**

**Code:**

```js
// Imports
const Emitter = require("@protagonists/emitter");
// Create Emitter instance
const myEmitter = new Emitter();

// Create event listener
myEmitter.once("ready", () => {
  console.log("This gets called only once!");
});

// Log default event listeners
myEmitter.emit("ready");
myEmitter.emit("ready");
```

**Output:**

```
This gets called only once!
```


<br/><br/>


## `.emit`

Emit the corresponding event

<br/>

**Syntax:** &nbsp; `emit(name, ...args)`

|**Parameters**|**Types**|
|-|-|
|`name`|[**String**](https://javascript.info/string)|
|`...args`|**Any**|

<br/>

**Returns:** &nbsp; [**Emitter**](https://github.com/ThePywon/emitter/blob/main/documentation/Emitter.md)
> Returns the same Emitter instance

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
  console.log("Do something");
});

// Log default event listeners
myEmitter.emit("test");
```

**Output:**

```
Do something
```


<br/><br/>

<a id="setemitter"></a>

## `.setEmitter` &nbsp; [![Static](https://shields.io/badge/-Static-red)](https://javascript.info/static-properties-methods)

This function is equivalent to `Emitter.call`

<br/>

**Syntax:** &nbsp; `.setEmitter(obj)`

|**Parameters**|**Types**|
|-|-|
|`obj`|[**Object**](https://javascript.info/object)|

<br/>

### **Example**

**Code:**

```js
// Imports
const Emitter = require("@protagonists/emitter");

// Create class 'Emitter'
class Person {
  constructor(name) {
    this.name = name;
    // Set this instance as an Emitter on initialization
    Emitter.setEmitter(this);
  }

  wakeUp() {
    // Emit 'ready' event
    this.emit("ready");
  }
}

// Create new Person instance
const John = new Person("John");

// Log once ready
John.on("ready", () => {
  console.log(`${John.name} is ready to start the day!`);
});

// Call wakeUp() function
John.wakeUp();
```

**Output:**

```
John is ready to start the day!
```


<br/><br/>


<a id="valueof"></a>

## `.valueOf` &nbsp; [![Prototype](https://shields.io/badge/-Prototype-orange)](https://javascript.info/prototype-inheritance)

A function to convert this object into a primitive value

<br/>

**Syntax:** &nbsp; `valueOf()`

<br/>

**Returns:** &nbsp; [**Map**](https://javascript.info/map-set)**\<**[**Array**](https://javascript.info/array)**\<**[**EventListener**](https://github.com/ThePywon/Documentation-Template/blob/main/documentation/EventListener.md)**\>\>**

<br/>

### **Example**

**Code:**

```js
// Imports
const Emitter = require("@protagonists/emitter");
// Create Emitter instance
const myEmitter = new Emitter();

// Log result of toString()
console.log(myEmitter.toString());
```

**Output:**

```
Map(1) {
  'test' => [
    EventListener {
      run: [Function: run],
      once: false,
      order: 1,
      overridable: false,
      enabled: true
    }
  ]
}
```


<br/><br/>


<a id="tostring"></a>

## `.toString` &nbsp; [![Prototype](https://shields.io/badge/-Prototype-orange)](https://javascript.info/prototype-inheritance)

A function to convert this object into a string format

<br/>

**Syntax:** &nbsp; `toString()`

<br/>

**Returns:** &nbsp; [**String**](https://javascript.info/string)

<br/>

### **Example**

**Code:**

```js
// Imports
const Emitter = require("@protagonists/emitter");
// Create Emitter instance
const myEmitter = new Emitter();

myEmitter.on("test", () => {
  // Some code
});

// Log result of valueOf()
console.log(myEmitter.valueOf());
```

**Output:**

```
[object Emitter]
```

---



<br/><br/><br/><br/><br/>

<h1 align="center">This is the bottom, there is nothing more.<br/>
Go <a href="#top">back up?</a></h1>
