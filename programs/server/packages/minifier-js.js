(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;

/* Package-scope variables */
var UglifyJS, UglifyJSMinify;

(function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/minifier-js/minifier.js                                  //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
UglifyJS = Npm.require('uglify-js');
UglifyJSMinify = UglifyJS.minify;
///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['minifier-js'] = {}, {
  UglifyJSMinify: UglifyJSMinify,
  UglifyJS: UglifyJS
});

})();
