function processData(input) {
    var lines = input.split('\n')
    var v = lines.shift()
    var arrLength = parseInt(lines.shift(),10)
    var arr = lines.shift().split(' ')

    // console.log(v,arrLength,arr)

    process.stdout.write(arr.indexOf(v)+'\n')
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