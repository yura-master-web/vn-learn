<template lang="pug">
div
    el-input(
        placeholder="Please input",
        suffix-icon="el-icon-search",
        v-model="filterText",
        @keyup.native="filterTable"
    )
    el-table(
        :data="words",
        style="width: 100%",
        :default-sort="{ prop: 'status', order: 'ascending' }",
        ref="tableDictionary"
    )
        el-table-column(type="index", label="N")
        el-table-column(label="Русское", sortable, :sort-method="sortRusWords")
            template(slot-scope="{row: {rus}}") {{ rus }}
        el-table-column(label="Перевод", sortable, :sort-method="sortEngWords")
            template(slot-scope="{row: {eng}}") {{ eng }}
        el-table-column(label="Статусы", width="150", sortable, :sort-method="sortStatus", prop="status")
            template(slot-scope="{row: {status, id}}")
                el-button(size="mini", @click="changeStatus(id)") {{ allStatus[status] }}
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
            filterText: '',
        }
    },
    computed: {
        ...mapGetters('dictionary', {
            words: 'getAllWords',
            allStatus: 'getStatus',
        }),
    },
    methods: {
        filterTable() {
            const rows = this.$refs.tableDictionary.$refs.bodyWrapper.getElementsByClassName('el-table__row')
            for (const row of rows) {
                const cells = row.getElementsByTagName('td')
                for (const cell of cells) {
                    const innerText = cell.textContent.toLowerCase()
                    const filterText = this.filterText.toLowerCase()
                    if (innerText.includes(filterText)) {
                        row.style.display = ''
                        break
                    } else {
                        row.style.display = 'none'
                    }
                }
            }
        },
        editWord(word) {
            this.word = { ...word }
            this.editDialog = true
        },
        changeStatus(id) {
            this.$store.dispatch('dictionary/changeStatus', id)
            this.$refs.tableDictionary.sort('status', 'ascending')
            setTimeout(() => this.filterTable(), 0)
            this.$emit('chage-status')
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
