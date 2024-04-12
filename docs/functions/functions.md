---
sidebar_position: 1
---
# Built-in functions
Here there's a list of functions that come with Formula-Script.
In case you don't want to have any of these functions available you can [remove them from the registry](/docs/tutorial-basics/create-a-function#functionregistry-class).

| Function | Description | Parameters |
| :---:    | :---:       | :---:      |
| ABS | Absolute value of a number | ABS(number) |
| AVG | Returns the average of a sample | AVG(number+) |
| CHOOSE | Selects a value of a sample | CHOOSE(number+) |
| RANDOM | Returns a random number between the arguments passed | RANDOM(min : number, max : number) |
| SUM | Returns the sum of all arguments | SUM(number+) |
| MAX | Returns the greatest number of all arguments | MAX(number+) |
| MIN | Returns the lowest number of all arguments | MIN(number+) |
| IF | Specifies a logical test to be performed | IF(test : boolean, trueCase : any, falseCase : any) |
| ROUND | Rounds a number to a predefined accuracy | ROUND(number : number, decimals : number) |
| MEDIAN | Returns the median of a given sample | MEDIAN(number+) |
| MODE | Returns the most common value in a sample | MODE(number+) |
| SQRT | Returns the square root of a number | SQRT(number) |
| POW | Returns a base raised to the power | POW(base : number, power : number) |
| STR | Converts a value to a string | STR(value : any) |
| NUM | Converts a value to a number | NUM(value : string \| boolean \| number) |
| BOOL | Converts a value to a boolean | BOOL(value : string \| number) |
| DATE | Provides an internal number for the date given | DATE(year : number, month : number, day : number) |
| TODAY | Returns the current date of the computer | TODAY() |
| DAY | Returns the sequential date of the month as an integer (1-31) | DAY(date) |
| YEAR | Returns the year of a date value as integer | YEAR(date) |
| MONTH | Determines the sequential number of a month per year (1-12) | MONTH(date) |
| CONCAT | Combines several items into one | CONCAT(any+) |