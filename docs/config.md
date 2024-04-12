---
sidebar_position: 3
---
# Configuration
You can change the interpreter's behavior by passing an object to ```FormulaScript``` class.
### Properties
* ```isCaseSensitive```: Difference between capital and lower-case letters. Default value: ```true```
* ```useLiteralDate```: Allows the use of literal dates. Default value: ```true```

```ts
import { FormulaScript } from "formula-script"

const fs = new FormulaScript({
    isCaseSensitive: true,
    useLiteralDate: false
});
```

### isCaseSensitive
When this property is ```true``` then, the difference between capital and lower-case letters is important.

Case-sensitiveness only affects **functions' names** and **boolean literals**.

```ts
import { FormulaScript } from "formula-script"

const fs = new FormulaScript();
fs.registry.register("MYFUNCTION", {
    exec() {
        //...
    }
});

console.log(fs.run("myfunction()")) // ERROR! 'myfunction' does not exist
console.log(fs.run("MYFUNCTION()")) // Function exists :)
```

The only way to use boolean literals is uppercase:
* ```TRUE```
* ```FALSE```

When this property is ```false``` then, there is no difference between capital and lower-case characters **only for function's names and boolean literals**.
```ts
import { FormulaScript } from "formula-script"

const fs = new FormulaScript();
fs.registry.register("MyFunction", {
    exec() {
        //...
    }
});

console.log(fs.run("myfunction()")) // Function exists :)
console.log(fs.run("MYFUNCTION()")) // Function exists :)
console.log(fs.run("mYfUnCtIoN()")) // Function exists :)
```

Boolean literals:
* ```TRUE```
* ```true```
* ```tRuE```
* ```FALSE```
* ```false```
* ```FaLsE```

### useDateLiteral
A date literal refers to a specific way of representing a date in a programming language. It's a way of defining a date directly in the code by using a specific format that the interpreter can recognize and convert into a valid date object.

The format supported by Formula-Script is: ```YYYY/MM/DD```.

```ts
fs.run("2024/06/02") //This is a date literal
```

#### How does FS know if 2024/06/02 is a date literal or a division?
When an expression with this format ```YYYY/MM/DD``` is found, FS checks if it's a valid date, if that's the case, then that's treated as a date literal, else it's treated as a division between three numbers.

#### Examples:
* ```2024/07/01```: Date literal
* ```2024/07/1```: 2024 divided by 07 divided by 1
* ```2024/7/01```: 2024 divided by 7 divided by 01
* ```2024/07/99```: 2024 divided by 07 divided by 99
* ```20245/07/01```: 20245 divided by 07 divided by 01
* ```2024/50/01```: 2024 divided by 50 divided by 01
* ```2024 / 50 / 01```: 2024 divided by 50 divided by 01
* ```2024/ 50/01```: 2024 divided by 50 divided by 01

If this property is set to ```false``` then ```YYYY/MM/DD``` will always be treated as a division between three numbers and the only way to declare dates would be ```DATE(YYYY, MM, DD)```.