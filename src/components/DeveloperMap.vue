<template>
<div>
    <div class="uk-margin-top">
        <div class="uk-margin map">
            <nav class="uk-background-default">
                <div class="uk-inline place-params">
                    <button class="uk-button uk-button-default" type="button">
                        Параметры участка
                    </button>
                    <div uk-drop="mode: click; pos: bottom-left; offset: 0">
                        <div class="uk-card uk-card-body uk-card-default">
                            <div class="uk-margin">
                                <label class="uk-form-label" for="form-stacked-text">Цена участка</label>
                                <div class="uk-grid-small uk-width-1-1" uk-grid>
                                    <div class="uk-width-1-2">
                                        <p>От {{ priceValue[0] }}</p>
                                    </div>
                                    <div class="uk-width-1-2 uk-text-right">
                                        <p>До {{ priceValue[1] }}</p>
                                    </div>
                                </div>
                                <div class="uk-form-controls">
                                    <vue-slider v-model="priceValue" :enable-cross="false" :tooltip="'none'" :min="0" :max="4000000" :interval="10000" />
                                </div>
                            </div>
                            <div class="uk-margin">
                                <label class="uk-form-label" for="form-stacked-text">Количество соток</label>
                                <div class="uk-grid-small uk-width-1-1" uk-grid>
                                    <div class="uk-width-1-2">
                                        <p>От {{ areaValue[0] }}</p>
                                    </div>
                                    <div class="uk-width-1-2 uk-text-right">
                                        <p>До {{ areaValue[1] }}</p>
                                    </div>
                                </div>
                                <div class="uk-form-controls">
                                    <vue-slider v-model="areaValue" :enable-cross="false" :tooltip="'none'" :min="0" :max="30" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="uk-inline place-status">
                    <button class="uk-button uk-button-default" type="button">
                        Статус участка
                    </button>
                    <div uk-dropdown="mode: click; offset: 0">
                        <ul class="uk-nav uk-dropdown-nav">
                            <li @click="statusFilter = 'all'" :class="{ selected: statusFilter == 'all' }">
                                Все участки
                            </li>
                            <li v-for="(status, id) in statuses" :key="status" @click="statusFilter = id" :class="{ selected: statusFilter == id }">
                                {{ status }}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div v-dragscroll ref="wrapper" id="wrapper" v-show="!!bgimage">
                <div ref="image" id="image">
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.2" baseProfile="tiny" id="svg" class="svg-pan-zoom_viewport" easypz='{"applyTransformTo": "svg > *", "options": { "minScale": 1, "maxScale": 4, "bounds": { "top": 0, "right": 0, "bottom": 0, "left": 0 }} }'>
                        <image ref="image" :xlink:href="getBgPath" x="0" y="0" height="100%" width="100%" />
                        <g id="viewport" class="svg-area" v-for="object in getFilterObjects" :key="object.id" @click="selectedPlace = object">
                            <polygon :points="object.points" :class="selectClasses(object)" />
                            <circle :cx="centroid(object.points).x - 1" :cy="centroid(object.points).y - 4" r="8" />
                            <text class="area-id" :x="centroid(object.points).x - (object.id.toString().length * 3)" :y="centroid(object.points).y">
                                {{ object.id }}
                            </text>
                            <text class="area-land" :x="centroid(object.points).x - 10" :y="centroid(object.points).y + 12">
                                {{ object.land_area }} сот.
                            </text>
                        </g>
                    </svg>
                </div>
            </div>
            <transition enter-active-class="uk-animation-slide-right-medium" leave-active-class="uk-animation-slide-right-medium uk-animation-reverse">
                <div class="reservation-card uk-card uk-card-default uk-card-small uk-card-body uk-width-1-1@s uk-width-1-3@m" v-show="!!selectedPlace">
                    <span class="close" uk-icon="icon: close" @click="selectedPlace = ''"></span>
                    <h3 class="uk-card-title uk-margin-remove">
                        Участок {{ selectedPlace.name }}
                    </h3>
                    <hr class="uk-width-1-1" />
                    <div class="uk-card-body uk-padding-remove uk-margin-remove uk-grid-small uk-width-1-1" uk-grid>
                        <div class="uk-grid uk-first-column uk-padding-remove uk-margin-remove stroke">
                            <div class="uk-width-1-2@m uk-width-1-1@s uk-text-left uk-padding-remove">
                                <p>Стоимость</p>
                            </div>
                            <div class="cart-info uk-width-1-2@m uk-width-1-1@s uk-text-right">
                                <p>{{ selectedPlace.price }} руб.</p>
                            </div>
                        </div>
                        <div class="uk-grid uk-first-column uk-padding-remove uk-margin-remove stroke">
                            <div class="uk-width-1-2@m uk-width-1-1@s uk-text-left uk-padding-remove">
                                <p>Площадь</p>
                            </div>
                            <div class="cart-info uk-width-1-2@m uk-width-1-1@s uk-text-right">
                                <p>{{ selectedPlace.land_area }} {{ getAreaText }}</p>
                            </div>
                        </div>
                        <div class="uk-grid uk-first-column uk-padding-remove uk-margin-remove stroke">
                            <div class="uk-width-1-2@m uk-width-1-1@s uk-text-left uk-padding-remove">
                                <p>Статус</p>
                            </div>
                            <div class="cart-info uk-width-1-2@m uk-width-1-1@s uk-text-right" :class="selectClasses(selectedPlace)">
                                <p>{{ statuses[selectedPlace.status_id] }}</p>
                            </div>
                        </div>
                        <div class="uk-margin-small-top uk-margin-small-bottom uk-width-1-1 uk-flex uk-flex-between">
                            <font-awesome-icon icon="road" uk-tooltip="Дорога" />
                            <font-awesome-icon icon="burn" uk-tooltip="Газ" />
                            <font-awesome-icon icon="bolt" uk-tooltip="Электричество" />
                            <font-awesome-icon icon="wifi" uk-tooltip="Интернет" />
                        </div>
                        <div class="uk-width-1-1 uk-flex uk-flex-center uk-margin-small-top">
                            <button class="uk-button uk-button-primary reserve-button" uk-toggle="target: #reserved-modal" :disabled="selectedPlace.status_id != 1">
                                Забронировать
                            </button>
                        </div>
                        <div class="uk-width-1-1 uk-flex uk-flex-center uk-margin-small">
                            <p>
                                Приобретая данный участок, вы можете заказать постройку одного
                                из наших домов
                            </p>
                        </div>
                        <div class="uk-width-1-1 uk-flex uk-flex-center uk-margin-small">
                            <ul uk-tab>
                                <li v-for="(house, i) in houses" :key="i" class="uk-padding-remove">
                                    <a @click="selectedHouse = house">{{ house.title }}</a>
                                </li>
                            </ul>
                        </div>
                        <div class="uk-width-1-1 uk-flex uk-flex-center uk-margin-small">
                            <div class="uk-position-relative uk-visible-toggle" uk-slider>
                                <ul class="uk-slider-items uk-child-width-1-1">
                                    <li v-for="(imgSrc, i) in selectedHouse ? selectedHouse.img : houses[0].img" :key="i">
                                        <img :src="`/wp-content/uploads/2020/houses/${imgSrc}`" alt="" />
                                    </li>
                                </ul>
                                <a class="uk-position-center-left uk-position-small navigation" href="#" uk-slidenav-previous uk-slider-item="previous"></a>
                                <a class="uk-position-center-right uk-position-small navigation" href="#" uk-slidenav-next uk-slider-item="next"></a>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>

            <div id="reserved-modal" uk-modal ref="modal">
                <div class="uk-modal-dialog uk-modal-body uk-width-1-1@s uk-width-1-4@m">
                    <h2 class="uk-modal-title">Забронировать участок</h2>
                    <form>
                        <div class="uk-margin">
                            <label class="uk-form-label" for="name">ФИО</label>
                            <div class="uk-form-controls">
                                <input class="uk-input" :class="{'uk-form-danger': invalidName}" v-model="name" id="name" type="text" placeholder="ФИО" />
                            </div>
                        </div>
                        <div class="uk-margin">
                            <label class="uk-form-label" for="phone">Телефон</label>
                            <div class="uk-form-controls">
                                <input class="uk-input" :class="{'uk-form-danger': invalidPhone}" v-model="phone" id="phone" type="tel" placeholder="(999) 999-99-99" />
                            </div>
                        </div>
                    </form>
                    <div v-if="isSend" class="uk-alert-success" uk-alert>
                        <p>Заявка успешно отправлена. В ближайшее время с вами свяжется наш менеджер</p>
                    </div>
                    <p class="uk-text-center">
                        <a class="uk-button uk-button-primary" @click="reservationPlace(selectedPlace.id, name, phone)">
                            Забронировать
                        </a>
                        <button class="uk-button uk-button-default uk-modal-close" type="button">
                            Закрыть
                        </button>
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import EasyPZ from "easypz";
import {
    dragscroll
} from "vue-dragscroll";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";

