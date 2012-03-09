Logger = require "../index"

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
    "[#{Logger.levelName level}][#{n}]: #{loggerName}> #{fmtArgs.join("; ").replace(/\n/, "\\n")}"

module.exports = DefaultFormatter
