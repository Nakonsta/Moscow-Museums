<template>
    <div class="museums__table-block">
        <Select @input="rerenderTable" :options="options"/>
        <MuseumsTable :museums="museums" :museumsQuantity="museumsQuantity" />
    </div>
</template>

<script>
import Select from '../Select/Select.vue';
import MuseumsTable from '../MuseumsTable/MuseumsTable.vue';

export default {
    name: 'MuseumsTableBLock',

    components: {
        Select,
        MuseumsTable
    },

    props: {
        museums: {
            type: Array,
            default: () => []
        }
    },

    data() {
        return {
            options: [30, 20, 50],
            museumsQuantity: 30
        }
    },

    methods: {
        rerenderTable(data) {
            this.museumsQuantity = data
        }
    }
}
</script>