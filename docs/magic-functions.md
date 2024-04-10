---
sidebar_position: 5
---
# Magic Functions
Magic functions gives Formula-Script a lot of flexibility since it allows you to change the way mathematical-logical operations work.

### Difference with normal functions
Magic functions cannot be directly called with an identifier, they are called with mathematical-logical operators.

Let's say that you perform this simple operation: ```1 + 2```.
In order to solve that addition, FS calls the magic function ```_NUMBER_ADD_NUMBER(1, 2)``` or when you have this: ```'text' + 10``` FS calls the function ```_STRING_ADD_NUMBER('text', 10)```.

The good thing is that you can replace/create magic functions in order to give operations a different behavior.

### Characteristics
* Magic functions start with an underscore _.
* They **always** have two parameters.
* They follow this syntax:

```_``` + ```LEFT DATATYPE``` + ```_OPERATOR_``` + ```RIGHT DATATYPE```

| DataType | Keyword |
| :---:    | :---:   |
| string | STRING |
| boolean | BOOL |
| date | DATE |
| range | RANGE |
| number | NUMBER |

| Operator | Keyword |
| :---:    | :---:   |
| = | EQ |
| != | EQ |
| \> | GT | 
| \>= | GTE |
| \< | LT |
| \<= | LTE |
| + | ADD |
| - | SUB |
| * | MUL |
| / | DIV |

### Let's build your first magic function
By default FS doesn't support multiplication between a string and a number but we can give that operation a meaning.
Our operation looks like this: 
```ts
const fs = new FormulaScript();
fs.run("'hello world!' * 4") // By now we have an error
```

Let's see what would be our magic functions' keyword. It must start with an underscore, so: ```_```, then it must continue with the datatype we have at the left: ```_STRING```. Followed by that, we have to set the operand: ```_MUL_``` and at the end, the right datatype.
Final result: ```_STRING_MUL_NUMBER```


```ts
const fs = new FormulaScript();
fs.registry.register('_STRING_MUL_NUMBER', {
    call(args) {
        const leftSide = args.asString(0);
        const rightSide = args.asNumber(1);
        let finalResult = "";
        for (let i = 0; i < rightSide; i++) {
            finalResult += leftSide;
        }
        return finalResult;
    },
    numParams: 2 //Can't be a different number!!!
});
console.log(i.run("'hello world!' * 4")) //hello world!hello world!hello world!hello world!
```

Now, when we multiply a string by a number FS repeats the string as many times as the number indicates.

But we haven't finished yet. What happens if we do ```4 * 'hello world!'```?
We'll have an error because we haven't defined what happens when the number is at the left side and the string at the right side, so:

```ts
const fs = new FormulaScript();
                  //Notice the keyword now
fs.registry.register('_NUMBER_MUL_STRING', {
    call(args) {
        const numberArg = args.asNumber(0); //Now we first have the number
        const stringToRepeat = args.asString(1);
        let finalResult = "";
        for (let i = 0; i < stringToRepeat; i++) {
            finalResult += numberArg;
        }
        return finalResult;
    },
    numParams: 2
});
console.log(i.run("4 * 'hello world!'")) //hello world!hello world!hello world!hello world!
```

#### Why do we need to define two functions for the same operation if ('hello world' * 4) is equal to (4 * 'hello world')? Can't FS assume they are the same?
Not all operators and not all data types can be commutable unlike this example. In some mathematical-logical operations, the order of operands and their data types can affect the outcome.
It will be clearer on the following example.

### Example number two
Let's create a magic function that can divide a range by a number. This function must perform a division by a scalar. It must return a range but with each of its components divided by that number.
#### Example: 
```
A1:A3 = [1, 2, 3]

A1:A3 / 2 => [1/2, 1, 3/2]
```

```ts
const fs = new FormulaScript();
fs.registry.register("_RANGE_DIV_NUMBER", {
    call(args) {
        const range = args.asRange(0);
        const number = args.asNumber(1);
        let result = [];
        for (let i = 0; i < range.length; i++) {
            const element = range.asNumber(i);
            result.push(element / number);
        }
        return result;
    },
    numParams: 2
});

console.log(i.run("A1:A3 / 2")) // [0.5, 1, 1.5]
```

Does it make sense to divide a number by a range? In math that operation is not defined so it's ok if we don't define ```_NUMBER_DIV_RANGE``` and let FS throw an error when that happens.