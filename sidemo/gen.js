var coords = {x:100,y:100}

function genCoords() {
	console.log(coords)

	coords.x = coords.x + getRandomInt(-3,3)
	coords.y = coords.y + getRandomInt(-3,3)

	setTimeout(genCoords,200)
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

genCoords()