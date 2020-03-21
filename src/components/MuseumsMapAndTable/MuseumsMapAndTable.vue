<template>
    <div class="map-table">
        <MuseumsTable :museums="museumsMapAndTableProps" :museumsQuantity="30" />
        <div class="museums__table-map">
            <yandex-map 
                :coords="coords"
                :zoom="12"
            >
                <ymap-marker 
                    v-for="(museum, key) in museumsMapAndTableProps"
                    v-if="key < 30"
                    :key="key"
                    :coords="museum.geometry.coordinates" 
                    :icon="markerIcon"
                    marker-id="key" 
                    :hint-content="museum.properties.name" 
                />
            </yandex-map>
        </div>
    </div>
    
</template>

<script>
import MuseumsTable from '../MuseumsTable/MuseumsTable.vue';
import { yandexMap, ymapMarker } from 'vue-yandex-maps'

export default {
    name: 'MuseumsMapAndTable',

    components: {
        MuseumsTable,
        yandexMap,
        ymapMarker
    },

    props: {
        museumsMapAndTableProps: {
            type: Array,
            default: () => []
        }
    },

    data: () => ({
        coords: [
            37.623269,
            55.756442            
        ],
        markerIcon: {
            layout: 'default#imageWithContent',
            imageHref: 'https://onnews.yida-design.com.tw/icon_book.png',
            imageSize: [28, 28],
            imageOffset: [-14, -14],
            content: '',
            contentOffset: [0, 0],
            contentLayout: ''
        }
    })
}
</script>

<style lang="scss" scoped>
.map-table {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}
.museums__table-map {
    height: 600px;
    width: 50%;
}
.ymap-container {
    height: 100%;
}
</style>