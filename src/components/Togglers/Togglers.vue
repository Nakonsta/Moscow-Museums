<template>
    <div class="museums__togglers">
        <div class="container">
            <button
                @click="showTable"
                class="btn btn-info"
            >
                Показать таблицей
            </button>
            <button
                @click="showMap"
                class="btn btn-info"
            >
                Показать на карте
            </button>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Togglers',

    methods: {
        showTable() {
            this.$emit('showTable', 'table')
        },
        showMap() {
            this.$emit('showMap', 'map')
        }
    }
}
</script>

<style lang="sass" scoped>
.museums__togglers
    padding: 30px 0
    .btn
        margin: 0 0 10px
        width: 100%
        @media (min-width: 575px)
            width: auto
</style>