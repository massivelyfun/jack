(function() {
  var Appender, ConsoleAppender,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Appender = require("jack/appenders/appender");

  ConsoleAppender = (function(_super) {

    __extends(ConsoleAppender, _super);

    function ConsoleAppender() {
      ConsoleAppender.__super__.constructor.apply(this, arguments);
    }

    ConsoleAppender.prototype.append = function(loggerName, level, args) {
      return console.log(this.format(loggerName, level, args));
    };

    return ConsoleAppender;

  })(Appender);

  module.exports = ConsoleAppender;

}).call(this);
