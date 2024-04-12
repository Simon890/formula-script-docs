---
sidebar_position: 3
---
# Async Functions
Formula-Script can handle asynchronous functions in case you want to create a function that performs async tasks.

### Register an async function
In order to handle async functions you need to import ```AsyncFormulaScript``` class
```ts
import { AsyncFormulaScript } from "formula-script"
```

Then, just register your function:
```ts
fs = new AsyncFormulaScript();
fs.registry.register("FETCHUSER", {
    async call(args) {
        const id = args.asNumber(0);
        const data = await fetch("https://jsonplaceholder.typicode.com/users/" + id);
        const info = await data.json();
        return info.name;
    },
    numParams: 1
});
```

The difference with ```FormulaScript``` class is that when we execute the run method we will have a promise.
```ts
fs.run("FETCHUSER(1)").then(output => {
    console.log(output); // Leanne Graham
}).catch(err => {
    console.log("Error: " + err.message);
});
```

* ```setCellRefHandler``` and ```setRangeHandler``` can be async, too
* If you try to run an async function with ```FormulaScript``` class it will throw an error.