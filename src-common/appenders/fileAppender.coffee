fs = require 'fs'

Appender = require "./appender"

# # FileAppender
#
# The FileAppender assumes Node.js
class FileAppender extends Appender
  constructor: (options = {})->
    super()
    if file = options.fileName
      @_logFile = fs.createWriteStream(file, flags: 'a')
    else
      throw new Error "No output file defined for FileAppender"

    @_buffer = []
    @_delta = options.flushFrequency ? 300
    @_lastFlush = (+new Date) - (@_delta + 1) # Let the first append go out directly.

    process.on 'exit', =>
      @flush()
      @_logFile.end()

    process.on 'SIGHUP', =>
      @flush()
      @_logFile.end()
      @_logFile = fs.createWriteStream(file, flags: 'a')

  append: (loggerName, level, args) ->
    @_buffer.push [loggerName, level, args]
    now = +new Date
    if (now - @_lastFlush) > @_delta
      # bind locally rather than in the method def.
      process.nextTick => @flush()

  flush: ->
    @_lastFlush = +new Date
    while bit = @_buffer.shift()
      @_logFile.write "#{@format(bit[0], bit[1], bit[2])}\n"

module.exports = FileAppender
