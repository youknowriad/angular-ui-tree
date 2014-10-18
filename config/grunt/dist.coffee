module.exports = (grunt) ->

  grunt.config('coffee',
    compile:
      options:
        bare: true
      files:
        ".build/angular-ui-tree.js": [
          'src/main.coffee',
          'src/services/*.coffee',
          'src/controllers/*.coffee',
          'src/directives/*.coffee'
        ]
  )

  grunt.config('clean',
    all: ['.build', 'dist', 'examples/ui-tree']
    coffee: ['.build']
  )

  grunt.config('html2js',
    dist: {
      options: {
        module: null # no bundle module for all the html2js templates
        base: './src/'
      },
      files: [{
        src: ['src/template/**/*.html']
        dest: '.build/template.js'
      }]
    }
  )

  grunt.config('concat',
    options:
      banner:
        '/*! Angular-ui-tree v<%= pkg.version %>\n' +
        ' *  https://github.com/jimliu/angular-ui-tree\n' +
        ' *  Copyright (c) 2014, Jim Liu\n' +
        ' */\n'
    tree:
      files:
        'dist/angular-ui-tree.js': ['.build/angular-ui-tree.js', '.build/template.js']
        'dist/angular-ui-tree.css': ['src/angular-ui-tree.css']
  )

  grunt.config('uglify',
    tree:
      options:
        sourceMap: true
      files:
        'dist/angular-ui-tree.min.js': ['dist/angular-ui-tree.js']
  )

  grunt.config('copy',
    dist:
      expand: true
      cwd: 'dist/'
      src: "*"
      dest: "examples/ui-tree/"
  )