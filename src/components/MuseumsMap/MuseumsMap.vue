<template>
    <div class="museums__map-wrapper">
        <div class="museums__map">
        <yandex-map 
            :coords="coords"
            :zoom="12"
        >
            <ymap-marker 
                v-for="(museum, key) in museumsMapProps"
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
import { yandexMap, ymapMarker } from 'vue-yandex-maps'

export default {
    name: 'MuseumsMap',

    components: {
        yandexMap,
        ymapMarker
    },

    props: {
        museumsMapProps: {
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
.museums__map {
    height: 600px;
}
.ymap-container {
    height: 100%;
}
</style>