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
    wordsLearn: state => {
        return state.dictionary.filter(obj => obj.status === 0)
    },
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
    },
    changeStatus({dictionary, status}, id) {
        const keys = Object.keys(status)
        const statusLoop = oldSt => (keys.length === oldSt + 1 ? 0 : oldSt + 1)
        dictionary.forEach(obj => {
            if (obj.id === id) {
                obj.status = statusLoop(obj.status)
            }
        })
    },
    addToDictionary({dictionary}, word) {
        word.id = Date.now()
        dictionary.push(word)
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
}
