module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		copy: {
			css_files: {
				files: [
					/*Bootstrap css files*/
					{src:'bower_components/bootstrap/dist/css/bootstrap.css' , dest: 'src/css/bootstrap.css'},
					{src:'bower_components/bootstrap/dist/css/bootstrap-theme.css', dest: 'src/css/bootstrap-theme.css'},
					/*bxslider css files*/
					{src:'bower_components/bxslider-4/dist/jquery.bxslider.css', dest: 'src/css/jquery.bxslider.css'},
					/*DataTables jQuery plug-in css files with bootstrap integration*/
					/*datatables.net-bootstrap*/
					{src:'bower_components/datatables.net-bs/css/dataTables.bootstrap.css', dest: 'src/css/dataTables.bootstrap.css'},
					/*datatables.net-RESPONSIVE-bootstrap*/
					{src:'bower_components/datatables.net-responsive-bs/css/responsive.bootstrap.css' , dest: 'src/css/responsive.bootstrap.css'}
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
					{src:'bower_components/bootstrap/dist/js/bootstrap.js', dest: 'src/js/bootstrap.js'},
					/*bxslider JS file*/
					{src:'bower_components/bxslider-4/dist/jquery.bxslider.js' , dest: 'src/js/jquery.bxslider.js'},
					/*DataTables jQuery plug-in Core*/
					{src:'bower_components/datatables.net/js/jquery.dataTables.js', dest: 'src/js/jquery.dataTables.js'},
					/*DataTables jQuery plug-in bootstrap integration*/
					{src:'bower_components/datatables.net-bs/js/dataTables.bootstrap.js', dest: 'src/js/dataTables.bootstrap.js'},
					/* DataTables jQuery plug-in 'Responsive' extension js file*/
					{src:'bower_components/datatables.net-responsive/js/datatables.responsive.js', dest: 'src/js/dataTables.responsive.js'},
					/*DataTables jQuery plug-in 'Responsive' extension BOOTSTRAP INTEGRATION*/
					{src:'bower_components/datatables.net-responsive-bs/js/responsive.bootstrap.js' , dest: 'src/js/responsive.bootstrap.js'},
					/*html5shiv*/
					{src:'bower_components/html5shiv/dist/html5shiv.js', dest: 'src/js/html5shiv.js'},
                    /* jquery is served through the Google CDN */
                    /* GSAP */
                    {src:'bower_components/gsap/src/uncompressed/plugins/CSSPlugin.js', dest: 'src/js/CSSPlugin.js'},
                    {src:'bower_components/gsap/src/uncompressed/TweenLite.js', dest: 'src/js/TweenLite.js'},
                    {src:'bower_components/gsap/src/uncompressed/TimelineLite.js', dest: 'src/js/TimelineLite.js'},
                    {src:'bower_components/gsap/src/uncompressed/easing/EasePack.js', dest: 'src/js/EasePack.js'}
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
				files: ['src/css/*.less'],
				tasks: ['less']
			}
			/*,
			js_scripts: {
				files: ['src/js/*.js'],
				tasks: ['uglify'],
				options: {
					event: ['all']
				}
			}*/
		}   
    });
  
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.registerTask('default', ['less', 'cssmin', 'uglify']);

};