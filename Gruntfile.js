module.exports = function(grunt) {

    grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
        css_files: {
            files: [
                /*Bootstrap css files*/
                {src:'bower_components/bootstrap/dist/css/bootstrap.css' , dest: 'src/css/bootstrap.css'},
                {src:'bower_components/bootstrap/dist/css/bootstrap-theme.css', dest: 'src/css/bootstrap-theme.css'},
                /*DataTables jQuery plug-in css files with bootstrap integration*/
                {src:'bower_components/datatables.net-bs/css/dataTables.bootstrap.css', dest: 'src/css/dataTables.bootstrap.css'},
                {src:'bower_components/datatables.net-responsive-bs/css/responsive.bootstrap.css' , dest: 'src/css/responsive.bootstrap.css'},
                /*bxslider css files*/
                {src:'bower_components/bxslider-4/dist/jquery.bxslider.css', dest: 'src/css/jquery.bxslider.css'}
            ]
        },
        /*Bootstrap fonts for the src folder*/
        bootstrap_fonts_src: {
            files: [
                {
                    expand: true,
                    cwd: 'bower_components/bootstrap/dist/fonts/',
                    src: ['**.**'],
                    dest: 'src/fonts/'
                }
            ]
        },
        /*Bootstrap fonts for the dest folder*/
        bootstrap_fonts_dest: {
            files: [
                {
                    expand: true,
                    cwd: 'bower_components/bootstrap/dist/fonts/',
                    src: ['**.**'],
                    dest: 'dest/fonts/'
                }
            ]
        },
        /*DataTables images for the src folder*/
        datatables_images_src: {
            files: [
                {
                    expand: true,
                    cwd: 'bower_components/datatables.net-dt/images/',
                    src: ['**.**'],
                    dest: 'src/images/'
                }
            ]
        },
        /*DataTables images for the dest folder*/
        datatables_images_dest: {
            files: [
                {
                    expand: true,
                    cwd: 'bower_components/datatables.net-dt/images/',
                    src: ['**.**'],
                    dest: 'dest/images/'
                }
            ]
        },
        /*bxslider images for the src folder*/
        bxslider_img_src: {
            files: [
                {
                    expand: true,
                    cwd: 'bower_components/bxslider-4/dist/images/',
                    src: ['**.**'],
                    dest: 'src/images/'
                }
            ]
        },
        /*bxslider images for the dest folder*/
        bxslider_img_dest: {
            files: [
                {
                    expand: true,
                    cwd: 'bower_components/bxslider-4/dist/images/',
                    src: ['**.**'],
                    dest: 'dest/images/'
                }
            ]
        },
        javascript_files: {
             files: [
                /*Bootstrap js file*/
                {src:'bower_components/bootstrap/dist/js/bootstrap.js' , dest: 'src/js/bootstrap.js'},
                /*DataTables jQuery plug-in js files with bootstrap integration*/
                {src:'bower_components/datatables.net/js/jquery.dataTables.js', dest: 'src/js/jquery.dataTables.js'},
                {src:'bower_components/datatables.net-bs/js/dataTables.bootstrap.js' , dest: 'src/js/dataTables.bootstrap.js'},
                /*
                * DataTables jQuery plug-in 'Responsive' extension js file
                * Script below to be copied
                * and evaluated later.
                * If commented out, stick with
                * the version of the script
                * currently installed
                */
                {src:'bower_components/datatables.net-responsive/js/datatables.responsive.js', dest: 'src/js/dataTables.responsive.js'},
                /*DataTables jQuery plug-in 'Responsive' extension bootstrap integration*/
                {src:'bower_components/datatables.net-responsive-bs/js/responsive.bootstrap.js' , dest: 'src/js/responsive.bootstrap.js'},
                /*bxslider JS file*/
                {src:'bower_components/bxslider-4/dist/jquery.bxslider.js' , dest: 'src/js/jquery.bxslider.js'}
            ]    
        }   
    },
    less: {
        dist: {
            options: {
                compress: false
             },
        files: {
            'src/css/karaoke.main.css': 'src/css/*.less' 
        }
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'src/css',
          src: ['*.css'],
          dest: 'dest/css',
          ext: '.min.css',
          extDot: 'last'
        }]
      }
    },
    uglify: {
      target: {
        files: [{
          expand: true,
          cwd: 'src/js',
          src: ['*.js', '!*.min.js', '!hotel-snippet.js'],
          dest: 'dest/js',
          ext: '.min.js',
          extDot: 'last'
        }] 
      }
    },
    watch: {
      styles: {
        files: 'src/css/*.css',
        tasks: ['default'],
        options: {
          event: ['all']
        }
      },
      js_scripts: {
        files: ['src/js/*.js'],
        tasks: ['default'],
        options: {
          event: ['all']
        }
      }
    }   
    });
  
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
  
    grunt.registerTask('default', ['less', 'cssmin', 'uglify']);

};