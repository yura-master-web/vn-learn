<template lang="pug">
section.error-loyout
    .error-content
        h1.error-title Error 404
        nuxt-link(to="/learn-english") Вернуться к приложению
</template>

<style lang="stylus" scoped>
.error-loyout
    display flex
    width 100%
    justify-content center
    align-items center
.error-content
    padding-top 6rem
    display flex
    flex-direction column
    align-items center
.error-title
    margin-bottom 1rem
    color red
</style>
