---
sidebar_position: 4
---
# Limitations
Formula-Script tries to replicate the formula you know from Excel, yet there are some differences:
* **Date**: FS internally uses *dayjs* library. It doesn't use serial Excel number. So, for example, when you are checking if two dates are the same it can return FALSE because of a difference of milliseconds while in Excel it returns TRUE. However, if you wish to change the way this comparison works you can do it by using [Magic Functions](/docs/functions/magic-functions.md).