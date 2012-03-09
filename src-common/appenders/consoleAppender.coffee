Appender = require "./appenders/appender"

class ConsoleAppender extends Appender
  append: (loggerName, level, args) ->
    console.log @format(loggerName, level, args)

module.exports = ConsoleAppender