//fontawesom icons
import {
    library
} from "@fortawesome/fontawesome-svg-core";
import {
    faRoad,
    faBurn,
    faWifi,
    faFaucet,
    faBolt,
} from "@fortawesome/free-solid-svg-icons";
import {
    FontAwesomeIcon
} from "@fortawesome/vue-fontawesome";
library.add([faRoad, faBurn, faWifi, faFaucet, faBolt]);

export default {
    props: {
        village_id: Number,
    },
    data() {
        return {
            bgimage: "",
            phone: "",
            name: "",
            priceValue: [0, 4000000],
            areaValue: [0, 30],
            selectedPlace: "",
            statusFilter: "all",
            statuses: {
                1: "Свободен",
                2: "Забронирован",
                3: "Продан",
            },
            objects: [],
            houses: [{
                    title: "Елена",
                    img: [
                        "elena-proekt2-2.jpg",
                        "proekt-elena-3-2.jpg",
                        "proekt-elena-4-2.jpg",
                    ],
                },
                {
                    title: "Тюменка",
                    img: [
                        "stroitelstvo_kottedjei_tumen_2-1.jpg",
                        "stroitelstvo_kottedjei_tumen_4-1.jpg",
                        "stroitelstvo_kottedjei_tumen-1.jpg",
                    ],
                },
                {
                    title: "Хай-Тек",
                    img: [
                        "stroitelstvo_domov8-1.jpg",
                        "stroitelstvo-doma-hajtek-1.jpg",
                        "stroitelstvo-doma-hajtek-2.jpg",
                    ],
                },
                {
                    title: "Даймонд",
                    img: [
                        "dimond-1.jpg",
                        "dimond-2.jpg",
                        "dimond-3.jpg",
                    ],
                },
            ],
            publicPath: process.env.BASE_URL,
            selectedHouse: null,
            invalidName: false,
            invalidPhone: false,
            isSend: false
        };
    },
    watch: {
        phone(val) {
            if (val.startsWith("8")) this.phone = this.phone.substring(1);
            else if (val.startsWith("+7")) this.phone = this.phone.substring(2);
            if (val.length > 10) this.phone = this.phone.slice(0, 10);
        },
    },
    mounted() {
        this.$axios
            .post(`/developer/get_area/${this.village_id}`, {})
            .then((response) => {
                this.bgimage = response.data.cottage_village.path_bg;
                this.objects = response.data.area;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    methods: {
        reservationPlace(area_id, name_booking, phone_booking) {
            this.isValid();
            if (this.invalidName || this.invalidForm) return;
            this.$axios
                .post(`/developer/new_booking/${area_id}`, {
                    name_booking,
                    phone_booking,
                })
                .then((res) => {
                    this.objects.find((object) => object.id == area_id).status_id = 2;
                    this.phone = '';
                    this.name = '';
                    this.isSend = true;

                    setTimeout(() => {
                        this.isSend = true;
                        UIkit.modal(this.$refs.modal).hide();
                    }, 2000)
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        selectClasses(object) {
            return {
                filter: this.filterPlace(object),
                selected: this.selectedPlace.id == object.id,
                free: object.status_id == 1,
                reserved: object.status_id == 2,
                saled: object.status_id == 3,
            };
        },
        filterPlace(object) {
            return object.price >= this.priceValue[0] &&
                object.price <= this.priceValue[1] &&
                object.land_area >= this.areaValue[0] &&
                object.land_area <= this.areaValue[1] &&
                this.statusFilter == "all" ?
                true :
                object.status_id == this.statusFilter;
        },
        isValid() {
            if (this.name == '') this.invalidName = true;
            if (this.phone.length < 10 || !parseInt(this.phone)) this.invalidPhone = true;
            setTimeout(() => {
                this.invalidName = false;
                this.invalidPhone = false;
            }, 1000)
        },
        centroid(pointsStr) {
            let objectPoints = pointsStr.split(" ");
            let points = [];
            for (let i = 0; i < objectPoints.length - 1; i += 2) {
                points.push({
                    x: objectPoints[i],
                    y: objectPoints[i + 1],
                });
            }
            let l = points.length;
            return points.reduce(
                (center, p, i) => {
                    center.x += parseFloat(p.x);
                    center.y += parseFloat(p.y);
                    if (i === l - 1) {
                        center.x /= l;
                        center.y /= l;
                    }
                    return center;
                }, {
                    x: 0,
                    y: 0,
                }
            );
        },
    },
    computed: {
        getFilterObjects() {
            return this.objects.filter((object) => !!object.points);
        },
        getAreaText() {
            if (
                Math.floor(this.selectedPlace.land_area) % 10 == 1 &&
                (Math.floor(this.selectedPlace.land_area) < 10 || Math.floor(this.selectedPlace.land_area) > 20)
            )
                return "сотка";
            else if (
                Math.floor(this.selectedPlace.land_area) % 10 > 1 &&
                Math.floor(this.selectedPlace.land_area) % 10 < 5 &&
                (Math.floor(this.selectedPlace.land_area) < 10 || Math.floor(this.selectedPlace.land_area)) > 20) return "сотки";
            else return "соток";
        },
        getBgPath() {
            return !!this.bgimage ? `https://cloud.vevanta.ru/${this.bgimage}` : "";
        },
    },
    components: {
        VueSlider,
        FontAwesomeIcon,
    },
    directives: {
        dragscroll,
    },
};
</script>

<style scoped>
.stroke {
    margin-bottom: 20px !important;
}

nav {
    position: absolute;
    top: 0px;
    z-index: 3;
}

.navigation {
    border-radius: 50%;
    color: #fff;
    background-color: rgba(234, 234, 234, .4);
}

.navigation:hover {
    opacity: .9;
}

.map {
    position: relative;
}

#wrapper {
    display: block;
    padding: 0;
    position: relative;
    overflow: hidden;
    width: 100%;
}

#image {
    display: block;
    position: relative;
    height: 700px;
    width: 1200px;
    cursor: grab;
}

#svg {
    height: 100%;
    width: 100%;
    z-index: 2;
    display: inline-block;
}

svg text {
    font-size: 10px;
}

polygon {
    stroke-width: 1;
    stroke: rgb(81 107 71 / 64%);
    fill-opacity: 0.1;
}

.svg-area:hover {
    cursor: pointer;
}

.svg-area:hover polygon {
    fill-opacity: 1;
    stroke: #fff;
}

circle {
    fill: #fffcc8;
}

polygon.free {
    fill: #79ff79;
}

polygon.saled {
    fill: #ff7d7d;
}

polygon.reserved {
    fill: #ffa14a;
}

polygon.filter {
    fill-opacity: 0.4;
}

polygon.selected {
    stroke: #ffffffe0;
    stroke-width: 2;
    fill-opacity: 1;
}

.unselected {
    fill-opacity: 0.3;
}

.area-land {
    font-size: 7px;
    position: relative;
}

.area-land:after {
    content: "";
    display: block;
    height: 10px;
    width: 10px;
    position: fixed;
    top: 0;
    left: 0;
    background-color: red;
}

.reservation-card.uk-card {
    z-index: 100;
    position: absolute;
    right: 0;
    bottom: 0;
    height: 100%;
}

.close {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
}

.cart-info {
    background-color: #efefef;
    padding: 2px 5px;
    border-radius: 6px;
}

.cart-info.free {
    background-color: #d7ffd2;
}

.cart-info.saled {
    background-color: #ffe5e5;
}

.cart-info.reserved {
    background-color: #ffefc3;
}

.reservation-card .icon-info:hover {
    color: #04af04;
}

.reserve-button {
    margin: 20px 0px;
}

.place-params .uk-card {
    padding: 20px;
}

.place-status .selected {
    background-color: #e2e2e2;
}

.place-status .uk-dropdown {
    padding: 0px;
}

.place-status li {
    padding: 10px 20px;
}

.place-status li:hover {
    cursor: pointer;
    background-color: #dedede;
}
</style>
