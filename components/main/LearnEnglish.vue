<template lang="pug">
el-row(type="flex", justify="center")
    el-col.header-container(:lg="20")
        .wrap-inputs.mb-1
            el-input(v-model="inputRus")
            .sepor
            el-input(v-model="inputEng", @keyup.enter.native="checkEnter")
        div(type="flex")
            el-button(type="primary", plain, @click="verifyWord") Проверить
            el-button(type="warning", plain, @click="showHelp") Подсказать
        .status-field
            transition(mode="out-in", name="fade")
                p.h-success(v-if="error === 'SUCCESS'", key="success") Все верно!!!
                p.h-error(v-else-if="error === 'ERROR'", key="error") Ответ не верен (
                p.h-already(v-else-if="error === 'IS-ALREADY'", key="is-already") Такое слово уже есть в словаре
                p.h-help(v-else-if="error === 'HELP'", key="help") {{ wordEng }}
        app-table-words
</template>

<script>
import AppTableWords from './TableWords'
export default {
    name: 'LearnEnglish',
    components: {
        AppTableWords,
    },
    data() {
        return {
            words: [],
            inputRus: '',
            inputEng: '',
            status: 0,
            wordEng: '',
            error: '',
        }
    },
    created() {
        this.words = this.$store.getters['dictionary/randomWordLearn']
        this.getRandomWord()
    },
    methods: {
        getRandomWord() {
            const word = this.words[Math.floor(Math.random() * this.words.length)]
            this.inputRus = word.rus
            this.wordEng = word.eng
        },
        verifyWord() {
            if (this.inputEng.trim() === this.wordEng) {
                this.error = 'SUCCESS'
                this.inputEng = ''
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
