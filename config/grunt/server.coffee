

module.exports = (grunt) ->
  grunt.config('connect',
    options:
      port: 9000
      index: 'index.html'
      hostname: "0.0.0.0"
    server:
      options:
        base: "examples"
        livereload: 35729
        open: "http://localhost:9000"
  )

