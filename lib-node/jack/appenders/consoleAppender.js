(function() {
  var Appender, ConsoleAppender,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Appender = require("./appender");

  ConsoleAppender = (function(_super) {

    __extends(ConsoleAppender, _super);

    function ConsoleAppender(options) {
      var _ref;
      if (options == null) options = {};
      ConsoleAppender.__super__.constructor.call(this);
      this._buffer = [];
      this._delta = (_ref = options.flushFrequency) != null ? _ref : 1500;
      this._lastFlush = (+(new Date)) - (this._delta + 1);
    }

    ConsoleAppender.prototype.append = function(loggerName, level, args) {
      var now;
      this._buffer.push([loggerName, level, args]);
      now = +(new Date);
      if ((now - this._lastFlush) > this._delta) return this.flush();
    };

    ConsoleAppender.prototype.flush = function() {
      var bit, _results;
      this._lastFlush = +(new Date);
      _results = [];
      while (bit = this._buffer.shift()) {
        _results.push(console.log(this.format(bit[0], bit[1], bit[2])));
      }
      return _results;
    };

    return ConsoleAppender;

  })(Appender);

  module.exports = ConsoleAppender;

}).call(this);
