export const state = () => ({
    status: {
        0: 'Учу',
        1: 'Знаю',
        2: 'Знаю железно',
    },
    dictionary: [
        {
            id: 0,
            rus: 'январь',
            eng: 'january',
            status: 0,
        },
        {
            id: 1,
            rus: 'февраль',
            eng: 'february',
            status: 0,
        },
        {
            id: 2,
            rus: 'март',
            eng: 'march',
            status: 2,
        },
        {
            id: 3,
            rus: 'апрель',
            eng: 'april',
            status: 2,
        },
        {
            id: 4,
            rus: 'май',
            eng: 'may',
            status: 2,
        },
        {
            id: 5,
            rus: 'июнь',
            eng: 'june',
            status: 1,
        },
        {
            id: 6,
            rus: 'июль',
            eng: 'jule',
            status: 1,
        },
        {
            id: 7,
            rus: 'август',
            eng: 'august',
            status: 1,
        },
        {
            id: 8,
            rus: 'сентябрь',
            eng: 'september',
            status: 0,
        },
        {
            id: 9,
            rus: 'октябрь',
            eng: 'october',
            status: 0,
        },
        {
            id: 10,
            rus: 'ноябрь',
            eng: 'november',
            status: 0,
        },
        {
            id: 11,
            rus: 'декабрь',
            eng: 'december',
            status: 0,
        },
    ],
})

export const getters = {
    getAllWords: state => state.dictionary,
    getStatus: state => state.status,
    getWordsLearn: state => status => state.dictionary.filter(obj => obj.status === status),
}

export const mutations = {
    updateWord({dictionary}, {rus, eng, id}) {
        dictionary.forEach(obj => {
            if (obj.id === id) {
                obj.rus = rus
                obj.eng = eng
            }
        })
    },
    deleteWord({dictionary}, id) {
        const i = dictionary.map(obj => obj.id).indexOf(id)
        dictionary.splice(i, 1)
        window.localStorage.setItem('vue-learnEnglish', JSON.stringify(dictionary))
    },
    changeStatus({dictionary, status}, id) {
        const keys = Object.keys(status)
        const statusLoop = oldSt => (keys.length === oldSt + 1 ? 0 : oldSt + 1)
        dictionary.forEach(obj => {
            if (obj.id === id) {
                obj.status = statusLoop(obj.status)
            }
        })
        window.localStorage.setItem('vue-learnEnglish', JSON.stringify(dictionary))
    },
    addToDictionary({dictionary}, word) {
        word.id = Date.now()
        dictionary.push(word)
        window.localStorage.setItem('vue-learnEnglish', JSON.stringify(dictionary))
    },
    addWordToKnow({dictionary}, id) {
        dictionary.every(obj => {
            if (obj.id === id) {
                obj.status = 1
                return false
            } else {
                return true
            }
        })
        window.localStorage.setItem('vue-learnEnglish', JSON.stringify(dictionary))
    },
    addWordToLearn({dictionary}, id) {
        dictionary.every(obj => {
            if (obj.id === id) {
                obj.status = 0
                return false
            } else {
                return true
            }
        })
        window.localStorage.setItem('vue-learnEnglish', JSON.stringify(dictionary))
    },
    addAllWords(store, arr) {
        this._vm.$set(store, 'dictionary', arr)
    },
}

export const actions = {
    updateWord({commit}, formData) {
        commit('updateWord', formData)
    },
    deleteWord({commit}, id) {
        commit('deleteWord', id)
    },
    changeStatus({commit}, id) {
        commit('changeStatus', id)
    },
    addToDictionary({commit}, word) {
        commit('addToDictionary', word)
    },
    addWordToKnow({commit}, id) {
        commit('addWordToKnow', id)
    },
    addWordToLearn({commit}, id) {
        commit('addWordToLearn', id)
    },
    addAllWords({commit}, arr) {
        commit('addAllWords', arr)
    },
}
