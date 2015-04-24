z=""
M=Math.pow
L=console.log
process.stdin.on("data",function(i){z+=i})
process.stdin.on("end",function(){z=z.split('\n')
z=z.splice(0,z.shift())
for(l in z) {
a=parseFloat(z[l])
L(r(1,a,a,1,-1,1))
L(r(1,a,1,1,-1,0))}})
function r(i,x,s,f,t,o){y=((i*2)+o)
f=(y*(y-1)*f)
s=s+(M(t,i)*(M(x,y)/f))
return (i<4)?r(++i,x,s,f,t,o):s.toFixed(3)}