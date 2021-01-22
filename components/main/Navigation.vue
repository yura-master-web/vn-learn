<template lang="pug">
el-menu.el-menu-demo(:default-active="$route.path", mode="horizontal", router)
    el-menu-item(index="/") Главная
    el-menu-item(index="/learn-english") Изучение английского
</template>

<script>
export default {
    name: 'Navigation',

    data() {
        return {}
    },
}
</script>

<style lang="stylus" scoped>
.el-menu
    border-bottom none
</style>
