export class Observer {
    constructor (value) {
        this.value = value

        // 如果不是数组
        if(!Array.isArray(value)) {
            this.walk()
        }
    }

    walk (obj) {
        const keys = Object.keys(obj);
        for(let i=0;i<keys.length;i++) {
            defineReactive(obj, keys[i], obj[keys[i]])
        }
    }
}