;(function(){
'use strict'
const files={}
const require=fid=>{
const module={exports:{}}
if(!files[fid]){
modules[fid](module)
files[fid]={exports:module.exports}
}
return files[fid].exports
}
const modules={
fid100(module){
const readline=require('readline')
readline.emitKeypressEvents(process.stdin)
process.stdin.setRawMode(true)
process.stdin.on('keypress',(str,key)=>{
if(key.ctrl&&key.name==='c'){
process.exit()
}else{
console.log(`You pressed the "${str}" key`)
console.log()
console.log(key)
console.log()
}
});
console.log('Press any key...');
},
}
require('fid100')
}())