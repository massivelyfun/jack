LOG_LEVELS = require "./util/logLevels"

REVERSE_MAP = {}

for k,v of LOG_LEVELS
  REVERSE_MAP[""+v] = k

class LoggerUtil
  LEVEL: LOG_LEVELS
  levelName: (level) ->
    REVERSE_MAP[""+level]

  constructor: ->
    @_root = new Logger("ROOT")
    @_loggers = {}
  create: (name, parent) ->
    name ?= "UNKNOWN"
    logger = new Logger(name, parent ? @root())
    @_loggers[name] = logger
  root: ->
    @_root

class Logger
  constructor: (@_name, @_parent) ->
    @_level = LOG_LEVELS.INFO
    @_appenders = []

  addAppender: (appender) ->
    @_appenders.push appender
    this
  level: (level) ->
    @_level = level
    this

  error: (args...) ->
    @log LOG_LEVELS.ERROR, args
    this
  info: (args...) ->
    @log LOG_LEVELS.INFO, args
    this
  debug: (args...) ->
    @log LOG_LEVELS.DEBUG, args
    this
  trace: (args...) ->
    @log LOG_LEVELS.TRACE, args
    this

  isTraceEnabled: ->
    (@_level & LOG_LEVELS.TRACE) == LOG_LEVELS.TRACE or
      @_parent? && @_parent.isTraceEnabled()

  log: (level, args) ->
    @_append @_name, level, args

  _append: (origin, level, args) ->
    if @_level != LOG_LEVELS.NONE and (level & @_level) == level
      for appender in @_appenders
        appender.append origin, level, args

    if @_parent?
      @_parent._append origin, level, args


module.exports = new LoggerUtil
