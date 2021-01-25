<template lang="pug">
el-dialog(title="Редактировать слово", :visible.sync="editDialog", width="30%", @open="openEditDialog")
    div(:key="word.id")
        el-form(@submit.native.prevent="onSubmitEdit", :model="word", :rules="rules", ref="formEdit")
            el-row(:gutter="10")
                el-col(:span="12")
                    el-form-item(label="Русское", prop="rus")
                        el-input(v-model="word.rus")
                el-col(:span="12")
                    el-form-item(label="Перевод", prop="eng")
                        el-input(v-model="word.eng")
            .dialog-btns
                el-button(native-type="submit", :disabled="submitDisabled") Сохранить
                el-button(type="button", @click="onClose") Отмена
</template>

<script>
export default {
    name: 'EditWord',
    props: {
        word: {
            type: Object,
            default() {
                return {
                    rus: '',
                    eng: '',
                    id: 0,
                }
            },
        },
        editDialog: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    data() {
        return {
            wordOld: {
                rus: '',
                eng: '',
            },
            rules: {
                rus: [{ required: true, message: 'Поле не может быть пустым', trigger: 'blur' }],
                eng: [{ required: true, message: 'Поле не может быть пустым', trigger: 'blur' }],
            },
            submitDisabled: false,
        }
    },
    methods: {
        openEditDialog() {
            this.wordOld.rus = this.word.rus
            this.wordOld.eng = this.word.eng
        },
        onSubmitEdit() {
            if (this.wordOld.rus === this.word.rus && this.wordOld.eng === this.word.eng) {
                return false
            }
            this.$refs.formEdit.validate(valid => {
                if (valid) {
                    this.submitDisabled = true
                    const formData = {
                        rus: this.word.rus.trim(),
                        eng: this.word.eng.trim(),
                        id: this.word.id,
                    }
                    this.$store.dispatch('dictionary/updateWord', formData)
                    this.$message({
                        type: 'success',
                        message: `Слово было успешно изменено на ${this.word.rus} ${this.word.eng}`,
                    })
                    setTimeout(() => {
                        this.onClose()
                        this.submitDisabled = false
                    }, 1000)
                }
            })
        },
        onClose() {
            this.$emit('closeEditDialog')
        },
    },
}
</script>

<style lang="stylus" scoped>
.dialog-btns
    display flex
    justify-content flex-end
</style>
