---
sidebar_position: 1
---

# Create a Function

### Register a function

In order to create a function you need to register it in the function registry by using the **register** function
```js
import {FormulaScript} from "formula-script"

const fs = new FormulaScript();
fs.registry.register("DOUBLEVALUE", {
  call: args => {
    const firstParam = args.asNumber(0); //Get first parameter
    return firstParam * 2;
  },
  numParams: 1 // or numParams: () => 1
});

const output = fs.run("DOUBLEVALUE(5)");
console.log(output) //10
```

As shown above, the first parameter is the function's name while the second is an object that has two parameters:
1. **call**: Here you write your function's code. It accepts a parameter called args. It is an instance of Arguments class.
2. **numParams**: This property is optional and determines the number of parameters your function expects to have. If the property is not defined or if it is null or undefined, the new defined function will accept any amount of parameters.

If there's already a function with the name your're setting, it will be replaced by the new function.

### Arguments class
We use this class to get the arguments passed to the function
```ts
import {FormulaScript} from "formula-script"

const fs = new FormulaScript();
fs.registry.register("MYFUNCTION", {
  call: (args: Arguments) => {
    const firstParam = args.asBool(0); //Get first parameter
    const secondParam = args.asString(1); //Get second parameter
    const thirdParam = args.asNumber(2); //Get third parameter
    const fourthParam = args.asAny(3); //Get fourth parameter
    const fifthParam = args.asRange(4); //Get fifth parameter
    //...
  },
  numParams: () => 5 //or numParams: 5
});

fs.run(`MYFUNCTION(TRUE, 'foo', 10, 15, A1:B5)`);
```
#### Properties:
- **length**: Returns the amount of parameters passed to the function
#### Methods:
- **asBool(index : number) : boolean**: Checks whether the argument at position *index* exists and if it's of type *boolean*.
- **asString(index : number) : string**: Checks whether the argument at position *index* exists and if it's of type *string*.
- **asNumber(index : number) : number**: Checks whether the argument at position *index* exists and if it's of type *number*.
- **asDate(index : number) : Date**: Checks whether the argument at position *index* exists and if it's of type *date*.
- **asAny(index : number) : any**: Checks whether the argument at position *index* exists and it doesn't validate its type.
- **asRange(index : number) : RangeArray**: Checks whether the argument at position *index* exists and if it's a range.

If any of the previous function's validations fail Formula-Script will throw an error.

### FunctionRegistry class
The registry object is of type FunctionRegistry. It's used to store the available functions Formula-Script has.

#### Methods
- **register(name : string, object : FormulaFunction | ObjectFormulaFunction) : void**: Registers a function.
- **remove(name : string) : void**: Deletes a function from the registry.
- **get(name : string) : FormulaFunction | ObjectFormulaFunction**: Return the function if found. In case the function does not exists it throws an error.
- **rename(name : string, newName : string) : void**: Renames a function. In case the function to be renamed does not exists it throws an error.
- **has(name : string) : boolean**: Checks if a function exists.