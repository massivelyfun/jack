(function() {
  var DefaultFormatter, LOG_LEVELS, REVERSE_MAP, k, levelName, v;

  LOG_LEVELS = require("./../util/logLevels");

  REVERSE_MAP = {};

  for (k in LOG_LEVELS) {
    v = LOG_LEVELS[k];
    REVERSE_MAP["" + v] = k;
  }

  levelName = function(level) {
    return REVERSE_MAP["" + level];
  };

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
      return "[" + (levelName(level)) + "][" + n + "]: " + loggerName + "> " + (fmtArgs.join("; ").replace(/\n/, "\\n"));
    };

    return DefaultFormatter;

  })();

  module.exports = DefaultFormatter;

}).call(this);