const arrayProto = Array.prototype;
console.log(arrayProto)
const arrayMethods = Object.create(arrayProto)
console.log(arrayMethods)

;['push','pop','shift','unshift','splice','sort','reverse'].forEach(function(method) {
    const original = arrayProto[method];
    console.log(original)
    Object.defineProperty(arrayMethods,method,{
        enumerable:false,
        writable:true,
        configurable:true,
        value:function mutator(...args){
            return original.apply(this,args);
        }
    })
})

console.log(arrayMethods)