module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		hogan: {
			binder: {
				src: __dirname + '/templates/binder.hogan',
				dest: __dirname + '/templates/binder.js',
				options: {
					binderName: 'bootstrap'
				}
			},
			build: {
				src: __dirname + '/templates/*.mustache',
				dest: __dirname + '/assets/js/templates.js',
				options: {
					binderPath: __dirname + '/templates/binder.js'
				}
			}
		},
		uglify: {
			options: {
				report: 'min'
			},
			build: {
				options: {
					beautify: {
						max_line_len: 500
					}
				},
				files: {
					'assets/js/scripts.min.js': [
						'bower_components/zepto/zepto.js',
						'bower_components/lodash/dist/lodash.js',
						'bower_components/backbone/backbone.js',
						'bower_components/hogan/web/builds/3.0.2/template-3.0.2.js',
						'bower_components/twitter-text/twitter-text.js',
						'bower_components/twemoji/twemoji.js',
						'bower_components/moment/moment.js',
						'assets/js/templates.js'
					]
				}
			}
		},
		jshint: {
			all: [
				'assets/js/app.js'
			]
		},
		connect: {
			server: {
				options: {
					keepalive: true,
					hostname: '*'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-hogan');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-connect');

	grunt.registerTask('build', ['hogan', 'uglify']);

};
