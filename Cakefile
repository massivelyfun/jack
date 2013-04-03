process.env["PATH"] = "node_modules/.bin:#{process.env["PATH"]}"

{exec} = require "child_process"
{SourceBuilder:Builder, TestBuilder:TestBuilder} = require "mf-tools"
baseDir = __dirname
builds =
  "lib-node": ["src-common"]
  "lib-web" : ["src-common"]

task "build", "Convert CoffeeScript sources into JS files", ->
  for build, dirs of builds
    new Builder(baseDir)
      .libraryName("mf-jack")
      .buildName(build)
      .outputDir(build)
      .inputDirs((dir for dir in dirs)...)
      .build()
