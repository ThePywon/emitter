# Emitter

## A simple emitter package

This package is pretty self explanatory...  
need to get and send events?  
use an emitter

## Table of content

* [How to use?](#how-to-use)
* Properties
  * [Emitter.events](#Emitter-events)
* Functions
  * [Emitter.on](#Emitter-on)
  * [Emitter.once](#Emitter-once)
  * [Emitter.emit](#Emitter-emit)

## How to use?

It all starts with importing it

    const Emitter = require("@protagonists/emitter");

then you can use it to get and send events

    const myEmitter = new Emitter();
    
    myEmitter.on("event", ()=>{
      console.log("The event was called!");
    });

    myEmitter.emit("event");

## Properties

### Emitter.events

This property returns an array of all the event callbacks currently inside the emitter  
***Editing the array does not change the actual array inside the emitter**

    myEmitter.on("ready", console.log);
    myEmitter.on("debug", console.log);
    myEmitter.on("test", console.log);
    myEmitter.once("debug", console.log);

    console.log(myEmitter.events);

**Ouput:**

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

## Functions

### Emitter.on

This function takes in an event name and a function

    myEmitter.on("event", myFunc);

It stores the callback with the associated event and will call it whenever the corresponding event gets emitted

### Emitter.once

This function takes in an event name and a function

    myEmitter.on("event", myFunc);

It stores the callback with the associated event and will call it whenever the corresponding event gets emitted  
**BUT it gets called only once!**

Meaning that after being called, this callback will never be called again, even if the event gets emitted again

### Emitter.emit

This function takes in an event name  
All arguments passed after it are passed into the callbacks!

    myEmitter.on("person", function logPerson(name, age) {
      console.log("Hello! My name is", name, "and I am", age, "years old!");
    });

    myEmitter.emit("person", "John", 32);
    // Hello! My name is John and I am 32 years old!

As you might have guessed, this function emits the event and thus runs all the associated callbacks

## Github

<https://github.com/ThePywon/emitter>
