var level = require('level')
var sub = require('level-sublevel')
var db = sub(level(process.argv[2]))

var robots = db.sublevel('robots')
var dinos = db.sublevel('dinosaurs')

robots.put('slogan','beep boop')
dinos.put('slogan','rawr')