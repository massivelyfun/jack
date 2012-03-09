(function() {
  var DefaultFormatter, Logger;

  Logger = require("jack");

  DefaultFormatter = (function() {

    function DefaultFormatter() {}

    DefaultFormatter.prototype.format = function(loggerName, level, args) {
      var fmtArgs, i, n, ret, _i, _len;
      fmtArgs = [];
      for (_i = 0, _len = args.length; _i < _len; _i++) {
        i = args[_i];
        ret = i;
        if (typeof i === "object") {
          try {
            ret = JSON.stringify(i);
          } catch (e) {
            ret = i;
          }
        }
        fmtArgs.push("" + ret);
      }
      n = new Date;
      return "[" + (Logger.levelName(level)) + "][" + n + "]: " + loggerName + "> " + (fmtArgs.join("; ").replace(/\n/, "\\n"));
    };

    return DefaultFormatter;

  })();

  module.exports = DefaultFormatter;

}).call(this);
