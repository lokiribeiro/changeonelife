var require = meteorInstall({"imports":{"startup":{"server":{"childrens.js":["meteor/meteor","/imports/api/childrens",function(require,exports,module){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// imports/startup/server/childrens.js                               //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
var Meteor = void 0;                                                 // 1
module.import("meteor/meteor", {                                     // 1
    "Meteor": function (v) {                                         // 1
        Meteor = v;                                                  // 1
    }                                                                // 1
}, 0);                                                               // 1
var Childrens = void 0;                                              // 1
module.import("/imports/api/childrens", {                            // 1
    "Childrens": function (v) {                                      // 1
        Childrens = v;                                               // 1
    }                                                                // 1
}, 1);                                                               // 1
Meteor.publish('childrens', function () {                            // 4
    var selector = {};                                               // 5
    var options = {                                                  // 6
        fields: {                                                    // 7
            _id: 1,                                                  // 7
            number: 1,                                               // 7
            name: 1,                                                 // 7
            location: 1,                                             // 7
            image: 1,                                                // 7
            url: 1,                                                  // 7
            pulse: 1                                                 // 7
        },                                                           // 7
        sort: {                                                      // 8
            createdAt: -1                                            // 8
        }                                                            // 8
    };                                                               // 6
    return Childrens.find(selector, options);                        // 11
});                                                                  // 12
///////////////////////////////////////////////////////////////////////

}],"fixtures.js":["meteor/meteor","meteor/alanning:roles","meteor/accounts-base",function(require,exports,module){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// imports/startup/server/fixtures.js                                //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
var Meteor = void 0;                                                 // 1
module.import("meteor/meteor", {                                     // 1
    "Meteor": function (v) {                                         // 1
        Meteor = v;                                                  // 1
    }                                                                // 1
}, 0);                                                               // 1
var Roles = void 0;                                                  // 1
module.import("meteor/alanning:roles", {                             // 1
    "Roles": function (v) {                                          // 1
        Roles = v;                                                   // 1
    }                                                                // 1
}, 1);                                                               // 1
var Accounts = void 0;                                               // 1
module.import("meteor/accounts-base", {                              // 1
    "Accounts": function (v) {                                       // 1
        Accounts = v;                                                // 1
    }                                                                // 1
}, 2);                                                               // 1
var users = [{                                                       // 5
    email: 'hello@mieta.io',                                         // 7
    password: 'CK4pNHNcGz4Z4yitBX4Q2Q==',                            // 8
    roles: ['admin']                                                 // 9
}, {                                                                 // 6
    email: 'vladimir.Bulanov@ddb.ru',                                // 12
    password: 'oVBhdqgzYHgWyYtrJu3xrw==',                            // 13
    roles: ['admin']                                                 // 14
}, {                                                                 // 11
    email: 'irina.zhabura@ddb.ru',                                   // 17
    password: 'wMSrTmnUWrNhKXbqLBmBmQ==',                            // 18
    roles: ['admin']                                                 // 19
}];                                                                  // 16
users.forEach(function (_ref) {                                      // 23
    var email = _ref.email,                                          // 23
        password = _ref.password,                                    // 23
        profile = _ref.profile,                                      // 23
        roles = _ref.roles;                                          // 23
    var userExists = Meteor.users.findOne({                          // 24
        'emails.address': email                                      // 24
    });                                                              // 24
                                                                     //
    if (!userExists) {                                               // 26
        var userId = Accounts.createUser({                           // 27
            email: email,                                            // 27
            password: password,                                      // 27
            profile: profile                                         // 27
        });                                                          // 27
        Roles.addUsersToRoles(userId, roles);                        // 28
    }                                                                // 29
});                                                                  // 30
///////////////////////////////////////////////////////////////////////

}],"index.js":["./childrens","./videos","./fixtures","./methods","./slingshot",function(require,exports,module){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// imports/startup/server/index.js                                   //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
module.import("./childrens");                                        // 1
module.import("./videos");                                           // 1
module.import("./fixtures");                                         // 1
module.import("./methods");                                          // 1
module.import("./slingshot");                                        // 1
///////////////////////////////////////////////////////////////////////

}],"methods.js":["meteor/meteor","/imports/api/childrens","/imports/api/files","/imports/api/videos",function(require,exports,module){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// imports/startup/server/methods.js                                 //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
var Meteor = void 0;                                                 // 1
module.import("meteor/meteor", {                                     // 1
    "Meteor": function (v) {                                         // 1
        Meteor = v;                                                  // 1
    }                                                                // 1
}, 0);                                                               // 1
var Childrens = void 0;                                              // 1
module.import("/imports/api/childrens", {                            // 1
    "Childrens": function (v) {                                      // 1
        Childrens = v;                                               // 1
    }                                                                // 1
}, 1);                                                               // 1
var Files = void 0;                                                  // 1
module.import("/imports/api/files", {                                // 1
    "Files": function (v) {                                          // 1
        Files = v;                                                   // 1
    }                                                                // 1
}, 2);                                                               // 1
var Videos = void 0;                                                 // 1
module.import("/imports/api/videos", {                               // 1
    "Videos": function (v) {                                         // 1
        Videos = v;                                                  // 1
    }                                                                // 1
}, 3);                                                               // 1
Meteor.methods({                                                     // 6
    'children.create': function (children) {                         // 7
        try {                                                        // 8
            var id = Childrens.insert(children);                     // 9
            return id;                                               // 10
        } catch (exception) {                                        // 11
            return exception;                                        // 14
        }                                                            // 15
    },                                                               // 16
    'children.delete': function (userId) {                           // 18
        Childrens.remove(userId);                                    // 19
    },                                                               // 20
    'videos.remove': function () {                                   // 22
        Videos.remove({});                                           // 23
    },                                                               // 24
    'videos.add': function (video) {                                 // 26
        try {                                                        // 27
            var id = Videos.insert(video);                           // 28
            return id;                                               // 29
        } catch (exception) {                                        // 30
            return exception;                                        // 33
        }                                                            // 34
    },                                                               // 35
    'file.store': function (url) {                                   // 37
        Files.insert(url);                                           // 38
    }                                                                // 39
});                                                                  // 6
///////////////////////////////////////////////////////////////////////

}],"slingshot.js":function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// imports/startup/server/slingshot.js                               //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
Slingshot.fileRestrictions("uploadToAmazonS3", {                     // 1
    allowedFileTypes: ["image/png", "image/jpeg", "video/mp4"],      // 2
    maxSize: 10 * 1024 * 1024                                        // 3
});                                                                  // 1
Slingshot.createDirective("uploadToAmazonS3", Slingshot.S3Storage, {
    bucket: "changeonelife.ru",                                      // 7
    acl: "public-read",                                              // 8
    authorize: function () {                                         // 9
        return true;                                                 // 10
    },                                                               // 11
    key: function (file, metacontext) {                              // 12
        // if (metacontext) file.name = metacontext.fileName         // 13
        return Date.now() + file.name;                               // 14
    }                                                                // 15
});                                                                  // 6
///////////////////////////////////////////////////////////////////////

},"videos.js":["meteor/meteor","/imports/api/videos",function(require,exports,module){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// imports/startup/server/videos.js                                  //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
var Meteor = void 0;                                                 // 1
module.import("meteor/meteor", {                                     // 1
    "Meteor": function (v) {                                         // 1
        Meteor = v;                                                  // 1
    }                                                                // 1
}, 0);                                                               // 1
var Videos = void 0;                                                 // 1
module.import("/imports/api/videos", {                               // 1
    "Videos": function (v) {                                         // 1
        Videos = v;                                                  // 1
    }                                                                // 1
}, 1);                                                               // 1
Meteor.publish('videos', function () {                               // 4
    var selector = {};                                               // 5
    var options = {};                                                // 6
    return Videos.find(selector, options);                           // 8
});                                                                  // 9
///////////////////////////////////////////////////////////////////////

}]}},"api":{"childrens.js":["meteor/meteor","meteor/mongo",function(require,exports,module){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// imports/api/childrens.js                                          //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
module.export({                                                      // 1
  Childrens: function () {                                           // 1
    return Childrens;                                                // 1
  }                                                                  // 1
});                                                                  // 1
var Meteor = void 0;                                                 // 1
module.import("meteor/meteor", {                                     // 1
  "Meteor": function (v) {                                           // 1
    Meteor = v;                                                      // 1
  }                                                                  // 1
}, 0);                                                               // 1
var Mongo = void 0;                                                  // 1
module.import("meteor/mongo", {                                      // 1
  "Mongo": function (v) {                                            // 1
    Mongo = v;                                                       // 1
  }                                                                  // 1
}, 1);                                                               // 1
var Childrens = new Mongo.Collection('childrens');                   // 4
///////////////////////////////////////////////////////////////////////

}],"files.js":["meteor/meteor","meteor/mongo",function(require,exports,module){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// imports/api/files.js                                              //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
module.export({                                                      // 1
  Files: function () {                                               // 1
    return Files;                                                    // 1
  }                                                                  // 1
});                                                                  // 1
var Meteor = void 0;                                                 // 1
module.import("meteor/meteor", {                                     // 1
  "Meteor": function (v) {                                           // 1
    Meteor = v;                                                      // 1
  }                                                                  // 1
}, 0);                                                               // 1
var Mongo = void 0;                                                  // 1
module.import("meteor/mongo", {                                      // 1
  "Mongo": function (v) {                                            // 1
    Mongo = v;                                                       // 1
  }                                                                  // 1
}, 1);                                                               // 1
var Files = new Mongo.Collection('files');                           // 4
///////////////////////////////////////////////////////////////////////

}],"videos.js":["meteor/meteor","meteor/mongo",function(require,exports,module){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// imports/api/videos.js                                             //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
module.export({                                                      // 1
  Videos: function () {                                              // 1
    return Videos;                                                   // 1
  }                                                                  // 1
});                                                                  // 1
var Meteor = void 0;                                                 // 1
module.import("meteor/meteor", {                                     // 1
  "Meteor": function (v) {                                           // 1
    Meteor = v;                                                      // 1
  }                                                                  // 1
}, 0);                                                               // 1
var Mongo = void 0;                                                  // 1
module.import("meteor/mongo", {                                      // 1
  "Mongo": function (v) {                                            // 1
    Mongo = v;                                                       // 1
  }                                                                  // 1
}, 1);                                                               // 1
var Videos = new Mongo.Collection('videos');                         // 4
///////////////////////////////////////////////////////////////////////

}]}},"server":{"main.js":["/imports/startup/server",function(require,exports,module){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// server/main.js                                                    //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
module.import("/imports/startup/server");                            // 1
///////////////////////////////////////////////////////////////////////

}]}},{"extensions":[".js",".json"]});
require("./server/main.js");
//# sourceMappingURL=app.js.map
