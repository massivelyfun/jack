(function() {
  var LOG_LEVELS, Logger, LoggerUtil, REVERSE_MAP, k, v;
  var __slice = Array.prototype.slice;

  LOG_LEVELS = require("./util/logLevels");

  REVERSE_MAP = {};

  for (k in LOG_LEVELS) {
    v = LOG_LEVELS[k];
    REVERSE_MAP["" + v] = k;
  }

  LoggerUtil = (function() {

    LoggerUtil.prototype.LEVEL = LOG_LEVELS;

    LoggerUtil.prototype.appenders = {
      ConsoleAppender: require("./appenders/consoleAppender")
    };

    LoggerUtil.prototype.formatters = {
      DefaultFormatter: require("./formatters/defaultFormatter")
    };

    LoggerUtil.prototype.levelName = function(level) {
      return REVERSE_MAP["" + level];
    };

    function LoggerUtil() {
      this._root = new Logger("ROOT");
      this._loggers = {};
    }

    LoggerUtil.prototype.create = function(name, parent) {
      var logger;
      if (name == null) name = "UNKNOWN";
      logger = new Logger(name, parent != null ? parent : this.root());
      return this._loggers[name] = logger;
    };

    LoggerUtil.prototype.root = function() {
      return this._root;
    };

    return LoggerUtil;

  })();

  Logger = (function() {

    function Logger(_name, _parent) {
      this._name = _name;
      this._parent = _parent;
      this._level = LOG_LEVELS.INFO;
      this._appenders = [];
    }

    Logger.prototype.addAppender = function(appender) {
      this._appenders.push(appender);
      return this;
    };

    Logger.prototype.level = function(level) {
      this._level = level;
      return this;
    };

    Logger.prototype.error = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      this.log(LOG_LEVELS.ERROR, args);
      return this;
    };

    Logger.prototype.info = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      this.log(LOG_LEVELS.INFO, args);
      return this;
    };

    Logger.prototype.debug = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      this.log(LOG_LEVELS.DEBUG, args);
      return this;
    };

    Logger.prototype.trace = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      this.log(LOG_LEVELS.TRACE, args);
      return this;
    };

    Logger.prototype.isTraceEnabled = function() {
      return (this._level & LOG_LEVELS.TRACE) === LOG_LEVELS.TRACE || (this._parent != null) && this._parent.isTraceEnabled();
    };

    Logger.prototype.log = function(level, args) {
      return this._append(this._name, level, args);
    };

    Logger.prototype._append = function(origin, level, args) {
      var appender, _i, _len, _ref;
      if (this._level !== LOG_LEVELS.NONE && (level & this._level) === level) {
        _ref = this._appenders;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          appender = _ref[_i];
          appender.append(origin, level, args);
        }
      }
      if (this._parent != null) return this._parent._append(origin, level, args);
    };

    return Logger;

  })();

  module.exports = new LoggerUtil;

}).call(this);
