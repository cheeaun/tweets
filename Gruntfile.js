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
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				files: {
					'assets/js/scripts.min.js': [
						'components/jquery/jquery.js',
						'components/lodash/lodash.js',
						'components/backbone/backbone.js',
						'components/hogan/web/builds/2.0.0/template-2.0.0.js',
						'components/twitter-text/twitter-text.js',
						'components/moment/moment.js',
						'components/hide-address-bar/hide-address-bar.js',
						'assets/js/templates.js'
					]
				}
			}
		},
		jshint: {
			all: [
				'assets/js/app.js',
				'assets/js/scripts.min.js'
			]
		},
		connect: {
			server: {
				options: {
					keepalive: true
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