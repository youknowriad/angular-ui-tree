fs = require('fs')

GRUNT_DIR = 'config/grunt'

module.exports = (grunt) ->
  require('load-grunt-tasks')(grunt)

  grunt.initConfig(
    pkg: grunt.file.readJSON('package.json')
    port: 9000
  )

  files = fs.readdirSync(GRUNT_DIR)
  files.forEach((file) ->
    require("./#{GRUNT_DIR}/#{file}")(grunt)
  )


  grunt.registerTask('dist', ['clean:all', 'coffee', 'html2js', 'concat', 'uglify', 'copy'])
  grunt.registerTask('server', ['dist', 'connect:server', 'watch'])
