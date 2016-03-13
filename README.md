# vhtml

[![NPM](https://img.shields.io/npm/v/vhtml.svg?style=flat)](https://www.npmjs.org/package/vhtml)
[![travis-ci](https://travis-ci.org/developit/vhtml.svg?branch=master)](https://travis-ci.org/developit/vhtml)

### **Render JSX/Hyperscript to HTML strings, without VDOM**

> Need to use HTML strings (angular?) but want to use JSX? vhtml's got your back.

[**JSFiddle Demo**](https://jsfiddle.net/developit/9q0vyskg/)

---


## Installation

Via npm:

`npm install --save vhtml`


---


## Usage

```js
// import the library:
import h from 'vhtml';

// tell babel to transpile JSX to h() calls:
/** @jsx h */

// now render JSX to an HTML string!
let items = ['one', 'two', 'three'];

document.body.innerHTML = (
  <div class="foo">
    <h1>Hi!</h1>
    <p>Here is a list of {items.length} items:</p>
    <ul>
      { items.map( item => (
        <li>{ item }</li>
      )) }
    </ul>
  </div>
);
```
