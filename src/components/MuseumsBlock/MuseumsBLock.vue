<template>
    <div class="museums">
        <Togglers @showMap="onShowMap" @showTable="onShowTable" @showMapAndTable="onShowMapAndTable"/>
        <MuseumsTableBLock v-if="isTableShown" :museums="museums" />
        <MuseumsMap v-if="isMapShown" :museums="museums" />
    </div>
</template>

<script>
import Togglers from '../Togglers/Togglers.vue';
import MuseumsTableBLock from '../MuseumsTableBLock/MuseumsTableBLock.vue';
import MuseumsMap from '../MuseumsMap/MuseumsMap.vue';

export default {
    name: 'MuseumsBLock',

    components: {
        Togglers,
        MuseumsTableBLock,
        MuseumsMap
    },

    data() {
        return {
            museums: null,
            isTableShown: true,
            isMapShown: false,
            isMapAndTableShown: false
        }
    },

    mounted() {
        axios
            .get('https://search-maps.yandex.ru/v1/?text=музеи&type=biz&lang=ru_RU&bbox=37.28,55.59~37.99,55.87&results=50&apikey=a8504c7c-287f-4ce7-99a4-b9752ed54229')
            .then(response => (this.museums = response.data.features));
    },

    methods: {
        onShowMap(data) {
            this.isTableShown = false,
            this.isMapShown = true,
            this.isMapAndTableShown = false
        },
        onShowTable(data) {
            this.isTableShown = true,
            this.isMapShown = false,
            this.isMapAndTableShown = false
        }, 
        onShowMapAndTable(data) {
            this.isTableShown = false,
            this.isMapShown = false,
            this.isMapAndTableShown = true
        } 
    }
}
</script>