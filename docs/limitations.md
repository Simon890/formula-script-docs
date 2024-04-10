---
sidebar_position: 4
---
# Limitations
Formula-Script tries to replicate the formula you know from Excel, yet there are some differences:
* **Date**: FS internally uses *dayjs* library. It doesn't use serial Excel number. So, for example, when you are checking if two dates are the same it can return FALSE because of a difference of milliseconds while in Excel it returns TRUE. However, if you wish to change the way this comparison works you can do it by using [Magic Functions](/docs/magic-functions).
* **Literal Dates**: At the moment it is not possible to use dates with this syntax: ```05/06/2024``` because I've been struggling to parse that because I don't know how to differentiate that date format from a division operation when I'm building the Abstract Syntax Tree. If you want to help, feel free to create a pull request or contact me via LinkedIn or Github. At the moment, the only way to use dates is by using the function ```DATE(2024, 06, 05)``` or any other function that returns a date for example ```TODAY()```.