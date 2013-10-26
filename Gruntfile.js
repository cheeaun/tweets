module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		hogan: {
			binder: {
				templates: './templates/binder.hogan',
				output: './templates/binder.js',
				binderName: 'bootstrap'
			},
			build: {
				templates: './templates/*.mustache',
				output: './assets/js/templates.js',
				binder: __dirname + '/templates/binder.js'
			}
		},
		uglify: {
			options: {
				report: 'min'
			},
			build: {
				options: {
					beautify: {
						max_line_len: 500,
						screw_ie8: true
					}
				},
				files: {
					'assets/js/scripts.min.js': [
						'bower_components/jquery/jquery.js',
						'bower_components/lodash/dist/lodash.js',
						'bower_components/backbone/backbone.js',
						'bower_components/hogan/web/builds/2.0.0/template-2.0.0.js',
						'bower_components/twitter-text/twitter-text.js',
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
					hostname: null
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