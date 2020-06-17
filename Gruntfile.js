module.exports = function(grunt) {
    const WWWROOT = 'wwwroot';
    const SRC = 'src';

    grunt.initConfig({
        connect: {
            server: {
                options: {
                    base: WWWROOT
                }
            }
        },
        sass: {
            build: {
                src: SRC + '/**/*.scss',
                dest: WWWROOT + '/main.css'
            }
        },
        watch: {
            files: SRC + '/**/*',
            tasks: ['sass', 'concat']
        },
        concat: {
            options: {
                separator: ';\n'
            },
            build: {
                src: SRC + '/**/*.js',
                dest: WWWROOT + '/main.js'
            },
            js: {
                src: [
                    'node_modules/angular/angular.min.js',
                    'node_modules/angular-animate/angular-animate.min.js',
                    'node_modules/angular-aria/angular-aria.min.js',
                    'node_modules/angular-messages/angular-messages.min.js',
                    'node_modules/angular-material/angular-material.min.js'
                ],
                dest: WWWROOT + '/lib.js'
            },
            css: {
                src: 'node_modules/angular-material/angular-material.min.css',
                dest: WWWROOT + '/lib.css'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['sass', 'concat', 'connect', 'watch']);
};
