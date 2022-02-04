# Emitter

## A simple emitter package

This package is pretty self explanatory...  
need to get and send events?  
use an emitter

# Table of content

* [How to use?](#how-to-use)
* [Properties](#Properties)
  * [`Emitter.events`](#Emitter-events)
  * [`Emitter.defaults`](#Emitter-defaults)
* [Functions](#Functions)
  * [`Emitter.on`](#Emitter-on)
  * [`Emitter.once`](#Emitter-once)
  * [`Emitter.emit`](#Emitter-emit)
  * [`Emitter.default`](#Emitter-default)
  * [`Emitter.disableDefaults`](#Emitter-disableDefaults)
  * [`Emitter.enableDefaults`](#Emitter-enableDefaults)
* [Data Objects](#Data-Objects)
  * [`event`](#event)

# How to use?

It all starts with importing it

```js
const Emitter = require("@protagonists/emitter");
```

then you can use it to get and send events

```js
const myEmitter = new Emitter();
    
myEmitter.on("event", ()=>{
  console.log("The event was called!");
});

myEmitter.emit("event");
```


# Properties

## Emitter.events

### Description

This property returns an array of all the event callbacks currently inside the emitter 

### Returned value

```js
Array []
``` 
*Elements within that array are formatted as [such](#event)*  
***Editing the array does not change the actual array inside the emitter**

### Example

#### Code:

```js
myEmitter.on("ready", console.log);
myEmitter.on("debug", console.log);
myEmitter.on("test", console.log);
myEmitter.once("debug", console.log);

console.log(myEmitter.events);
```

#### Ouput:

    [
      {
        name:"ready",
        callback: [Function: log]
      },
      {
        name:"debug",
        callback: [Function: log]
      },
      {
        name:"test",
        callback: [Function: log]
      },
      {
        name:"debug",
        callback: [Function: log],
        once:true
      }
    ]

## Emitter.defaults

### Description

This property returns an array of all the ***default** event callbacks currently inside the emitter 

### Returned value

```js
Array []
``` 
*Elements within that array are formatted as [such](#event)*  
***Editing the array does not change the actual array inside the emitter**

### Example

#### Code:

```js
myEmitter.default("ready", console.log);
myEmitter.default("debug", console.log);
myEmitter.default("test", console.log);
myEmitter.default("debug", console.log);

console.log(myEmitter.defaults);
```

#### Ouput:

    [
      {
        name:"ready",
        callback: [Function: log]
      },
      {
        name:"debug",
        callback: [Function: log]
      },
      {
        name:"test",
        callback: [Function: log]
      },
      {
        name:"debug",
        callback: [Function: log]
      }
    ]

# Functions

## Emitter.on

### Description

This function stores the callback with the associated event and will call it whenever the corresponding event gets emitted

### Syntax

```js
Emitter.on(name: String, callback: Function)
```

### Example

#### Code:

```js
myEmitter.on("event", myFunc);

console.log(myEmitter.events);
```

#### Output:

    [ { name:"events", callback:[Function: myFunc] } ]

## Emitter.once

### Description

This function stores the callback with the associated event and will call it whenever the corresponding event gets emitted **BUT** it only gets called once!

### Syntax

```js
Emitter.once(name: String, callback: Function)
```

### Example

#### Code:

```js
myEmitter.once("event", myFunc);

console.log(myEmitter.events);
```

#### Output:

    [ 
      { 
        name:"events", 
        callback:[Function: myFunc], 
        once:true
      }
    ]

## Emitter.emit

### Description

This function "emits" an event and calls all callbacks associated with that event  
the order of execution goes from top to bottom of the list...  
which means that any event callback created after another is also called after

### Syntax

```js
Emitter.emit(name: String, ...args: Any)
```

### Example

#### Code:

```js
function logPerson(name, age) {
  console.log("Hello! My name is", name, "and I am", age, "years old!");
}

myEmitter.on("person", logPerson);

myEmitter.emit("person", "John", 32);
```

#### Ouput:

    Hello! My name is John and I am 32 years old!

## Emitter.default

### Description

This one is a bit similar from some other functions, this is essentially the same as [`Emitter.on`](#Emitter-on) but has a few key differences  

### Syntax

```js
Emitter.default(name: String, callback: Function)
```

### Example

#### Code:

```js
myEmitter.on("test", ()=>{
  console.log("Running some code.");
});

myEmitter.default("test", ()=>{
  console.log("Running important code here before the other callbacks.");
});

myEmitter.emit("test");
```

#### Output:

    Running important code here before the other callbacks.
    Running some code.

notice how, even when we call [`Emitter.on`](#Emitter-on) earlier, the default callback gets called first?  
usually, callbacks get called in the order they were defined  
that still is technically true for default callbacks between themselves  
but we can see that **default callbacks** are prioritised above normal **event callbacks**

## Emitter.disableDefaults

### Description

This one is pretty self explanatory,  
it disables all default callbacks for a specific event

### Syntax

```js
Emitter.disableDefaults(name: String)
```

### Example

#### Code:

```js
myEmitter.default("event", ()=>{
  console.log("Annoying default behaviour!");
});

myEmitter.on("event", ()=>{
  console.log("My behaviour.");
});

myEmitter.disableDefaults("event");
```

#### Output

    My behaviour.

There we go!
If you want to make a package including an emitter like that one,  
I highly suggest making default callbacks instead of normal event callbacks  
because then, you can give the power to users to simply disable it if they find it annoying
***Disabling defaults BEFORE adding the first default callback will not work!**

## Emitter.enableDefaults

### Description

This one is exactly the opposite of [`Emitter.disableDefaults`](#Emitter-disableDefaults),  
it enables all default callbacks for a specific event

### Syntax

```js
Emitter.enableDefaults(name: String)
```

### Example

#### Code:

```js
myEmitter.default("event", ()=>{
  console.log("Default behaviour.");
});

myEmitter.on("event", ()=>{
  console.log("My behaviour.");
});

myEmitter.once("event", ()=>{
  myEmitter.enableDefaults("event");
  myEmitter.emit("event");
});

myEmitter.disableDefaults("event");
```

#### Output

    My behaviour.
    Default behaviour.
    My behaviour.

as you can see, the first time around, only the event callback was called because default callbacks were disabled  
we then emitted the event once more after enabling it and now the default callback is back!

# Data Objects

## event

### Description

event objects are simple, they store data for the emitter to use.  
you can access this data if nessecary! 

### properties

`name` *String*  
contains the event name that the callback is associated to

`callback` *Function*  
contains the callback function for the event

`once?` *Bool*  
tells the emitter either or not the event callback is supposed to be run only once or always


## Github

<https://github.com/ThePywon/emitter>
