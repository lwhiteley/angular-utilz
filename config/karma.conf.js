var util = require('./grunt/utils');
var browserNormalize = function(browser) {
	// normalization process to keep a consistent browser name accross different
	// OS
	return browser.toLowerCase().split(/[ /-]/)[0];
};
module.exports = function (config) {
    config.set({
        basePath: '../',
        frameworks: ['jasmine'],
        files: util.files,
        //exclude : files.exclusions,
        autoWatch: true,
        browsers: ['PhantomJS'],
        reporters: ['coverage', 'dots'],
        preprocessors: {
            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            'src/**/*.js': ['coverage']
        },
        coverageReporter : {
            type : 'lcov',
            dir : 'reports/coverage',
            subdir: browserNormalize
        }
    });
};
