var buf = Buffer.alloc(10);

buf.write('hello');
console.log(buf);
console.log(buf.toString());

console.log('================== Traitement de Welcome');
var buf2 = Buffer.from('Welcome');
console.log(buf2)
console.log(buf2.toJSON());