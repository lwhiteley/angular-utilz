describe('util Services unit tests', function() {

	var utilService;
	var emptyString = "";
	beforeEach(module('uo.utilz'));

	beforeEach(inject(function($injector) {
		utilService = $injector.get('CoreUtilz');
  }));



  	describe('supplant spec, takes a string and an object respectively ', function () {

	    it('should return populated string with template object values with custom pattern', function () {
	        var r = {who: 'sjsjd', email: "user@cp.com"};
	        var result = utilService.supplant('{email} - {who}', r, /\{([^\{\}]*)\}/g);
	        var expected = '' + r.email + ' - ' + r.who;
	        expect(result).toEqual(expected);
	    });

	    it('should return the template if object properties are not in the value object', function () {
	        var r = {who: 'sjsjd', email: "user@cp.com"};
	        var template = '{user.email} - {user.who}';
	        var result = utilService.supplant(template, r, /\{([^\{\}]*)\}/g);
	        expect(result).toBe(template);
	    });

	     it('should return populated string with template object values without custom pattern', function () {
	        var r = {who: 'sjsjd', email: "user@cp.com"};
	        var result = utilService.supplant('{email} - {who}', r);
	        var expected = '' + r.email + ' - ' + r.who;
	        expect(result).toEqual(expected);
	    });

	    it('should return template string when no patterns are present in the string', function () {
	        var r = {who: 'sjsjd', email: "user@cp.com"};
	        var template = 'no templates are passed';
	        var result = utilService.supplant(template, r);
	        expect(result).toEqual(template);
	    });

	    it('should return template string when patterns are present but match no property in template obj', function () {
	        var r = {who: 'sjsjd', email: "user@cp.com"};
	        var template = '{emailWho} - {whoEmail}';
	        var result = utilService.supplant(template, r);
	        expect(result).toEqual(template);
	    });

	    it('should return partial template string when patterns are present but dont fully match props in template obj', function () {
	        var r = {who: 'sjsjd', email: "user@cp.com"};
	        var template = '{email} - {whoEmail}';
	        var result = utilService.supplant(template, r);
	        var expected = '' + r.email + ' - {whoEmail}';
	        expect(result).toEqual(expected);
	    });

	    it('should return array of arguments when an object is not passed', function () {
	        var template = '{email} - {who}';
	        var result = utilService.supplant(template, '');
	        expect(result).toEqual([template, '']);
	    });

	    it('should return array of arguments when wrong inputs are passed', function () {
	        var r = {who: 'sjsjd', email: "user@cp.com"};
	        var template = '{email} - {whoEmail}';
	        var result = utilService.supplant( r, template);
	        expect(result).toEqual([r, template]);
	    });
	});

    describe('trimString function Spec', function () {
        it('should return an empty string when passing a non string ', function () {
            expect(utilService.trimString(null)).toBe(emptyString);
            expect(utilService.trimString(1)).toBe(emptyString);
            expect(utilService.trimString(true)).toBe(emptyString);
        });
        it('should return trimmed string when passing a string ', function () {
            expect(utilService.trimString("alakazam")).toBe("alakazam");
            expect(utilService.trimString("")).toBe("");
            expect(utilService.trimString("i am a string")).toBe("i am a string");
            expect(utilService.trimString("    i am a string")).toBe("i am a string");
            expect(utilService.trimString("i am a string  ")).toBe("i am a string");
            expect(utilService.trimString("   i am a string  ")).toBe("i am a string");
        });
    });

    describe('isValidString function Spec', function () {
        it('should utilService.return false when passing a non string or empty string', function () {
            expect(utilService.isValidString(null)).toBeFalsy();
            expect(utilService.isValidString(1)).toBeFalsy();
            expect(utilService.isValidString("")).toBeFalsy();
            expect(utilService.isValidString(true)).toBeFalsy();
            expect(utilService.isValidString(undefined)).toBeFalsy();
            expect(utilService.isValidString([])).toBeFalsy();
            expect(utilService.isValidString({})).toBeFalsy();
        });
        it('should return true when passing a  populated string ', function () {
            expect(utilService.isValidString("true")).toBeTruthy();
        });
    });

 	describe('isSubString Spec ', function () {

        it('should return true when a a substring is passed', function () {
            var result = utilService.isSubString('chromeAgent', 'chromeagent is found');
            expect(result).toBe(true);
        });

       it('should return false when substring is not within full string', function () {
            var result = utilService.isSubString('chromeAgent', 'firefoxagent is found');
            expect(result).toBe(false);
        });

        it('should return false when either params is not a string', function () {
            var result = utilService.isSubString(['firefoxagent'], 'firefoxagent is found');
            expect(result).toBe(false);

            result = utilService.isSubString('firefoxagent', null);
            expect(result).toBe(false);

            result = utilService.isSubString(2, 7);
            expect(result).toBe(false);
        });

    });


    describe('The isWholeNumber method: ', function() {
        it('should return false when input is not a number', function() {
            expect(utilService.isWholeNumber(null)).toBe(false);
        });
        it('should return false when input is a decimal number, with decimals greater than 0', function() {
            expect(utilService.isWholeNumber(10.23)).toBe(false);
        });
        it('should return true when input is a decimal number', function() {
            expect(utilService.isWholeNumber(10.0)).toBe(true);
            expect(utilService.isWholeNumber(10)).toBe(true);
            expect(utilService.isWholeNumber(0)).toBe(true);
        });
    });

    describe('The isCountingNumber method: ', function() {
        it('should return false when input is not a number', function() {
            expect(utilService.isCountingNumber(null)).toBe(false);
        });
        it('should return false when input is a decimal number, with decimals greater than 0', function() {
            expect(utilService.isWholeNumber(10.23)).toBe(false);
        });

        it('should return false when input is zero', function() {
            expect(utilService.isCountingNumber(0)).toBe(false);
        });
        it('should return true when input is a decimal number', function() {
            expect(utilService.isWholeNumber(10.0)).toBe(true);
            expect(utilService.isWholeNumber(10)).toBe(true);
            expect(utilService.isWholeNumber(1)).toBe(true);
        });
    });

    describe('The getWholeNumber method: ', function() {
        it('should return param when input is not a number', function() {
            expect(utilService.getWholeNumber(null)).toBe(null);
        });
        it('should return whole number portion of number when decimal passed', function() {
            expect(utilService.getWholeNumber(10.23)).toBe(10);
        });
        it('should return whole number portion of number when decimal passed, .00', function() {
            expect(utilService.getWholeNumber(10.00)).toBe(10);
        });
        it('should return whole number when whole number passed', function() {
            expect(utilService.getWholeNumber(10)).toBe(10);
        });
    });

		describe('test getCommonArrayValues method: ', function(){
			it('should return empty list if both inputs are not arrays', function() {
	      expect(utilService.getCommonArrayValues(null, true).length).toBe(0);
	      expect(utilService.getCommonArrayValues(2, 'true').length).toBe(0);
	    });

	    it('should return empty list if both inputs have no common value', function() {
	      var arr1 = [null, 1, 3];
	      var arr3 = [true, 2, 4];
	      expect(utilService.getCommonArrayValues(arr1, arr3).length).toBe(0);
	    });

	    it('should return a list of common values when found', function() {
	      var arr1 = [null, 1, 3, true];
	      var arr3 = [true, 2, 4];
	      var expected = [true]
	      expect(utilService.getCommonArrayValues(arr1, arr3).length).toBe(1);
	      expect(utilService.getCommonArrayValues(arr1, arr3)).toEqual(expected);
	    });

	    it('should return a list of common values when found - strings', function() {
	      var arr1 = [null, 1, 3, 'true', 'user'];
	      var arr3 = ['true', 2, 4, 'user'];
	      var expected = ['true', 'user']
	      expect(utilService.getCommonArrayValues(arr1, arr3).length).toBe(2);
	      expect(utilService.getCommonArrayValues(arr1, arr3)).toEqual(expected);
	    });

		});

});
