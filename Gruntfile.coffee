module.exports = (grunt) ->

  # Project configuration.
  grunt.initConfig {
    pkg: grunt.file.readJSON 'package.json'
    clean:
      before: ['_site', 'tmp']
      after: ['tmp']
    uglify:
      app:
        src: 'assets/javascripts/app.js'
        dest: 'tmp/assets/javascripts/app.min.js'
      modernizr:
        src: 'assets/javascripts/ext/modernizr.js'
        dest: 'tmp/assets/javascripts/ext/modernizr.js'
    concat:
      index:
        src: [
          '_partials/header.html'
          'index.html'
          '_partials/footer.html'
        ]
        dest: 'tmp/index.html'
      error403:
        src: [
          '_partials/header-error.html'
          'error/403.html'
          '_partials/footer.html'
        ]
        dest: 'tmp/403.html'
      error404:
        src: [
          '_partials/header-error.html'
          'error/404.html'
          '_partials/footer.html'
        ]
        dest: 'tmp/404.html'
      error500:
        src: [
          '_partials/header-error.html'
          'error/500.html'
          '_partials/footer.html'
        ]
        dest: 'tmp/500.html'
    less:
      build:
        options:
          yuicompress: true
        files:
          'tmp/assets/stylesheets/app.min.css': 'assets/stylesheets/app.less'
    copy:
      build:
        files: [
          {
            expand: true
            src: ['assets/javascripts/ext/modernizr.js']
            dest: 'tmp/'
          }
          {
            expand: true
            src: ['assets/images/**/*']
            dest: '_site/'
          }
          {
            expand: true
            src: ['.htaccess']
            dest: '_site/'
          }
        ]
    smoosher:
      build:
        files:
          '_site/index.html': 'tmp/index.html'
          '_site/error/403.html': 'tmp/403.html'
          '_site/error/404.html': 'tmp/404.html'
          '_site/error/500.html': 'tmp/500.html'
    watch:
      files: [
        '_partials/**/*'
        'assets/**/*'
        'error/**/*'
        'index.html'
      ]
      tasks: ['default']
  }

  # Load plugins
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-less'
  grunt.loadNpmTasks 'grunt-html-smoosher'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  # Default task(s).
  grunt.registerTask 'default', ['clean:before', 'copy', 'concat', 'uglify', 'less', 'smoosher', 'clean:after']
