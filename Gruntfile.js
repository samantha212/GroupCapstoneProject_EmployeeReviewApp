module.exports = function(grunt) {
    // Project configuration.
    var jsFiles = ['scripts/finalratingcontroller.js', 'scripts/goalscontroller.js', 'scripts/haircontroller.js', 'scripts/hairratingcontroller.js', 'scripts/mapcontroller.js', 'scripts/signaturecontroller.js', 'scripts/strengthsdevscontroller.js', 'scripts/maincontroller.js', 'scripts/financescontroller.js', 'scripts/client.js', 'scripts/homecontroller.js', 'scripts/reviewservice.js'];
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        uglify: {
            build: {
                expand: true,
                src: jsFiles,
                dest: "server/public/",
                ext: '.min.js'
            }
        },
        sass: {
            dist: {
                files: {
                    'server/public/styles/stylesheet.css':'sass/main.scss'
                }
            }
        },
        watch: {
          css: {
                files: 'sass/main.scss',
                tasks: ['sass'],
                options: {
                    spawn: false
                }
            },
      			scripts: {
      				files: jsFiles,
      				tasks: ["uglify"],
      				options: {
      					spawn: false
      				}
      			}
    		},
        copy: {
            main: {
                expand: true,
                cwd: "node_modules/",
                src: [
                    "angular/angular.min.js",
                    "angular/angular.min.js.map",
                    "angular-route/angular-route.min.js",
                    "angular-route/angular-route.min.js.map",
                    "bootstrap/dist/css/bootstrap.min.css",
                    "bootstrap/dist/css/bootstrap.min.css.map",
                    "bootstrap/*.*",
                    "bootstrap/**/*.*"
                ],
                "dest": "server/public/vendors/"
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-sass");

    // Default task(s).
    grunt.registerTask("default", ["copy", "uglify", "watch", "sass"]);

};
