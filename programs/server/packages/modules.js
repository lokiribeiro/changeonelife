(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var _ = Package.underscore._;
var meteorInstall = Package['modules-runtime'].meteorInstall;

/* Package-scope variables */
var Buffer, process;

var require = meteorInstall({"node_modules":{"meteor":{"modules":{"server.js":["./install-packages.js","./buffer.js","./process.js","./reify.js",function(require){

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// packages/modules/server.js                                                                   //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
require("./install-packages.js");
require("./buffer.js");
require("./process.js");
require("./reify.js");

//////////////////////////////////////////////////////////////////////////////////////////////////

}],"buffer.js":["buffer",function(require){

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// packages/modules/buffer.js                                                                   //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
try {
  Buffer = global.Buffer || require("buffer").Buffer;
} catch (noBuffer) {}

//////////////////////////////////////////////////////////////////////////////////////////////////

}],"install-packages.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// packages/modules/install-packages.js                                                         //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
function install(name, mainModule) {
  var meteorDir = {};

  // Given a package name <name>, install a stub module in the
  // /node_modules/meteor directory called <name>.js, so that
  // require.resolve("meteor/<name>") will always return
  // /node_modules/meteor/<name>.js instead of something like
  // /node_modules/meteor/<name>/index.js, in the rare but possible event
  // that the package contains a file called index.js (#6590).

  if (mainModule) {
    meteorDir[name + ".js"] = [mainModule, function (require, e, module) {
      module.exports = require(mainModule);
    }];
  } else {
    // back compat with old Meteor packages
    meteorDir[name + ".js"] = function (r, e, module) {
      module.exports = Package[name];
    };
  }

  meteorInstall({
    node_modules: {
      meteor: meteorDir
    }
  });
}

// This file will be modified during computeJsOutputFilesMap to include
// install(<name>) calls for every Meteor package.

install("underscore");
install("meteor");
install("meteor-base");
install("mobile-experience");
install("npm-mongo");
install("modules-runtime");
install("modules", "meteor/modules/server.js");
install("es5-shim", "meteor/es5-shim/server.js");
install("promise", "meteor/promise/server.js");
install("ecmascript-runtime", "meteor/ecmascript-runtime/runtime.js");
install("babel-compiler");
install("ecmascript");
install("base64");
install("ejson");
install("id-map");
install("ordered-dict");
install("tracker");
install("babel-runtime", "meteor/babel-runtime/babel-runtime.js");
install("random");
install("mongo-id");
install("diff-sequence");
install("geojson-utils", "meteor/geojson-utils/main.js");
install("minimongo");
install("check", "meteor/check/match.js");
install("retry");
install("ddp-common");
install("ddp-client", "meteor/ddp-client/namespace.js");
install("rate-limit");
install("ddp-rate-limiter");
install("logging");
install("routepolicy");
install("deps");
install("htmljs");
install("html-tools");
install("blaze-tools");
install("spacebars-compiler");
install("observe-sequence");
install("jquery");
install("reactive-var");
install("blaze");
install("spacebars");
install("ui");
install("boilerplate-generator");
install("webapp-hashing");
install("webapp");
install("callback-hook");
install("ddp-server");
install("ddp");
install("allow-deny");
install("binary-heap");
install("mongo");
install("blaze-html-templates");
install("standard-minifier-css");
install("session");
install("mquandalle:jade");
install("juliancwirko:s-jeet");
install("velocityjs:velocityjs");
install("reactive-dict");
install("kadira:flow-router");
install("templating-compiler");
install("templating-runtime");
install("templating");
install("kadira:blaze-layout");
install("fortawesome:fontawesome");
install("shell-server", "meteor/shell-server/main.js");
install("accounts-base", "meteor/accounts-base/server_main.js");
install("okgrow:analytics", "meteor/okgrow:analytics/server/main.js");
install("npm-bcrypt", "meteor/npm-bcrypt/wrapper.js");
install("sha");
install("srp");
install("email");
install("accounts-password");
install("alanning:roles");
install("twbs:bootstrap");
install("standard-minifier-js");
install("minifier-js");
install("themeteorchef:bert");
install("edgee:slingshot");
install("livedata");
install("hot-code-push");
install("launch-screen");
install("autoupdate");
install("reload");
install("service-configuration");

//////////////////////////////////////////////////////////////////////////////////////////////////

},"process.js":["process",function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// packages/modules/process.js                                                                  //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
try {
  // The application can run `npm install process` to provide its own
  // process stub; otherwise this module will provide a partial stub.
  process = global.process || require("process");
} catch (noProcess) {
  process = {};
}

if (Meteor.isServer) {
  // Make require("process") work on the server in all versions of Node.
  meteorInstall({
    node_modules: {
      "process.js": function (r, e, module) {
        module.exports = process;
      }
    }
  });
} else {
  process.platform = "browser";
  process.nextTick = process.nextTick || Meteor._setImmediate;
}

if (typeof process.env !== "object") {
  process.env = {};
}

_.extend(process.env, meteorEnv);

//////////////////////////////////////////////////////////////////////////////////////////////////

}],"reify.js":["reify/lib/runtime",function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// packages/modules/reify.js                                                                    //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
var Module = module.constructor;
require("reify/lib/runtime").enable(Module);
var Mp = Module.prototype;
Mp.importSync = Mp.importSync || Mp.import;
Mp.import = Mp.import || Mp.importSync;

//////////////////////////////////////////////////////////////////////////////////////////////////

}],"node_modules":{"reify":{"lib":{"runtime.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// node_modules/meteor/modules/node_modules/reify/lib/runtime.js                                //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
var hasOwn = Object.prototype.hasOwnProperty;
var Entry = require("./entry.js").Entry;
var utils = require("./utils.js");
var dynRequire = module.require ? function require(id) {
  // Infuriatingly, this code may have to run in environments that do not
  // have Function.prototype.bind (cough cough PhantomJS).
  return module.require(id);
} : __non_webpack_require__;

exports.enable = function (Module) {
  var Mp = Module.prototype;

  if (typeof Mp.importSync === "function" &&
      typeof Mp.export === "function") {
    // If the Mp.{importSync,export} methods have already been defined,
    // abandon reification immediately.
    return Module;
  }

  // Platform-specific code should implement this method however
  // appropriate. Module.prototype.resolve(id) should return an absolute
  // version of the given module identifier, like require.resolve.
  Mp.resolve = Mp.resolve || function resolve(id) {
    throw new Error("Module.prototype.resolve not implemented");
  };

  // Platform-specific code should find a way to call this method whenever
  // the module system is about to return module.exports from require. This
  // might happen more than once per module, in case of dependency cycles,
  // so we want Module.prototype.runModuleSetters to run each time.
  Mp.runModuleSetters = function runModuleSetters(valueToPassThrough) {
    var entry = Entry.get(this.id);
    if (entry) {
      entry.runModuleSetters(this);
    }

    // Assignments to exported local variables get wrapped with calls to
    // module.runModuleSetters, so module.runModuleSetters returns the
    // valueToPassThrough parameter to allow the value of the original
    // expression to pass through. For example,
    //
    //   export var a = 1;
    //   console.log(a += 3);
    //
    // becomes
    //
    //   module.export("a", () => a);
    //   var a = 1;
    //   console.log(module.runModuleSetters(a += 3));
    //
    // This ensures module.runModuleSetters runs immediately after the
    // assignment, and does not interfere with the larger computation.
    return valueToPassThrough;
  };

  function setESModule(module) {
    var exports = module.exports;
    if (exports &&
        typeof exports === "object" &&
        ! hasOwn.call(exports, "__esModule")) {
      Object.defineProperty(exports, "__esModule", {
        value: true,
        enumerable: false,
        writable: false,
        configurable: true
      });
    }
  }

  // If key is provided, it will be used to identify the given setters so
  // that they can be replaced if module.importSync is called again with the
  // same key. This avoids potential memory leaks from import declarations
  // inside loops. The compiler generates these keys automatically (and
  // deterministically) when compiling nested import declarations.
  Mp.importSync = function (id, setters, key) {
    var module = this;
    setESModule(module);

    var absoluteId = module.resolve(id);

    if (setters && typeof setters === "object") {
      var entry = Entry.getOrCreate(absoluteId);
      entry.addSetters(module, setters, key);
    }

    var countBefore = entry && entry.runCount;
    var exports = typeof module.require === "function"
      ? module.require(absoluteId)
      : dynRequire(absoluteId);

    if (entry && entry.runCount === countBefore) {
      // If require(absoluteId) didn't run any setters for this entry,
      // perhaps because it's not the first time this module has been
      // required, run the setters now using an object that passes as the
      // real module object.
      entry.runModuleSetters({
        id: absoluteId,
        exports: exports,
        getExportByName: Mp.getExportByName
      });
    }
  };

  // Register getter functions for local variables in the scope of an
  // export statement. The keys of the getters object are exported names,
  // and the values are functions that return local values.
  Mp.export = function (getters) {
    var module = this;
    setESModule(module);

    if (utils.isPlainObject(getters)) {
      Entry.getOrCreate(module.id).addGetters(getters);
    }

    if (module.loaded) {
      // If the module has already been evaluated, then we need to trigger
      // another round of entry.runModuleSetters calls, which begins by
      // calling entry.runModuleGetters(module).
      module.runModuleSetters();
    }
  };

  // This method can be overridden by client code to implement custom export
  // naming logic. The current implementation works well with Babel's
  // __esModule convention.
  Mp.getExportByName = function (name) {
    var exports = this.exports;

    if (name === "*") {
      return exports;
    }

    if (name === "default" &&
        ! (exports &&
           typeof exports === "object" &&
           exports.__esModule &&
           "default" in exports)) {
      return exports;
    }

    return exports && exports[name];
  };

  return Module;
};

//////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}},"babel-runtime":{"regenerator":{"index.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// node_modules/babel-runtime/regenerator/index.js                                              //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
module.exports = require("regenerator-runtime");

//////////////////////////////////////////////////////////////////////////////////////////////////

}},"helpers":{"typeof.js":function(require,exports){

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// node_modules/babel-runtime/helpers/typeof.js                                                 //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
"use strict";

exports.__esModule = true;

var _iterator = require("../core-js/symbol/iterator");

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = require("../core-js/symbol");

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};
//////////////////////////////////////////////////////////////////////////////////////////////////

},"classCallCheck.js":function(require,exports){

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// node_modules/babel-runtime/helpers/classCallCheck.js                                         //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
"use strict";

exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
//////////////////////////////////////////////////////////////////////////////////////////////////

},"possibleConstructorReturn.js":function(require,exports){

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// node_modules/babel-runtime/helpers/possibleConstructorReturn.js                              //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
"use strict";

exports.__esModule = true;

var _typeof2 = require("../helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};
//////////////////////////////////////////////////////////////////////////////////////////////////

},"inherits.js":function(require,exports){

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// node_modules/babel-runtime/helpers/inherits.js                                               //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
"use strict";

exports.__esModule = true;

var _setPrototypeOf = require("../core-js/object/set-prototype-of");

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = require("../core-js/object/create");

var _create2 = _interopRequireDefault(_create);

var _typeof2 = require("../helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};
//////////////////////////////////////////////////////////////////////////////////////////////////

},"extends.js":function(require,exports){

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// node_modules/babel-runtime/helpers/extends.js                                                //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
"use strict";

exports.__esModule = true;

var _assign = require("../core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};
//////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{"extensions":[".js",".json"]});
var exports = require("./node_modules/meteor/modules/server.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package.modules = exports, {
  meteorInstall: meteorInstall,
  Buffer: Buffer,
  process: process
});

})();
