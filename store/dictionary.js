export const state = () => ({
    status: {
        0: 'Учу',
        1: 'Знаю',
        2: 'Знаю железно',
    },
    dictionary: [
        {
            rus: 'январь',
            eng: 'january',
            status: 0,
        },
        {
            rus: 'февраль',
            eng: 'february',
            status: 0,
        },
        {
            rus: 'март',
            eng: 'march',
            status: 2,
        },
        {
            rus: 'апрель',
            eng: 'april',
            status: 2,
        },
        {
            rus: 'май',
            eng: 'may',
            status: 2,
        },
        {
            rus: 'июнь',
            eng: 'june',
            status: 1,
        },
        {
            rus: 'июль',
            eng: 'jule',
            status: 1,
        },
        {
            rus: 'август',
            eng: 'august',
            status: 1,
        },
        {
            rus: 'сентябрь',
            eng: 'september',
            status: 0,
        },
        {
            rus: 'октябрь',
            eng: 'october',
            status: 0,
        },
        {
            rus: 'ноябрь',
            eng: 'november',
            status: 0,
        },
        {
            rus: 'декабрь',
            eng: 'december',
            status: 0,
        },
    ],
})

export const getters = {
    getAllWords: state => state.dictionary,
    getStatus: state => state.status,
    randomWordLearn: state => {
        return state.dictionary.filter(obj => obj.status === 0)
    },
}
