<template>
    <div class="museums__table-wrapper">
        <div class="container">
            <div class="museums__table">
                <div    
                    v-for="(museum, key, index) in museums"
                    :key="key"
                    class="museums__table-row-wrapper"
                >
                    <div v-if="key < museumsQuantity" class="museums__table-row">
                        <div class="museums__table-cell museums__table-num">{{ key + 1 }}</div>
                        <div class="museums__table-cell museums__table-title">{{ museum.properties.name }}</div>
                        <div class="museums__table-cell museums__table-address">{{ museum.properties.CompanyMetaData.address }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'MuseumsTable',

    props: {
        museums: {
            type: Array,
            default: () => []
        },
        museumsQuantity: {
            type: Number,
            required: true,
            default: 30
        }
    }
}
</script>

<style lang="sass" scoped>
.museums
    &__table
        padding-bottom: 30px
        &-row
            display: flex
            flex-direction: column
            padding: 5px 0
            border-bottom: 1px solid #17a2b8
            @media (min-width: 575px)
                flex-direction: row
        &-cell
            padding: 0 10px
        &-num
            width: 100%
            text-align: center
            display: none
            @media (min-width: 575px)
                width: 5%
                display: block
        &-title
            width: 100%
            color: #17a2b8
            font-weight: 500
            @media (min-width: 575px)
                width: 50%
                color: #000
                font-weight: 400
        &-address
            width: 100%
            @media (min-width: 575px)
                width: 45%
</style>
