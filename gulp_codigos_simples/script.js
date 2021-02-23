

//=== IMPORTS ( npm install --save-dev ) ===//

  'use strict';

  var gulp = require('gulp'),

      sass = require('gulp-sass'), //minifica y une css
      autoprefixer = require('gulp-autoprefixer'), //agrega prefijos css
      jshint = require('gulp-jshint'), //control de calidad js
      uglify = require('gulp-uglify'), //minifica js
      concat = require('gulp-concat'), //une js
      plumber = require('gulp-plumber'), //manejo de errores
      rename = require('gulp-rename'), //renombra archivos
      notify = require('gulp-notify'), //notificaciones en sistema
      browserSync = require('browser-sync'), // refresca todos los navegadores

      // origen archivos

      $src = 'src/', // src dir
      $mainScss = $src + 'scss/*.scss', // archivo principal scss
      $allScss = $src + 'scss/**/*.scss', // todos los archivos scss
      $mainJs = $src + 'scripts/*.js', // archivos js propios

      $allJs = [ // todos los js
        $src + 'scripts/vendors/file-3.js', // archivos js de terceros
        $src + 'scripts/vendors/file-1.js', // archivos js de terceros
        $src + 'scripts/vendors/file-2.js', // archivos js de terceros
        $src + 'scripts/*.js' // archivos js propios
      ],

      // destino archivos

      $dist = 'dist/', // dist dir
      $css = $dist + 'css/', // css dir
      $js = $dist + 'js/'; // js dir

  //=== TAREAS ===//


  //=== MANEJO DE ERRORES ===//

  //encontrado en : https://gist.github.com/floatdrop/8269868

  // * 1 * // crea una variable _gulpsrc
  // * 2 * // añade una función a gulp.src
  // * 3 * // encadena plumber
  // * 4 * // pasa los errores a notify
  // * 5 * // termina notify
  // * 6 * // termina plumber


  var _gulpsrc = gulp.src; // * 1 * //

  gulp.src = function() { // * 2 * //
    return _gulpsrc.apply(gulp, arguments)
    .pipe(plumber({ // * 3 * //
      errorHandler: function(err) {
        notify.onError({ // * 4 * //
          title:    'Gulp Error',
          message:  'Error: <%= error.message %>',
          sound:    'Bottle'
        })(err);
        this.emit('end'); // * 5 * //
      }
    }));
    this.emit('end'); // * 6 * // // fix bug //
  };

  // * fix bug * //
  // solución encontrada en:
  // http://stackoverflow.com/questions/30506786/gulp-plumber-breaking-sass-pipe

  // necesario para la tarea de sass
  // si no se finaliza la tarea de plumber
  // la tarea de sass detiene el watch
  // cuando detecta un error en el código


  //=== SASS ===//

  // * 1 * // origen desarrollo (solo archivo final generado por imports)
  // * 2 * // compresión desarrollo (legible)
  // * 3 * // auto-prefijos (más info https://github.com/ai/browserslist)
  // * 4 * // destino producción
  // * 5 * // copia y renombra con prefijo .min
  // * 6 * // compresión producción (minificada)
  // * 7 * // destino producción
  // * 8 * // refresca el navegador
  // * 9 * // notificación en sistema

  gulp.task('sass', function() {

    return gulp.src($mainScss) // * 1 * //
    .pipe(sass({outputStyle: 'nested'})) // * 2 * //
    .pipe(autoprefixer('last 2 versions')) // * 3 * //
    .pipe(gulp.dest($css)) // * 4 * //
    .pipe(rename({suffix: '.min'})) // * 5 * //
    .pipe(sass({outputStyle: 'compressed'})) // * 6 * //
    .pipe(gulp.dest($css)) // * 7 * //
    .pipe(browserSync.stream()) // * 8 * //
    .pipe(notify({ message: 'Tarea sass finalizada' })); // * 9 * //
  });

  //=== BROWSER-SYNC ===//

  // * 1 * // monta un servidor estático en dist
  // * 2 * // vigila cambios en archivos scss y aplica la tarea sass
  // * 3 * // vigila cambios en archivos js (propios) y aplica las tareas jshint y scripts
  // * 4 * // vigila cambios en archivo html (destino) y refresca el navegador

  gulp.task('serve', ['sass'], function() {
    browserSync.init({ server: $dist }); // * 1 * //
    gulp.watch($allScss, ['sass']); // * 2 * //
    gulp.watch($mainJs, ['jshint', 'scripts']); // * 3 * //
    gulp.watch($dist + '*.html').on('change', browserSync.reload); // * 4 * //
  });

  //=== CONTROL DE CALIDAD JS ===//

  // * 1 * // origen desarrollo (solo archivos propios)
  // * 2 * // revisa el js en busca de errores
  // * 3 * // notificación en sistema

  gulp.task('jshint', function() {
    return gulp.src($mainJs) // * 1 * //
    .pipe(jshint()) // * 2 * //
    .pipe(notify({ message: 'Tarea jshint finalizada' })); // * 3 * //
  });


  //=== scripts ===//

  // * 1 * // origen desarrollo
  // * 2 * // concatena los archivos respetando el orden del array
  // * 3 * // destino producción (legible)
  // * 4 * // copia y renombra con prefijo .min
  // * 5 * // minifica los archivos
  // * 6 * // destino producción (minificado)
  // * 7 * // refresca el navegador
  // * 8 * // notificación de sistema

  gulp.task('scripts', function() {

    return gulp.src($allJs) // * 1 * //
    .pipe(concat('main.js')) // * 2 * //
    .pipe(gulp.dest($js)) // * 3 * //
    .pipe(rename({suffix: '.min'})) // * 4 * //
    .pipe(uglify()) // * 5 * //
    .pipe(gulp.dest($js)) // * 6 * //
    .pipe(browserSync.stream()) // * 7 * //
    .pipe(notify({ message: 'Tarea scripts finalizada' })); // * 8 * //
  });

  //=== tarea por defecto ===//

  // sass escribe los cambios que se hacen con gulp detenido
  // scripts escribe los cambios que se hacen con gulp detenido
  // serve monta el servidor y ejecuta el watch (scss, js, html)

  gulp.task('default', ['sass', 'scripts', 'serve']);











