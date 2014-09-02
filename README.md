angular-utilz
=============

utility functions as a service for angular


[![Build Status](https://travis-ci.org/lwhiteley/angular-utilz.svg?branch=master)](https://travis-ci.org/lwhiteley/angular-utilz)
[![Coverage Status](https://coveralls.io/repos/lwhiteley/angular-utilz/badge.png?branch=master)](https://coveralls.io/r/lwhiteley/angular-utilz?branch=master)
### Install

`bower install --save angular-utilz`

### Integrate
```html
 <script src="bower_components/dist/angular-utilz.js" />
```

eg.

```javascript

 angular.module('app', ['uo.utilz']);


 angular.module('app').controller('SampleCtrl', [
   'CoreUtilz',
   function(CoreUtilz){
     var result = CoreUtilz.itypeof(/app\/tests/); // result = 'regexp'
   }
 ]);
```
### API Methods

##### itypeof
> The itypeof operator returns a string indicating the type of the unevaluated operand.
> This is a more accurate evaluator than the `typeof` operator.
> This will accurately detect regular expressions and give a type of `regex` instead of
> `object`
> - @param val {*}
> - @returns {String} typeOfVal

##### isValidString
> This method checks if a variable is of type {string}
> and if the string is not an empty string
> * @param value
> * @returns {*|Boolean|boolean}

##### isSubString
> checks if @param1 is a substring of @param2
> - @param sub - substring to be evaluated
> - @param full - full string to check against
> - @returns {Boolean} result

##### supplant
> supplant is a string templating engine that replaces patterns
> in a string with values from a template object
 * @param template
 * @param values
 * @param pattern
 * @returns {String} processedString

##### getWholeNumber
> this method gets the whole number portion of a decimal value
> returns whole number if passed without decimals as well
* @param value
* @returns {number}

##### isWholeNumber
> this method evaluates a number to check if it is a whole number
* @param value
* @returns {boolean}

##### isCountingNumber
> this method evaluates a number to check if it is a counting number
* @param value
* @returns {boolean}

##### trimString
> Trims whitespace at the beginning and/or end of a string
* @param value - string to be trimmed
* @returns {String} - returns an empty string if the value passed is not of type {String}
