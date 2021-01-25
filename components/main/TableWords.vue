<template lang="pug">
div
    el-table(:data="words", style="width: 100%", :default-sort="{ prop: 'status', order: 'ascending' }")
        el-table-column(type="index", label="N")
        el-table-column(label="Русское", sortable, :sort-method="sortRusWords")
            template(slot-scope="{row: {rus}}") {{ rus }}
        el-table-column(label="Перевод", sortable, :sort-method="sortEngWords")
            template(slot-scope="{row: {eng}}") {{ eng }}
        el-table-column(label="Статусы", width="150", sortable, :sort-method="sortStatus", prop="status")
            template(slot-scope="{row: {status, id}}")
                el-button(size="mini", @click="editWord(rus, eng, id)") {{ allStatus[status] }}
        el-table-column
            template(slot-scope="{row: word}")
                el-button(size="mini", @click="editWord(word)") Редакт
        el-table-column(width="90")
            template(slot-scope="{row: word}")
                app-delete-word(:word="word")

    //- dialogs
    app-edit-word(:word="word", :editDialog="editDialog", @closeEditDialog="editDialog = false")
</template>

<script>
import { mapGetters } from 'vuex'
import AppEditWord from './EditWord'
import AppDeleteWord from './DeleteWord'
export default {
    name: 'TableWords',
    components: {
        AppEditWord,
        AppDeleteWord,
    },
    data() {
        return {
            editDialog: false,
            word: {},
        }
    },
    computed: {
        ...mapGetters('dictionary', {
            words: 'getAllWords',
            allStatus: 'getStatus',
        }),
    },
    methods: {
        editWord(word) {
            this.word = { ...word }
            this.editDialog = true
        },
        sortStatus(a, b) {
            return a.status - b.status
        },
        sortRusWords(a, b) {
            if (a.rus < b.rus) {
                return -1
            }
            if (a.rus > b.rus) {
                return 1
            }
            return 0
        },
        sortEngWords(a, b) {
            if (a.eng < b.eng) {
                return -1
            }
            if (a.eng > b.eng) {
                return 1
            }
            return 0
        },
    },
}
</script>

<style lang="stylus" scoped>
// .dialog-btns
//     display flex
//     justify-content flex-end
</style>
