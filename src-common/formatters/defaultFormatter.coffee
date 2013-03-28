LOG_LEVELS = require "./../util/logLevels"

REVERSE_MAP = {}

for k,v of LOG_LEVELS
  REVERSE_MAP[""+v] = k

levelName = (level) ->
  REVERSE_MAP[""+level]

class DefaultFormatter
  format: (loggerName, level, args) ->
    fmtArgs = []
    for i in args
      ret = i
      if typeof i == "object"
        try
          ret = JSON.stringify(i)
        catch e
          ret = i
      fmtArgs.push "" + ret

    n = new Date
    "[#{levelName level}][#{n}]: #{loggerName}> #{fmtArgs.join("; ").replace(/\n/g, "\\n")}"

module.exports = DefaultFormatter
