/**
 * angular-utilz v0.0.8
 *
 * utility functions as a service for angular
 *
 * @contributor Layton Whiteley
 * (c) 2014 https://github.com/lwhiteley/angular-utilz
 * License: MIT
 */

angular.module('uo.utilz', []).value('CoreUtilz', (function(){
  /**
     * Trims whitespace at the beginning and/or end of a string
     * @param value - string to be trimmed
     * @returns {String} - returns an empty string if the value passed is not of type {String}
     */
    var trimString = function (value) {
        if (itypeof(value) === 'string') {
            return value.replace(/^\s*/, '').replace(/\s*$/, '');
        }
        return '';
    };

    /**
     * The itypeof operator returns a string indicating the type of the unevaluated operand.
     * This is a more accurate evaluator than the `typeof` operator.
     * This will accurately detect regular expressions and give a type of `regex` instead of
     * `object`
     * @param val {*}
     * @returns {String} typeOfVal
     **/
    var itypeof = function (val) {
        return Object.prototype.toString.call(val).replace(/(\[|object|\s|\])/g, '').toLowerCase();
    };

    /**
     * This method checks if a variable is of type {string}
     * and if the string is not an empty string
     * @param value
     * @returns {*|Boolean|boolean}
     */
    var isValidString = function (value) {
        return (itypeof(value) === 'string' && trimString(value).length > 0);
    };

    /**
     * checks if @param1 is a substring of @param2
     * @param sub
     * @param full
     **/
    var isSubString = function (sub, full) {
        if (itypeof(sub) === 'string' && itypeof(full) === 'string') {
            if (full.toLowerCase().indexOf(sub.toLowerCase()) !== -1) {
                return true;
            }
        }
        return false;
    };

    /**
     * supplant is a string templating engine that replaces patterns
     * in a string with values from a template object
     * @param template
     * @param values
     * @param pattern
     **/
    var supplant = function (template, values, pattern) {
        //determine if the template and values are of the expected types
        var criteria1 = itypeof(template) !== 'string' && itypeof(values) !== 'object';
        var criteria2 = itypeof(template) !== 'string' || itypeof(values) !== 'object';

        //return function arguments as either the template
        //or the values arguments are not of the expected types
        if (criteria1 || criteria2) {
            return Array.prototype.slice.call(arguments);
        }

        //the template is expected to contain the literal '{*}'
        pattern = itypeof(pattern) === 'regexp' ? pattern : /\{([^\{\}]*)\}/g;

        //return the updated template where '{*}' will be replaced
        //in the template by the value of the 'values' param passed
        //if a match was successfully found and replaced
        //returns the original template otherwise
        return template.replace(pattern, function (match, b) {
            var p = b.split('.'),
                r = values;

            try {
                //loop through the list of sub-matches
                //and get the value of the 'values' param passed
                angular.forEach(p, function(value, key){
                    r = r[p[key]];
                });
            } catch (e) {
                //set the value of the result to the match
                r = match;
            }

            //return the value of the 'values' param passed
            //or the match found in the template i.e. '{*}'
            return (typeof r === 'string' || typeof r === 'number') ? r : match;
        });
    };

    /**
    * this method gets the whole number portion of a decimal value
    * returns whole number if passed without decimals as well
    * @param value
    * @returns {*}
    */
   var getWholeNumber = function(value){
       if(angular.isNumber(value)){
           return Math.floor(value) ;
       }
       return value;
   };

   /**
    * this method evaluates a number to check if it is a whole number
    * @param value
    * @returns {*}
    */
   var isWholeNumber = function(value){
       if(angular.isNumber(value)){
           return value % 1 === 0;
       }
       return false;
   };

   /**
    * this method evaluates a number to check if it is a counting number
    * @param value
    * @returns {*}
    */
   var isCountingNumber = function(value){
       if(angular.isNumber(value)){
           return getWholeNumber(value) > 0 && isWholeNumber(value);
       }
       return false;
   };

    var utilz = {
      supplant: supplant,
      isSubString: isSubString,
      itypeof: itypeof,
      trimString: trimString,
      isValidString: isValidString,
      isWholeNumber: isWholeNumber,
      getWholeNumber: getWholeNumber,
      isCountingNumber: isCountingNumber
    };

    return utilz;
})());
