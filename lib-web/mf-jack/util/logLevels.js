// Generated by CoffeeScript 1.4.0
(function() {
  var LOG_LEVELS, bStringToInt;

  bStringToInt = function(v) {
    return parseInt(v, 2);
  };

  LOG_LEVELS = {
    NONE: bStringToInt("00000"),
    ERROR: bStringToInt("11000"),
    INFO: bStringToInt("11100"),
    DEBUG: bStringToInt("11110"),
    TRACE: bStringToInt("11111")
  };

  module.exports = LOG_LEVELS;

}).call(this);
