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

* [**How to use?**](#how-to-use)

> The content below does not correspond to the object structure of the objects

* <details open><summary><a href="https://github.com/ThePywon/emitter/blob/main/documentation/Emitter.md"><b>Emitter</b></a> &nbsp; <img src="https://img.shields.io/badge/-Exported-cyan"/></summary>
  <p>

  * [**EventListener**](https://github.com/ThePywon/emitter/blob/main/documentation/EventListener.md)
    
  </p>
</details>

---

<br/><br/><br/>



# How to use?

## Description

This package is used to listen and emit events to react to asynchronous events in a cleaner way

## Import

### Terminal

> ```sh
> npm install @protagonists/emitter
> ```

### Node.js

> ```js
> const Emitter = require("@protagonists/emitter");
> ```

---



<br/>

## Example

### Code:

```js
// Imports
const Emitter = require("@protagonists/emitter");
// Create Emitter instance
const myEmitter = new Emitter();

// Create one time event listener
myEmitter.once("ready", () => {
  console.log("Ready event was sent!");
});

// Emit event
myEmitter.emit("ready");
```

<br/>

### Output:

```
Ready event was sent!
```

<br/><br/><br/><br/><br/>

<h1 align="center">This is the bottom, there is nothing more.<br/>
Go <a href="#top">back up?</a></h1>
