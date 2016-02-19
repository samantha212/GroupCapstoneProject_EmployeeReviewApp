module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        uglify: {
            build: {
                src: "scripts/script.js",
                dest: "server/public/scripts/main.min.js"
            }
        },
        sass: {
            dist: {
                files: {
                    'server/public/styles/stylesheet.css':'server/public/styles/main.scss'
                }
            }
        },
        watch: {
          css: {
                files: 'server/public/styles/main.scss',
                tasks: ['sass'],
                options: {
                    spawn: false
                }
            },
      			scripts: {
      				files: ["scripts/main.js"],
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
                    "bootstrap/dist/css/bootstrap.min.css.map"
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
