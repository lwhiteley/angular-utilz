angular-utilz
=============

utility functions as a service for angular


[![Build Status](https://travis-ci.org/lwhiteley/angular-utilz.svg?branch=master)](https://travis-ci.org/lwhiteley/angular-utilz)
[![Coverage Status](https://coveralls.io/repos/lwhiteley/angular-utilz/badge.png?branch=master)](https://coveralls.io/r/lwhiteley/angular-utilz?branch=master)
### Install

`bower install --save angular-utilz`

### Integrate
```html
 <script src="bower_compoenets/dist/angular-utilz.js" />
```

eg.

```javascript

 angular.module('app', ['uo.utilz']);

 angular.module('app').controller('SampleCtrl', [
 'CoreUtilz',
 function(CoreUtilz){
   var result = CoreUtilz.itypeof(true); // result = 'boolean'
 }
 ]);
```
