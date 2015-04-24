function processData(input) {
	var lines = input.split('\n')
	var meta = lines.shift().split(' ')
	var maxNodes = meta[0]
	var maxEdges = meta[1]
	lines = lines.splice(0,maxEdges)

	var pool = convertInputToPool(lines)
	var forest = []

	// console.log(meta,pool)

	var rel = getRelationshipCounts(pool)

	iteration0(forest,pool,rel)

	// console.log('forest',forest)
	// console.log('pool',pool)

	var it0Rel = getRelationshipCounts(forest)

	// console.log(it0Rel)
}

function iteration0(forest, pool, rel) {

	// populate forest

	for (var i in rel) {
		if (rel[i] === 1) {
			// get edge from pool for node and add to forest
			forest.push(extractEdgeFromPool(i,pool))
		}
	}

	// group forest
	var grouped = groupForest(forest)

	// are all groups even and all unique elements accounted for?
	
}

function groupForest(forest) {
	var cpForest = [].concat(forest)
	var trees = []

	for (var i in forest) {
		// console.log(forest[i])
		if (trees.length === 0) {
			trees[0] = []
			trees[0].push(forest[i])
		} else {
			var foundGroup = false
			inner: for (var t in trees) {
				// console.log(trees[t])
				for (var e in trees[t]) {
					if (edgeMatch(trees[t][e], forest[i])) {
						trees[t].push(forest[i])
						foundGroup = true
						break inner
					} else foundGroup = false
				}
			}
			// console.log(foundGroup)
			if (!foundGroup) {
				// console.log('new group')
				trees.push([forest[i]])
			}
		}
		// console.log(trees)
	}

	return trees
}

function edgeMatch(a,b) {
	// console.log('match',a,b)
	return a.some(function(na) {
		return b.some(function(nb) {
			return na === nb
		})
	})
}

function extractEdgeFromPool(node, pool) {
	// console.log('extract',node)
	// this only works assuming the node is unique, i.e. a leaf
	var foundIndex = -1
	for (var i in pool) {
		for (var j in pool[i]) {
			if (pool[i][j] === node) {
				foundIndex = i
			}
		}
	}
	if (foundIndex > -1) {
		return pool.splice(foundIndex,1)[0]
	}
	return
}

function convertInputToPool(lines) {
	return lines.map(function(line) {
		return line.split(' ')
	})
}

function getRelationshipCounts(pool) {
	var d = {}
	for (var i in pool) {
		for (var j in pool[i]) {
			(d[pool[i][j]]) ? d[pool[i][j]]++ : d[pool[i][j]] = 1
		}
	}
	return d
}

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
})