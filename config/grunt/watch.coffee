

module.exports = (grunt) ->
  grunt.config('watch',
    livereload:
      files: [
        'examples/**/*.js'
        'examples/**/*.css'
        'examples/**/*.html'
        '!.build/*.js'
        '!examples/bower_components/**/*'
      ]
      options:
        livereload: true
    coffee:
      files: [
        'src/**/*.coffee'
      ]
      tasks: ['coffee']
    html2js:
      files: [
        'src/template/**/*.html'
      ]
      tasks: ['html2js']
    dist:
      files: [
        '.build/**/*.js'
        'src/**/*.css'
      ]
      tasks: [
        'concat'
        'uglify'
        'copy'
      ]
  )

