<template lang="pug">
el-row(type="flex", justify="center")
    el-col.header-container(:lg="20")
        .wrap-inputs.mb-1
            el-input(v-model="word.rus", :class="{ empty: emptyRus }")
            .sepor
            el-input(v-model="word.eng", :class="{ empty: emptyEng }", @keyup.enter.native="checkEnter")
        div
            el-button(type="primary", plain, @click="verifyWord") Проверить
            el-button(type="warning", plain, @click="showHelp") Подсказать
        .status-field
            transition(mode="out-in", name="fade")
                p.h-success(v-if="error === 'SUCCESS'", key="success") Все верно!!!
                p.h-error(v-else-if="error === 'ERROR'", key="error") Ответ не верен (
                p.h-already(v-else-if="error === 'IS-ALREADY'", key="is-already") Такое слово уже есть в словаре
                p.h-help(v-else-if="error === 'HELP'", key="help") {{ wordEng }}
                p.h-error(v-else-if="error === 'EMPTY'", key="empty") Поля должны быть заполнены
                p.h-success(v-else-if="error === 'ADD-TO-LIB'", key="addToLib") Слово успешно добавлено
        .mb-1
            el-button(plain, @click="addToDictionary") Добавить слово в словарь
            el-button(plain, @click="addWordToKnow") Я уже знаю слово
        app-table-words(@chage-status="getRandomWord", ref="tableWords")
</template>

<script>
import { mapGetters } from 'vuex'
import AppTableWords from './TableWords'
export default {
    name: 'LearnEnglish',
    components: {
        AppTableWords,
    },
    data() {
        return {
            word: {},
            status: 0,
            wordEng: '',
            error: '',
            emptyRus: false,
            emptyEng: false,
        }
    },
    computed: {
        ...mapGetters('dictionary', {
            words: 'getAllWords',
            wordsLearning: 'wordsLearn',
        }),
    },
    created() {
        this.getRandomWord()
        this.$nuxt.$on('get-random-word', this.getRandomWord)
    },
    methods: {
        getRandomWord() {
            if (this.wordsLearning.length === 0) {
                this.word.rus = ''
                this.wordEng = 'Empty word rus'
            } else {
                this.word = { ...this.wordsLearning[Math.floor(Math.random() * this.wordsLearning.length)] }
                this.wordEng = this.word.eng
                this.word.eng = ''
            }
        },
        verifyWord() {
            if (this.word.eng.trim() === this.wordEng) {
                this.error = 'SUCCESS'
                this.word.eng = ''
                this.getRandomWord()
            } else {
                this.error = 'ERROR'
            }
        },
        checkEnter() {
            this.verifyWord()
        },
        showHelp() {
            const time = this.error !== '' ? 800 : 500
            this.error = 'HELP'
            setTimeout(() => {
                this.error = ''
            }, time)
        },
        addToDictionary() {
            if (this.word.rus === '' || this.word.eng === '') {
                this.error = 'EMPTY'
                this.emptyRus = this.word.rus === '' ? !0 : !1
                this.emptyEng = this.word.eng === '' ? !0 : !1
                return false
            } else {
                this.error = ''
                this.emptyRus = ''
                this.emptyEng = ''
            }
            const rus = this.word.rus.trim()
            const eng = this.word.eng.trim()
            if (this.words.every(obj => (obj.rus === rus || obj.eng === eng ? !1 : !0))) {
                this.$store.dispatch('dictionary/addToDictionary', {
                    rus,
                    eng,
                    status: 0,
                })
                this.error = 'ADD-TO-LIB'
            } else {
                this.error = 'IS-ALREADY'
            }
        },
        addWordToKnow() {
            this.$store.dispatch('dictionary/addWordToKnow', this.word.id)
            this.$refs.tableWords.$refs.tableDictionary.sort('status', 'ascending')
            this.getRandomWord()
        },
    },
}
// @keyup.enter.native="$event.target.blur"
//             @blur="handleInputConfirm">
</script>

<style lang="stylus" scoped>
.wrap-inputs
    padding-top 2rem
    display flex
    justify-content space-between
.el-input
    max-width 50%
    font-size 1.5rem
.sepor
    width 10px
.status-field
    display flex
    height 5rem
    font-size 1.5rem
    align-items center
    justify-content center
.fade-enter,
.fade-leave-to
    opacity 0
.fade-enter-active,
.fade-leave-active
    transition opacity .27s
.h-success
    color green
.h-error
    color red
.h-already
    color gray
.h-help
    color orange
</style>
<style lang="stylus">
.empty input
    border-color red
    transition border-color .27s
</style>
