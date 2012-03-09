DefaultFormatter = require "../formatters/defaultFormatter"

class Appender
  constructor: ->
    @_formatter = new DefaultFormatter

  format: (loggerName, level, args) ->
    @_formatter.format(loggerName, level, args)

  append: (loggerName, level, args) ->
    throw new Error("Override me, yo.")

module.exports = Appender
