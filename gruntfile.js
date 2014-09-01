module.exports = function(grunt){
  // Project Configuration
	grunt.initConfig({
    karma: {
      options: {
          singleRun: true
      },
			unit: {
				configFile: 'config/karma.conf.js'
			}
		},

  });

  require('load-grunt-tasks')(grunt);
};
