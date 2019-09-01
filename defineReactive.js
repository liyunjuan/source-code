function defineReactive (data,key,val){
    Object.defineProperty(data,key,{
        enumerable:true,
        configurable:true,
        get:function(){
            console.log('获取值')
            return val
        },
        set:function(newVal) {
            console.log('设置新值')
            if(val === newVal) {
                return
            }
            val = newVal
        }
    });
}

var aa = {aa:11};
defineReactive(aa,'aa',11);

aa['aa'] =2

console.log(aa['aa'])

