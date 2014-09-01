var fs = require('fs');
var shell = require('shelljs');
var grunt = require('grunt');
var version;

module.exports = {
  files:[
    'libs/bower_components/angular/angular.js',
    'libs/bower_components/angular-mocks/angular-mocks.js',
    'src/angular-utilz.js',
    'test/unit/**/*.js'
  ],
  getVersion: function () {
        //if (version) return version;

        var pkg = JSON.parse(fs.readFileSync('package.json', 'UTF-8'));
        var match = pkg.version.match(/^([^\-]*)(?:\-(.+))?$/);
        var semver = match[1].split('.');

        var fullVersion = match[1];

        if (match[2]) {
            fullVersion += '-';
            fullVersion += (match[2] == 'snapshot') ? getSnapshotSuffix() : match[2];
        }
        //console.log(match);
        version = {
            full: fullVersion,
            major: semver[0],
            minor: semver[1],
            dot: semver[2].replace(/rc\d+/, ''),
            website : pkg.homepage,
            license : pkg.license,
            contributor : pkg.author,
            appname : pkg.name,
            description : pkg.description
        };

        return version;

        function getSnapshotSuffix() {
            var hash = shell.exec('git rev-parse --short HEAD', {silent: true}).output.replace('\n', '');
            return 'sha.'+hash;
        }
    }
};
