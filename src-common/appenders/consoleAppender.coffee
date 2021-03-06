Appender = require "./appender"

class ConsoleAppender extends Appender
  constructor: (options = {})->
    super()
    @_buffer = []
    @_delta = options.flushFrequency ? 300
    @_lastFlush = (+new Date) - (@_delta + 1) # Let the first append go out directly.
  append: (loggerName, level, args) ->
    @_buffer.push [loggerName, level, args]
    now = +new Date
    if (now - @_lastFlush) > @_delta
      @flush()

  flush: ->
    @_lastFlush = +new Date
    while bit = @_buffer.shift()
      console.log @format(bit[0], bit[1], bit[2])

module.exports = ConsoleAppender
