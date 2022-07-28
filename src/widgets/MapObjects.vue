<template>
  <div>
      <div class="uk-grid uk-grid-small uk-margin-small-bottom uk-flex-middle uk-flex-between">
        <div>
          <div class="fnt-bld">
            Год:
          </div>
          <div class="uk-margin-small-top">
            <select class="uk-select" v-model="filter.year" @change="lazyMap">
              <option :value="0">Все</option>
              <option :value="2021">2021</option>
              <option :value="2020">2020</option>
            </select>
          </div>
        </div>
        <div class="">
          <div class="fs20 fnt-bld">
            Найдено: {{ contractsLn }}
          </div>
        </div>

      </div>
        <div class="uk-position-relative uk-width-1-1 uk-height-large">
          <div id="map" class="uk-width-1-1 uk-height-1-1 uk-position-absolute">
        </div>
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      objects: [],
      filter: {
        year: 0
      },
      contractsLn: 0,
      zoom: 9,
      myMap: '',
    };
  },
  created() {
    let map = document.createElement('script')
    map.src = 'https://api-maps.yandex.ru/2.1/?apikey=a225415c-23a4-48ac-a998-4af1a792ed64&lang=ru_RU'
    document.head.appendChild(map)
    this.lazyMap()

  },

  methods: {
    lazyMap() {
      if (typeof ymaps !== 'object') {
        setTimeout(() => {
          this.lazyMap()
        }, 50)

      } else {
        this.$axios.post('https://api.vevanta.ru/v1/projects/get_objects_map')
        .then(rs => {
          this.objects = rs.data
          this._addPlacemarks()
        })

        this.$axios.post('https://api.vevanta.ru/v1/projects/get_contract_info', {
          filter: this.filter
        })
        .then(rs => {

          this.contractsLn = rs.data[0].ln
        })
      }
    },

    _getValidCoordinate(cor) {
      cor += ''
      let position = cor.indexOf('.')
      return parseFloat(cor.slice(0, position) + cor.slice(position, (7 + parseInt(position))));
    },

    _addPlacemarks() {
      ymaps.ready(() => {



        if (!this.myMap) {
          this.myMap = new ymaps.Map("map", {
              center: [57.137410, 65.545916],
              zoom: this.zoom
          });
        }


        if (window.innerWidth < 1200) {
            this.myMap.behaviors.disable('drag');
        }

        this.myMap.geoObjects.removeAll();

        this.objects.forEach((item) => {
            let imageOptions = {};

            if (item.status === 2) {
              imageOptions = {
            //    iconImageHref: 'https://cdn.vevanta.com/sk/2-1.png',
                zIndex: 1,
              }
            } /* else if (item.status === 4) {
              imageOptions = {
                iconImageHref: 'https://cdn.vevanta.com/sk/1-1_jH45.png'
              }
            } */


          let placemark = new ymaps.Placemark([item.center_x, item.center_y], {}, {
            iconLayout: 'default#image',
            ...imageOptions,
        //    iconImageClipRect: [[69,0], [97, 46]],
            status: item.status,
            iconImageHref: 'https://cdn.vevanta.com/sk/point.png',
            iconImageSize: [10, 10],
      //      iconImageOffset: [-35, -63]
          })

          this.myMap.events.add('boundschange', e => {
            let zoom = e.get('newZoom')
            this.zoom = zoom

            if (this.zoom < 10) {
              placemark.options.set('iconImageHref', 'https://cdn.vevanta.com/sk/point.png')
              placemark.options.set('iconImageSize', [10, 10])
            } else if (item.status === 2) {
              placemark.options.set('iconImageHref', 'https://cdn.vevanta.com/sk/2-1.png')
              placemark.options.set('iconImageSize', [49, 49])
            } else if(item.status === 4) {
              placemark.options.set('iconImageHref', 'https://cdn.vevanta.com/sk/1-1_jH45.png')
              placemark.options.set('iconImageSize', [49, 49])
            }
          })


          if (this.zoom < 10) {
            placemark.options.set('iconImageHref', 'https://cdn.vevanta.com/sk/point.png')
            placemark.options.set('iconImageSize', [10, 10])
          } else if (item.status === 2) {
            placemark.options.set('iconImageHref', 'https://cdn.vevanta.com/sk/2-1.png')
            placemark.options.set('iconImageSize', [49, 49])
          } else if(item.status === 4) {
            placemark.options.set('iconImageHref', 'https://cdn.vevanta.com/sk/1-1_jH45.png')
            placemark.options.set('iconImageSize', [49, 49])
          }

          this.myMap.geoObjects.add(placemark)
        });

      });
    }
  }
};
</script>

<style media="screen">

</style>
