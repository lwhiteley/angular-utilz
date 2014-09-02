var util = require('./config/grunt/utils.js');

module.exports = function(grunt){
   var APP_VERSION = util.getVersion();
  // Project Configuration
	grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    karma: {
      options: {
          singleRun: true
      },
			unit: {
				configFile: 'config/karma.conf.js'
			}
		},
    concat: {
      options: {
          separator: '\n',
          process: function(src){
              return src
                  .replace(/%VERSION%/g, APP_VERSION.full)
                  .replace(/%WEBSITE%/g, APP_VERSION.website)
                  .replace(/%LICENSE%/g, APP_VERSION.license)
                  .replace(/%CONTRIBUTOR%/g, APP_VERSION.contributor)
                  .replace(/%APP_NAME%/g, APP_VERSION.appname)
                  .replace(/%DESCRIPTION%/g, APP_VERSION.description);
          }
      },
      module:{
          src: [
                  'src/header.prefix',
                  'src/angular-utilz.js'
               ],
          dest: 'dist/angular-utilz.js'
      },
      minify:{
          src: [
                  'src/header.prefix',
                  'dist/angular-utilz.min.js'
               ],
          dest: 'dist/angular-utilz.min.js'
      }
    },
    uglify: {
      options: {
        mangle: true
      },
      module: {
        files: {
          'dist/angular-utilz.min.js': ['dist/angular-utilz.js']
        }
      }
    },
    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        updateConfigs: [],
        commit: false,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json'],
        createTag: false,
        tagName: '%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: false,
        pushTo: APP_VERSION.website,
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
      }
    },
    gta: {
        add: {
            command: 'add -A .',
            options: {
                stdout: true
            }
        },
        commit: {
            command: 'commit -am "Release version '+ APP_VERSION.full +' "',
            options: {
                stdout: true
            }
        },
        tag: {
            command:('tag ' + APP_VERSION.full),
            options: {
                stdout: true
            }
        },
        pushTags: {
            command:('push --tags ' ),
            options: {
                stdout: true
            }
        },
        push: {
            command:('push ' ),
            options: {
                stdout: true
            }
        }
    },
    coveralls: {
        options: {
            coverage_dir: 'reports/coverage'
        }
    },
    jshint: {
			all: {
				src: ['src/*.js'],
				options: {
					jshintrc: true
				}
			}
		},
    clean:{
      dist:['dist']
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.task.registerTask('loadVersion', 'A sample task that logs stuff.', function(arg1, arg2) {
    APP_VERSION = util.getVersion();
  });
  grunt.registerTask('test', ['jshint','karma:unit']);

  grunt.registerTask('release', ['dist','gta:add', 'gta:commit', 'gta:tag', 'gta:push',  'gta:pushTags']);
  // grunt.registerTask('release', ['bump:patch','release:base']);
  // grunt.registerTask('release:minor', ['bump:minor','release:base']);
  // grunt.registerTask('release:major', ['bump:major','release:base']);

  grunt.registerTask('build', [ 'test','bump:prerelease', 'dist']);
  grunt.registerTask('dist', ['loadVersion', 'clean:dist','concat:module', 'uglify:module', 'concat:minify',]);
  grunt.registerTask('default', ['test', 'coveralls']);
};
