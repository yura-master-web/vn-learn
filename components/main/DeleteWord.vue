<template lang="pug">
el-popover(placement="top", width="200", v-model="visible")
    p Вы уверены что хотите удалить данное слово?
    div(style="text-align: right; margin: 0")
        el-button(size="mini", type="text", @click="visible = false") Отмена
        el-button(type="primary", size="mini", @click="onDelete", :disabled="disabled") Удалить
    el-button(slot="reference", size="mini") X
</template>

<script>
export default {
    name: 'DeleteWord',
    props: {
        word: {
            type: Object,
            require: true,

            default() {
                return {
                    rus: '',
                    eng: '',
                    id: null,
                }
            },
        },
    },

    data() {
        return {
            visible: false,
            disabled: false,
        }
    },
    methods: {
        onDelete() {
            if (this.word.id !== null) {
                this.disabled = true
                this.$store.dispatch('dictionary/deleteWord', this.word.id)
                const h = this.$createElement
                this.$message({
                    type: 'success',
                    message: h('p', null, [
                        h('span', null, 'Слово '),
                        h('i', { style: 'color: teal' }, `${this.word.rus} ${this.word.eng}`),
                        h('span', null, ' было успешно удалено'),
                    ]),
                })
                setTimeout(() => {
                    this.visible = false
                    this.submitDisabled = false
                    this.disabled = false
                }, 300)
            }
        },
    },
}
</script>

<style lang="css" scoped></style>
