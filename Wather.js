class Watcher {
    constructor (vm, expOrFn, cb) {
        this.vm = vm;
        // 执行this.getter()，读取data.a.b.c的内容
        this.getter = parsePath(expOrFn);
        this.cb = cb
        this.vaue = this.getter()
    }

    get() {
        window.target = this
        let value = this.getter.call(this.vm,this.vm)
        window.target = undefined
        return value
    }

    update () {
        const oldValue = this.value
        this.value = this.get()
        this.cb.call(this.vm,this.value,oldValue)
    }
}

// 解析简单路径
const bailRE = /[^\w.$]/


function parsePath(path) {
    if(bailRE.test(path)){
        return
    }

    const segments = path.split('.')
    return function(obj) {
        for(let i=0;i<segments.length; i++){
            if(!obj) return
            obj = obj[segments[i]]
        }
        return obj
    }
}