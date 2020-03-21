<template>
    <div class="map-table">
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
        },
        shops: [
            {
                coords: [55.72156952053125,37.692989148681654],
                address: 'Россия, Москва, Волгоградский проспект, 32к12',
                metro: ['Волгоградский проспект (фиолетовая)', 'Угрешская (МЦК)'],
                phone: ['+7 (980) 614-84-21', '+7 (495) 518-06-52'],
                website: 'technopark.ru',
                time: 'Ежедневно с 09:00 до 21:00'
            },
            {
                coords: [55.744949060949494,37.6509305812288],
                address: 'Россия, Москва, Тетеринский переулок, 4/8с2',
                metro: ['Таганская (кольцевая)'],
                phone: [],
                website: 'technopark.ru',
                time: 'Ежедневно с 10:00 до 21:00'
            },
            {
                coords: [55.7361122550456,37.59707975498832],
                address: 'Россия, Москва, Турчанинов переулок, 3с1',
                metro: ['Парк культуры (красная)'],
                phone: ['+7 (495) 518-06-52'],
                website: 'technopark.ru',
                time: 'Ежедневно с 09:00 до 20:00'
            },
            {
                coords: [55.72257676155486,37.56339300908131],
                address: 'Россия, Москва, улица Савельева',
                metro: ['Спортивная (красная)', 'Лужники (МЦК)'],
                phone: ['+7 (980) 614-84-21'],
                website: 'technopark.ru',
                time: 'Ежедневно с 08:00 до 20:00'
            },
            {
                coords: [55.6953563491502,37.5311784748228],
                address: 'Россия, Москва, Ломоносовский проспект, 25к2',
                metro: ['Университет (красная)'],
                phone: ['+7 (980) 614-84-21', '+7 (495) 518-06-52'],
                website: 'technopark.ru',
                time: 'Ежедневно с 11:00 до 18:00'
            }
        ]
    }),

    mounted() {
        var addressesMap = new ymaps.Map("map-addresses", {
                center: this.shops[0].coords,
                zoom: 15,
            });

        var objects = [];
        var addressList = {};
        addressList.box = document.querySelector('.museums__table-list');
        addressList.addAddress = function(address) {
            for (let i = 0; i < this.shops.length; i++) {
                if (address == this.shops[i].address) {
                    var thisShop = this.shops[i];
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
        this.shops.forEach(function (item) {
            addressesMap.geoObjects.add(new ymaps.Placemark(item.coords, {
                balloonContent: item.address,
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