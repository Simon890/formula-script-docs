---
sidebar_position: 2
---

# Data types
Data types define the type of values that can be manipulated by Formula-Script.

### Valid data types
- **String**: Represents a sequence of characters. It can be between single or multiple quotes.
```ts
fs.run(`CONCAT('First String', "Second String")`);
```
- **Number**: Represents a number. It can have a fractional part.
```ts
fs.run(`AVG(10, 15.5, .3, -5)`);
```
- **Boolean**: Represents truth values. You can use explicit values as *TRUE* or *FALSE* but can also use boolean comparisons.
```ts
console.log(fs.run(`TRUE`)); //true
console.log(fs.run(`FALSE`)); //false
console.log(fs.run('5 > 5')); //false
console.log(fs.run('5 >= 5')); //true
console.log(fs.run('8 < 7')); //false
console.log(fs.run('8 <= 7')); //false
console.log(fs.run('5 != 3')); //true
console.log(fs.run('10 = 10')); //true
```
- **Date**: Represents a date. You need to use the DATE function
```ts
fs.run("DATE(2024, 05, 02)") // 2024-05-02 => year-month-day
```
- **Range**: Represents a set of values.
```ts
fs.run(`AVGRANGE(A1:B5)`);
```

### Range - A special data type
A range refers to a collection of cells that have been selected or defined by reference. Ranges are a fundamental part in spreadsheet languages.
In Formula-Script, ranges are composed of three parts:
1. The left side: Points to the beginning cell.
2. The colon (:) as a separator
3. The right side: Points to the final cell.

*leftSide* + *:* + *rightSide*

#### Examples
- A1:B5
- MyFirstCell:MyLastCell
- C10:F100

### How to enable ranges?
By default Formula-Script doesn't allow you to use ranges unless you define a range handler.
Why? Because FS doesn't know where to get the data from.

```ts
import {FormulaScript} from "formula-script"

const fs = new FormulaScript();
fs.run(`SUMRANGE(A1:B5)`); //throws an error: No range handler has been set. Use 'setRangeHandler' to set your handler.
```
To fix this, you just have to define your handler with the 'setRangeHandler' function
```ts
import {FormulaScript} from "formula-script"

const dataSource = [
//          A  B   C           D
/* 1 */    [1, 2,  3,     'a string'],
/* 2 */    [5, 7,  false,          8],
/* 3 */    [9, 10, 11,          true],
];

const fs = new FormulaScript();
fs.setRangeHandler((left : string, right : string, fail : Function) : Range => {
  if(left.length > 2 || right.length > 2) fail('Invalid range value'); //Throw an error if range is incorrect

  const colLeft = left[0];
  const rowLeft = Number(left[1]);
  const colRight = right[0];
  const rowRight = Number(right[1]);
  const cell2index = {
    "A": 0,
    "B": 1,
    "C": 2,
    "D": 3
  }
  const result = [];
  for(let i = cell2index[colLeft]; i <= cell2index[colRight]; i++) {
    for(let j = rowLeft - 1; j <= rowRight - 1; j++) {
      const element = dataSource[j][i];
      result.push(element);
    }
  }
  return result;
});
fs.run(`SUMRANGE(A1:B3)`); //34
```

The function *setRangeHandler* accepts a callback function as a parameter. This callback function has three parameters: 
1. left
2. right
3. fail

This callback function must return a one dimension array. This array can only contain valid data types.

### Cell reference
Cell references work similar to ranges. By default you cannot use it unless you define a cell reference handler.
You can set a handler with the 'setCellRefHandler' function.
```ts
import {FormulaScript} from "formula-script"

const dataSource = [
//          A  B   C           D
/* 1 */    [1, 2,  3,     'a string'],
/* 2 */    [5, 7,  false,          8],
/* 3 */    [9, 10, 11,          true],
];

const fs = new FormulaScript();
fs.setCellRefHandler((cellName : string, fail : Function) => {
  if(cellName.length > 2) fail('Invalid cell reference');
  const col = cellName[0];
  const rowIndex = Number(cellName[1]);
  const cell2index = {
    "A": 0,
    "B": 1,
    "C": 2,
    "D": 3
  }
  if(!(col in cell2index) || rowIndex > 2) fail('Cell reference does not exist');
  return dataSource[rowIndex][cell2index[col]];
});
```