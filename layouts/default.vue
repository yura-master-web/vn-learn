<template lang="pug">
el-container
    el-header
        el-row(type="flex", justify="center")
            el-col.header-container(:xs="24", :sm="18", :md="12", :lg="10")
                app-logo
                app-navigation
    el-main
        el-row(type="flex", justify="center")
            el-col(:xs="24", :sm="18", :md="12", :lg="10")
                nuxt
</template>

<script>
import AppLogo from '@/components/Logo'
import AppNavigation from '@/components/main/Navigation.vue'
export default {
    components: {
        AppNavigation,
        AppLogo,
    },
}
</script>

<style lang="stylus" scoped>
.header-container
    display flex
    border-bottom solid 1px #e6e6e6
    align-items center
</style>
