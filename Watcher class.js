export default class Wather {
    constructor (vm, expOrFn, cb) {
        this.vm  = vm
        this.getter = parsePath(expOrFn)
        this.cb = cb
        this.value = this.get()
    } 

    get() {
        window.target = this
        let value = this.getter.call(this.vm, this.vm)
        window.target = undefined
        return value
    }

    update() {
        const oldValue = this.value
        this.value = this.get()
        this.cb.call(this.vm, this.value,oldValue)
    }
}

/**
 * 解析简单路径
 */
const bailRE = /[^\w.$]/   //以非标识符 + .  结尾的，是错误的
function parsePath(path) {
    if(bailRE.test(path)) {
        return
    }

    const segments = path.splite('.')
    return function(obj) {
        for(let i=0;i<segments.length;i++) {
            if(!obj) return
            obj = obj(segments[i])
        }
        return obj
    }
}

