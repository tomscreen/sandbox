function processData(input) {
     var lines = input.split('\n')
     var meta = lines.shift().split(' ')
     var maxNodes = parseInt(meta[0])
     var maxEdges = parseInt(meta[1])
     lines = lines.splice(0,maxEdges)

     // console.log(lines)

     // convert input lines to vectors
     var vectorList = lines.map(function(l) {
     	return l.split(' ')
     })
     // console.log(vectorList)

     // console.log(vectorEqual(vectorList[0], vectorList[4]))

     // console.log(groupVectors(vectorList))

     // for each vector in the list
     // can i remove it such that it does not remove a unique node
     // and the remaining nodes form groups with even quantities of nodes

     // console.log(uniqueNodeCount(vectorList))

     // identify which vectors can be removed without reducing the number of nodes

     var removedVectors = []
     var uniqueVectors = []
     for (i=0;i<vectorList.length;i++) {
     	var x = []
     	x = x.concat(vectorList)
     	// console.log(i,x.length,vectorList.length,y)
     	var y = x.splice(i,1)[0]
     	// console.log(x,maxNodes)
     	// console.log(uniqueNodeCount(x))
     	if (uniqueNodeCount(x) === maxNodes) {
     		// console.log(y)
     		// no reduction, ok to mark for removal
     		removedVectors.push(y)
     	} else {
     		// reduction, keep in unique list
     		uniqueVectors.push(y)
     	}
     }

     console.log(uniqueVectors)

     // console.log(removedVectors)

     console.log(groupVectors(uniqueVectors))





 //     // find unique nodes and relationship count for each
 //     var nodes = lines.reduce(function(p,c) {
 //     	var nodes = c.split(' ')
 //     	for (var i in nodes) {
 //     		(p[nodes[i]]) ? p[nodes[i]]++ : p[nodes[i]] = 1
 //     	}
 //     	return p
 //     },{})
 //     // now have a list of all nodes and rel count
 //     console.log(nodes)

 //     // nodes = nodes.filter(function(node) {
 //     // 	console.log(node)
 //     // })

	// var leafNodes = []
	// for (var i in nodes) {
	// 	if (nodes[i] === 1) leafNodes.push(i)
	// }

	// console.log(leafNodes)

	// first pass of grouping based on leaf nodes

	// var groups = []

	// for (var i in leafNodes) {
	// 	var group = []
	// 	for (var j in lines) {
	// 		var nodes = lines[j].split(' ').sort(function(a,b) {return a-b})
			
	// 		if (leafNodes[i] === nodes[0] || leafNodes[i] === nodes[1]) {
	// 			group.push(nodes)
	// 		}
	// 	}
	// 	groups.push(group)
	// }

	// console.log(groups)

	// // recombine groups based on common elements
	// groups.reduce(function(p,c,ix,ar) {
	// 	console.log(c)

	// 	for (var i=ix+1; i<ar.length; i++) {
	// 		console.log('compare',ar[i])
	// 	}

	// },[])
}

function uniqueNodeCount(vectorList) {
	return vectorList.reduce(function(p,c) {
		// console.log(c)
		for (var v in c) {
			// console.log(v,c[v])
			if (p.indexOf(c[v]) === -1) p.push(c[v])
		}
		return p
	},[]).length
}

function vectorListContains(arr, v) {
	// does any of the vectors in the given list provide a match
	// return true/false
	return arr.some(function(a) {
		return vectorEqual(a,v)
	})
}

function vectorEqual(a, b) {
	// equal if any of the nodes in each of the vectors match
	// can this be replaced by an 'Array.equal' function?
	return a.some(function(na) {
		return b.some(function(nb) {
			// console.log(na,nb)
			return na === nb
		})
	})
}

function groupVectors(vectorList) {
	// group vectors based on common nodes
     return vectorList.reduce(function(p,c,ix) {
     	// console.log('Iteration',ix)
     	// console.log(p)
     	if (p.length === 0) {
     		p.push([c])
     		// console.log('initial',c)
     	} else
     		// does c match any of the vectors in any of the groups?
     		// what happens if a vector matches two groups?
     		// should groups then be combined? probably...
     		{
     			// console.log('comparing',c)
     			var groupMatch = []
     			for (var g in p) {
     				if (vectorListContains(p[g],c)) {
     					p[g].push(c)
     					groupMatch.push(g)
     				}
     			}
     			if (groupMatch.length === 0) {
     				p[p.length] = [c]
     			}
     		}

     	return p
     },[])
}

function group(initial, relationships) {

	for (var i in initial) {
		// find relationships
		for (var i in relationships) {

		}
	}

	// var trees = {}
	// return function groupLevel() {
	// 	relationships.reduce(function(p,c) {

	// 	},)
	// 	groupOne(trees)
	// }()
}



process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});
