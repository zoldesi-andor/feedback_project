module.exports = function (grunt) {

	grunt.loadNpmTasks('grunt-bower-task');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-typescript');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		bower: {
			install: {
				options: {
					targetDir: './client/lib',
					layout: 'byComponent'
				}
			}
		},
		typescript: {
			dev: {
				src: [
					'typings/knockout/knockout.d.ts', 
					'typings/jquery/jquery.d.ts',  
					'typings/requirejs/require.d.ts', 
					'client/ts/**/*.ts'],
				dest: '.',
				options: {
					module: 'amd',
					target: 'es5',
					sourceMap: true
				}
			}
		},
		copy: {
			dev: {
				files: [
					{ expand: true, cwd: 'client/ts/', src: ['**/*.js'], dest: 'public/scripts/' },
				]
			}
		},
		clean: {
			dev: ['client/ts/**/*.js', 'client/ts/**/*.js.map']
		}
	});

	// Default task(s).
	grunt.registerTask('default', ['clean', 'bower', 'typescript']);
};