import { Observer } from "./Observer";
import Dep from "./Dep class";

function defineReactive (data,key,val){

    // 如果子属性也是对象，递归
    if(typeof val === 'object') {
        new Observer(val);
    }

    let dep = new Dep()

    Object.defineProperty(data,key,{
        enumerable:true,
        configurable:true,
        get:function(){
            dep.depend();
            return val
        },
        set:function(newVal) {
            if(val === newVal) {
                return
            }
            val = newVal
            dep.notify()
        }
    });
}

var aa = {aa:11};
defineReactive(aa,'aa',11);

aa['aa'] =2

console.log(aa['aa'])

