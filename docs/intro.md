---
sidebar_position: 1
---

# Introduction

Let's discover **Formula-Script(FS) in less than 5 minutes**.

## Getting Started

Formula-Script is a library that allows you to run a spreadsheet language with Javascript.
It comes with built-in functions but **you can create your own functions, too**.

## Installing the library
```bash
npm i formula-script
```

## Importing the library
```js
import {FormulaScript} from "formula-script"
```

## Running the interpreter
```js
const fs = new FormulaScript();
const result = fs.run("SUM(1, 3)");
console.log(result) // 4
```