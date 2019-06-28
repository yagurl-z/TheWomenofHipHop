var facts = ["Across six years in the pop charts, females only account for 22% of all artist.", "Of 2,767 songwriters credited, 87.7% were male and 12.3% were female.", "Taylor Swift and Nicki Minaj, along with Rhianna have the most songwriting credits among women in hip hop music from 2012 - 2017.", "Music producers are biased against women. When they think of Producers they think of men istead of women making it hard for women to be taken seriously.", "899 people were nominated for a Grammy Award between 2013 - 2018. 90.7% were male, and 9.3% were female.", "Out of a study of 651 producers, 98% were male, and only 2% were female.", "The women with the most songwriting credits are Nicki Minaj, with 15; Rhianna, with 13; and Taylor Swift, with 11."]
var button = $('.buttonFont');
var factshere = $('.facthere');

button.on('click',randomizerOne);

function randomizerOne() {
  event.preventDefault();
  var random = Math.floor(Math.random()*(facts.length - 1));
  var newfacts = facts[random];
  factshere.text(newfacts);
}

var quotes = ["Some things take time. Stay patient. Stay positive. Things will get better.", "Believe you can and you're halfway there.", "Train yourself to find the positive in everything.", "It's you're life. Don't let anyone make you feel guilty for living it your way.", "You are amazing. You are brave. You are strong", "She believed she could so she did."]
var button = $('button');
var quoteshere = $('.quoteshere');

button.on('click', randomizer);

function randomizer() {
  event.preventDefault();
  var random = Math.floor(Math.random()*(quotes.length - 1));
  var newquotes = quotes[random];
  quoteshere.text(newquotes);
}

"use strict";

// Load plugins
const browsersync = require("browser-sync").create();
const del = require("del");
const gulp = require("gulp");
const merge = require("merge-stream");

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./"
    },
    port: 3000
  });
  done();
}

// BrowserSync reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// Clean vendor
function clean() {
  return del(["./vendor/"]);
}

// Bring third party dependencies from node_modules into vendor directory
function modules() {
  // Bootstrap
  var bootstrap = gulp.src('./node_modules/bootstrap/dist/**/*')
    .pipe(gulp.dest('./vendor/bootstrap'));
  // jQuery
  var jquery = gulp.src([
      './node_modules/jquery/dist/*',
      '!./node_modules/jquery/dist/core.js'
    ])
    .pipe(gulp.dest('./vendor/jquery'));
  return merge(bootstrap, jquery);
}

// Watch files
function watchFiles() {
  gulp.watch("./**/*.css", browserSyncReload);
  gulp.watch("./**/*.html", browserSyncReload);
}

// Define complex tasks
const vendor = gulp.series(clean, modules);
const build = gulp.series(vendor);
const watch = gulp.series(build, gulp.parallel(watchFiles, browserSync));

// Export tasks
exports.clean = clean;
exports.vendor = vendor;
exports.build = build;
exports.watch = watch;
exports.default = build;
