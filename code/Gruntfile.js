module.exports = function (grunt) {
// Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dist: {
        options: {
          compass: 'config.rb',
          sourcemap: true,
          precision: 10,
          style: 'compressed'
        },
        files: [{
          expand: true,
          cwd: 'sass',
          src: ['*.scss'],
          dest: 'css_tmp/',
          ext: '.css'
        }]
      }
    },

    autoprefixer: {
      dist: {
        options: {
          browsers: ['last 2 versions', 'ie 9', 'bb 10', 'android > 2.2', 'ios >= 4.3', 'ff > 24'],
          map: true
        },
        files: [{
          expand: true,
          flatten: true,
          src: ['css_tmp/*.css'],
          dest: 'css/'
        }]
      }
    },

    watch: {
      sass: {
        files: ['sass/**/*.s?ss'],
        tasks: ['sass']
      },
      unprefixedStyles: {
        files: 'css_tmp/*.css',
        tasks: ['autoprefixer']
      }
    },
    svgstore:{
      options: {
        prefix: 'icn-',
	svg: {class:'h-hidden'},
	includedemo:true
      },
      default: {
        files: {
          'images/icons.svg': ['assets/svgs/*.svg']
        }
      }
    }
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-svgstore');

  // tasks
  grunt.registerTask('default', ['watch']);
};
