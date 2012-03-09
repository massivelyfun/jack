(function() {
  var Appender, DefaultFormatter;

  DefaultFormatter = require("jack/formatters/defaultFormatter");

  Appender = (function() {

    function Appender() {
      this._formatter = new DefaultFormatter;
    }

    Appender.prototype.format = function(loggerName, level, args) {
      return this._formatter.format(loggerName, level, args);
    };

    Appender.prototype.append = function(loggerName, level, args) {
      throw new Error("Override me, yo.");
    };

    return Appender;

  })();

  module.exports = Appender;

}).call(this);
