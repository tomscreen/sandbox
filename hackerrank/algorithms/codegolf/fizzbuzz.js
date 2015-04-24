process.stdin.on("data",function(){x=console.log
for(i=0;i<100;)x((++i%15==0)?'FizzBuzz':(i%3==0)?'Fizz':(i%5==0)?'Buzz':i)})