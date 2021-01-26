// вспомогательная функция
function putToCache(elem, cache) {
    if (cache.includes(elem)) {
        return
    }
    const i = Math.floor(Math.random() * (cache.length + 1))
    cache.splice(i, 0, elem)
}
// функция, возвращающая свеженький, девственный компаратор
function madness() {
    const cache = []
    return function (a, b) {
        putToCache(a, cache)
        putToCache(b, cache)
        return cache.indexOf(b) - cache.indexOf(a)
    }
}
// собственно функция перемешивания
function shuffle(arr) {
    const compare = madness()
    return arr.sort(compare)
}

export {shuffle}
