/* global module, require  */
module.exports = function (grunt) {
    'use strict';

    var SRC_DIR = 'src/',
        SRC_FILES = [
            SRC_DIR + 'chip8-dasm.js',
            SRC_DIR + 'chip8-is-map.js'
        ],
        TEST_DIR = 'test/',
        SPEC_FILES = [
            TEST_DIR + 'specs/chip8-dasm-is-mapping.spec.js'
        ],
        DOC_DIR = 'doc',
        BUILD_DIR = 'build/',
        BUILD_TARGET = 'chip8-dasm.min.js';

    grunt.initConfig({
        _TARGET: BUILD_DIR + BUILD_TARGET,

        jshint: {
            src: [ 'gruntfile.js', SRC_FILES ],
            options: {
                jshintrc: true
            }
        },

        concat: {
            dist: {
                src: SRC_FILES,
                dest: '<%= _TARGET %>'
            }
        },

        closurecompiler: {
            minify: {
                files: {
                    "<%= _TARGET %>": '<%= _TARGET %>'
                },
                options: {
                    "compilation_level": "SIMPLE_OPTIMIZATIONS",
                    "banner": '/*\n' + require('fs').readFileSync('LICENSE', { encoding: 'utf8' }) + '*/'
                }
            }
        },

        umd: {
            build: {
                options: {
                    src: '<%= _TARGET %>',
                    dest: '<%= _TARGET %>',
                    objectToExport: 'Chip8Dasm',
                    template: 'umd.hbs'
                }
            }
        },

        jasmine: {
            src: '<%= _TARGET %>',
            options: {
                specs: SPEC_FILES
            }
        },

        jsdoc : {
            dist : {
                src: SRC_FILES.concat('README.md'),
                options: {
                    configure: 'jsdoc.conf.json',
                    destination: DOC_DIR,
                    private: false,
                    template : 'node_modules/grunt-jsdoc/node_modules/ink-docstrap/template'
                }
            }
        },

        clean: [ BUILD_DIR, DOC_DIR ]

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-closurecompiler');
    grunt.loadNpmTasks('grunt-umd');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-jsdoc');

    grunt.registerTask('build', ['concat', 'umd:build', 'closurecompiler:minify']);
    grunt.registerTask('test', ['jshint', 'jasmine']);
};
