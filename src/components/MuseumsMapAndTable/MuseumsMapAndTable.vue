<template>
    <div class="map-table">
        <!-- {{museumsMapAndTableProps}} -->
        <!-- <MuseumsTable :museums="museumsMapAndTableProps" :museumsQuantity="30" /> -->
        <div class="museums__table-list"></div>
        <div id="map-addresses"></div>
        <!-- <div class="museums__table-map">
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
            </yandex-map> -->
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
    }),

    mounted() {
        var addressesMap = new ymaps.Map("map-addresses", {
            center: this.museumsMapAndTableProps[0].geometry.coordinates,
            zoom: 15,
        });

        var objects = [];
        var addressList = {};
        addressList.box = document.querySelector('.museums__table-list');
        addressList.addAddress = function(address) {
            for (let i = 0; i < this.museumsMapAndTableProps.length; i++) {
                if (address == this.museumsMapAndTableProps[i].properties.description) {
                    var thisShop = this.museumsMapAndTableProps[i];
                    newItemMetro = thisShop.metro.join(', ');
                }
            }

            let newItem = 'div class="address__data">' + address + '</div>' +
            '<span class="address__metro">' + newItemMetro + '</span>';

            addressList.box.append(newItem);
        }

        addressList.clearAddressList = function() {
            addressList.innerHtml = '';
        };

        addressList.renderList = function(mapObjects) {
            //для каждого маркера получаем адрес и добавляем в список
            if(mapObjects.getLength()) {
                mapObjects.each(function (item) {
                    ymaps.geocode(item.geometry._coordinates).then(function (result) {
                        var geoObjectAddress = result.geoObjects.get(0).getAddressLine();

                        addressList.addAddress(geoObjectAddress);
                    });
                });
            } else {
                addressList.clearAddressList();
            }
        };

        //добавляем все маркеры на карту
        this.museumsMapAndTableProps.forEach(function (item) {
            addressesMap.geoObjects.add(new ymaps.Placemark(item.geometry.coordinates, {
                balloonContent: item.properties.description,
            }, {
                preset: 'islands#icon',
                iconColor: '#0095b6'
            }));

            //собираем массив для geoQuery
            objects.push(
                {
                    type: 'Point',
                    coordinates: item.coords,
                }
            );
        });

        var objectsQuery = ymaps.geoQuery(objects);

        //формируем список адресов в видимой области при зарузке страницы
        addressList.renderList(objectsQuery.searchInside(addressesMap));


        // После каждого сдвига карты будем смотреть, какие объекты попадают в видимую область.
        // и изменять список адресов
        addressesMap.events.add('boundschange', function () {
            //маркеры попавшие в область видимости
            var visibleObjects = objectsQuery.searchInside(addressesMap);

            //чистим список адресов
            addressList.clearAddressList();

            //для каждого маркера получаем адрес и добавляем в список
            addressList.renderList(visibleObjects);
        });
    }
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
#map-addresses {
    height: 600px;
    width: 50%;
}
</style>