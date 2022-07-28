<template>
  <div>
    <div class="quizContainer uk-flex uk-flex-center uk-padding uk-margin-top">
      <div class="uk-card uk-card-default uk-card-body uk-padding-small">
        <div v-show="slide == 0" class="cldark fs24 fnt-med uk-margin-bottom">Данные по проекту</div>
        <div v-show="slide == 1" class="cldark fs24 fnt-med uk-margin-bottom">Выберите параметры будущего дома</div>
        <div v-show="slide == 2" class="cldark fs24 fnt-med uk-margin-bottom">Ваши данные</div>
        <div class="" uk-grid>
          <div v-show="slide == 0" uk-grid class="uk-grid-small uk-width-3-4@m itemContainer">
            <div class="uk-width-1-2@m">
              <div>
                <div class="uk-margin">
                  <form class="uk-form-horizontal uk-background-muted uk-padding-small uk-panel formDiv">
                    <label class="uk-form-label labelInput" for="form-horizontal-text">Общая площадь м<sup>2</sup></label>
                    <div class="uk-form-controls InputForm">
                        <input class="uk-input" v-model="square" id="form-horizontal-text" type="text" placeholder="100">
                    </div>
                  </form>
                </div>
              </div>
              <div>
                <div class="uk-margin">
                  <form class="uk-form-horizontal uk-background-muted uk-padding-small uk-panel formDiv">
                    <label class="uk-form-label labelInput" for="form-horizontal-text">Габариты дома м</label>
                    <div class="uk-form-controls InputForm uk-child-width-expand uk-flex uk-flex-middle" >
                        <input class="uk-input gabInput" v-model="gabOne" id="form-horizontal-text" type="text" placeholder="10"> X
                        <input class="uk-input gabInput" v-model="gabTwo" id="form-horizontal-text" type="text" placeholder="10">
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="uk-width-1-2@m">
              <form class="uk-form-horizontal uk-background-muted uk-padding-small uk-panel formDiv">
                <div class="uk-margin">
                    <div class="uk-form-label labelInput">Этажность</div>
                    <div class="uk-form-controls uk-form-controls-text InputForm">
                        <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                            <label><input v-model="floor" class="uk-radio" value="Один этаж" type="radio" name="floor"> 1</label>
                            <label><input v-model="floor" class="uk-radio" value="Два этажа" type="radio" name="floor" checked> 2</label>
                            <label><input v-model="floor" class="uk-radio" value="Три этажа" type="radio" name="floor"> 3</label>
                        </div>
                    </div>
                </div>
              </form>
              <div class="uk-margin uk-grid-small uk-child-width-1-1 uk-grid">
                  <label><input class="uk-checkbox" v-model="checkedAdd" value="последний этаж мансардный" type="checkbox"> последний этаж мансардный</label>
                  <label><input class="uk-checkbox" v-model="checkedAdd" value="с цокольным этажом" type="checkbox"> с цокольным этажом</label>
                  <label><input class="uk-checkbox" v-model="checkedAdd" value="с гаражом" type="checkbox" checked> с гаражом</label>
              </div>
            </div>
            <div class="uk-width-1-1">
              <hr>
            </div>
            <div class="cldark fs16 fnt-med uk-margin-top">{{subTitle}}</div>
            <div class="uk-width-1-2@m">
              <div class="uk-padding-small uk-text-center">
                <div class="js-upload" uk-form-custom>
                  <input type="file" multiple>
                  <button class="btn btn__tpl1 btn__blue fr uk-text-lowercase" type="button" tabindex="-1">Загрузите свой проект</button>
                </div>
                <div class="uk-visible@s uk-text-left uk-margin-top uk-text-center">
                  Все необходимые изменения и доработки внесет наш архитектор по Вашим пожеланиям
                </div>
              </div>
            </div>
            <div class="uk-width-1-2@m">
              <div class="uk-padding-small uk-text-center">
                <form class="">
                    <div class="uk-margin">
                        <div v-show="!ButtonOn" class="uk-position-relative"><i class="icon-house-line uk-form-icon"></i>
                          <input v-model="link" type="text" placeholder="Ссылка на проект" class="uk-input">
                        </div>
                        <div>
                          <button @click="ButtonOn = !ButtonOn" v-show="ButtonOn" class="ukbtn btn__tpl1 btn__blue fr uk-text-lowercase cr-pointer" type="button" >+ Добавить ссылку</button>
                        </div>
                        <div class="uk-visible@s uk-text-left uk-margin-top uk-text-center">
                          Если Вам понравился проект на другом сайте, то Вы можете направить нам ссылку
                        </div>
                    </div>
                </form>
              </div>
            </div>
          </div>
          <div v-show="slide == 1" uk-grid class="uk-margin-remove-top uk-grid-small uk-width-3-4@m itemContainerSecond">
            <div class="uk-grid-small" uk-grid>
              <div v-for="item in items" :key="item.id" class="uk-width-1-2@m inputItem">
                  <label class="fnt-bld fs16 fs18@m" for="form-stacked-select">{{item.title}}</label>
                  <div class="uk-form-controls">
                      <select v-model="item.model" class="uk-select" id="form-stacked-select">
                          <option :value='option.name' v-for="option in item.options" :key="option">{{option.name}}</option>
                      </select>
                      <div class="uk-margin-small-top">
                        <a class="linkMat uk-width-1-1" :uk-toggle="`target: #${item.modalTarget}`">{{item.ButtonName}}</a>
                      </div>
                  </div>
                  <div :id="item.modalTarget" class="uk-modal-container" uk-modal>
                    <div class="uk-modal-dialog uk-modal-body">
                        <button class="uk-modal-close-outside" type="button" uk-close></button>
                        <div class="fs18 fnt-bld">{{item.modalTitle}}</div>
                        <div class="uk-grid-small uk-margin-top" uk-grid>
                          <div class="uk-width-1-2@m" v-for="card in item.cards" :key="card">
                            <div class="uk-card uk-card-default uk-card-body uk-padding-small">
                              <div class="uk-grid-small" uk-grid>
                                <div class="uk-width-2-3@s">
                                  <div class="fs16 fnt-bld">
                                    {{card.title}}
                                  </div>
                                  <div class="uk-flex uk-margin-small-top">
                                    <div class="uk-text-success uk-margin-small-right">
                                      +
                                    </div>
                                    <div class="fs14">
                                      {{card.first}}
                                    </div>
                                  </div>
                                  <div class="uk-flex uk-margin-small-top">
                                    <div class="uk-text-success uk-margin-small-right">
                                      -
                                    </div>
                                    <div class="fs14">
                                      {{card.second}}
                                    </div>
                                  </div>
                                </div>
                                <div class="uk-width-1-3@s">
                                  <img :src="card.imgUrl" alt="">
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
          <div v-show="slide == 2" class="uk-width-3-4@m itemContainerThree">
            <form class="uk-form-stacked uk-grid-small" uk-grid>
                <div class="uk-margin uk-width-1-2@m">
                    <label class="fs20 fnt-bld" for="form-stacked-text">Дата строительства</label>
                    <div class="uk-form-controls">
                        <input v-model="dateConst" class="uk-input uk-background-muted" id="form-stacked-text" type="text" placeholder="ММ.ГГГГ">
                    </div>
                </div>
                <div class="uk-margin uk-width-1-2@m telForm">
                    <label class="fs18 fnt-bld" for="form-stacked-text">Телефон</label>
                    <div class="uk-form-controls">
                        <input class="uk-input uk-background-muted" v-model="phone" id="form-stacked-text" type="text" placeholder="+7(ХХХ) ХХХ ХХ ХХ">
                    </div>
                </div>
                <div class="uk-margin uk-width-1-2@m">
                    <label class="fs18 fnt-bld" for="form-stacked-text">Удаленность от МКАД(км)</label>
                    <div class="uk-form-controls">
                        <input v-model="mkad" class="uk-input uk-background-muted" id="form-stacked-text" type="text" placeholder="км">
                    </div>
                </div>
                <div class="uk-margin uk-width-1-2@m">
                    <label class="fs18 fnt-bld" for="form-stacked-text">E-mail</label>
                    <div class="uk-form-controls">
                        <input v-model="email" class="uk-input  uk-background-muted" id="form-stacked-text" type="text" placeholder="example@gmail.com">
                    </div>
                </div>
                <div class="uk-margin uk-width-1-2@m">
                    <label class="fs18 fnt-bld" for="form-stacked-text">Направление</label>
                    <div class="uk-form-controls">
                        <input v-model="trace" class="uk-input uk-background-muted" id="form-stacked-text" type="text" placeholder="">
                    </div>
                </div>
                <div class="uk-margin uk-width-1-2@m">
                    <label class="fs18 fnt-bld" for="form-stacked-text">Как к вам обращаться</label>
                    <div class="uk-form-controls">
                        <input v-model="name" class="uk-input  uk-background-muted" id="form-stacked-text" type="text" placeholder="">
                    </div>
                </div>
            </form>
          </div>
          <div v-show="slide == 0 || slide == 1" class="uk-width-1-4@m uk-flex uk-flex-rigth cardButton uk-text-center">
            <div class="uk-card uk-card-default uk-padding-small uk-card-body">
              <div>
                Если вам сложно заполнять этот калькулятор, вы можете оставить заявку или позвонить нам:
              </div>
              <div class="uk-margin-small-top uk-margin-small-bottom fnt-bld fs14">
                <i class="icon-phone cl-vevanta"></i>  +7 (499) 346-84-70
              </div>
              <Button-Modal></Button-Modal>
            </div>
          </div>
          <div v-show="slide == 2" class="uk-width-1-4@m uk-flex uk-flex-rigth cardEnd">
            <div class="uk-card uk-card-default uk-padding-remove uk-card-body">
              <div>
                <img data-src="https://cdn.vevanta.com/sk/2021/03/%D0%BE%D1%84%D0%BE%D1%80%D0%BC%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B8%D0%BF%D0%BE%D1%82%D0%B5%D0%BA%D0%B8-%D0%BE%D0%BD-%D0%BB%D0%B0%D0%B9%D0%BD.jpg?w=400&h=260" width="" height="" alt="" uk-img>
              </div>
              <button class="btn btn__tpl1 btn__green fr uk-text-lowercase uk-text-left uk-padding-small" uk-toggle="target: #modalEnd">Все указанные Вами данные будут обработаны нашими архитекторами</button>
              <div id="modalEnd" class="uk-flex-top" uk-modal>
                <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical uk-width-2-3@m uk-width-1-2@l" >
                  <button class="uk-modal-close-outside" type="button" uk-close></button>
                  <div class="fs18 fnt-bld">
                    Все указанные Вами данные будут обработаны нашими архитекторами.
                  </div>
                  <div class="uk-text-meta">
                    На основании них, мы:
                  </div>
                  <div>
                    <ul class="uk-list uk-list-disc uk-list-primary">
                        <li>Выполним расчет стоимости строительства Вашего будущего дома</li>
                        <li>Предложим различные варианты комплектаций для оптимального выбора</li>
                        <li>Ответим на интересующие Вас воспросы по строительству и проектированию</li>
                    </ul>
                  </div>
                </div>
             </div>
            </div>

          </div>
        </div>
        <div class="uk-margin-top">
          <div class="uk-flex uk-flex-right">
            {{slide +1}} / {{slides}}
          </div>
          <progress id="js-progressbar" class="uk-progress" :value="bar.value" max="100"></progress>
        </div>
        <div class="uk-flex uk-flex-between">
          <div>
            <button v-show="!slide == 0" @click="bar.value -=33, slide -=1" name="back" class="btn btn__tpl1 btn__blue fr uk-text-lowercase">назад</button>
          </div>
          <div>
            <button v-show="slide == 0" @click="nextOne" name="next" class="btn btn__tpl1 btn__green fr uk-text-lowercase">вперед</button>
            <button v-show="slide == 1" @click="nextSecond" name="next" class="btn btn__tpl1 btn__green fr uk-text-lowercase">далее</button>
            <button v-show="slide == 2" @click="send" name="next" class="btn btn__tpl1 btn__green fr uk-text-lowercase">Получить рассчет</button>
          </div>
        </div>
    </div>
    </div>
  </div>
</template>
//убрать алерты - поставить экитовские
// добавить отображение msg error  под полями которые надо заолнить

<script>
import form from '@/mixins/Form.js'
import input from '@/filters/Input.js'
import ButtonModal from '../../widgets/buttons/ButtonModal.vue'

export default {
  name: "CalcDetails",
  components: {ButtonModal},
  mixins: [form, input],
  props: {
    subTitle: {
      type: String,
      default: 'Загрузить и направить нам свои данные по Вашему готовому проекту или эскизы будущего проекта'
    },
  },
  data() {
      return {
        slide: 0,
        slides: 3,
        phone: '',
        bar:{
          value: 34,
        },
        square: '',
        floor: 'Два этажа',
        checkedAdd: ['с гаражом'],
        link: '',
        dateConst: '',
        mkad: '',
        trace: '',
        email: '',
        name: '',
        typeConst:[],
        gabOne: '',
        gabTwo: '',
        lead: '',
        ButtonOn: true,
        items: [
          {
            id: 1,
            title: 'Тип фундамента',
            model: [],
            options: [
              {
                name: 'Фундамент не выбран',
              },
              {
                name: 'Утепленная монолитная железобетонная плита',
              },
              {
                name: 'Ленточный ж/б с расширенной подошвой глубокого заложения',
              },
              {
                name: 'Ленточный  железобетонный мелкозаглубленный',
              },
              {
                name: 'Свайно-ростверковый железобетонный',
              },
            ],
            ButtonName: "Сравнить типы фундаментов",
            modalTarget: "modalFundament",
            modalTitle: "Типы фундамента",
            cards: [
              {
                title: 'Утепленая монолитная железобетонная плит',
                first: 'Для большинства типов грунтов. Для участков без большого перепада высот земли.',
                second: 'Не экономично при большом перепаде высот земли',
                imgUrl: 'https://goodstone.ru/images/calc/st2-1.jpg'
              },
              {
                title: 'Ленточный фундамент ж/б с расширенной подошвой глубокого заложения',
                first: 'Для всех типов грунтов. Для массивных конструкций домов.',
                second: 'Очень дорогое решение фундамента, требующее обоснования применения.',
                imgUrl: 'https://goodstone.ru/images/calc/st2-3.jpg'
              },
              {
                title: 'Ленточный фундамент железобетонный мелкозаглубленный',
                first: 'Для небольших домов и построек. Для непучинистых грунтов.',
                second: 'Не подходит для слабых грунтов.',
                imgUrl: 'https://goodstone.ru/images/calc/st2-2.jpg'
              },
              {
                title: 'Свайно-ростверковый железобетонный фундамент',
                first: 'Для большинства типов грунтов. Для участков без большого перепада высот земли.',
                second: 'Не экономично при большом перепаде высот земли.',
                imgUrl: 'https://goodstone.ru/images/calc/st2-4.jpg'
              },
            ],

          },
          {
            id: 2,
            title: 'Материал стен',
            model: [],
            options: [
              {
                name: 'Материал стен не выбран',
              },
              {
                name: 'Газобетонные блоки YTONG, BONOLIT',
              },
              {
                name: 'Керамические блоки POROTHERM',
              },
              {
                name: 'Керамический кирпич',
              },
              {
                name: 'Керамзитобетонные блоки простые',
              },
            ],
            ButtonName: "Сравнить типы материалов",
            modalTarget: "modalMaterials",
            modalTitle: "Сравнить типы материалов",
            cards: [
              {
                title: 'Газобетонные блоки YTONG, BONOLIT',
                first: 'Лучшее сочетание цены и качества для загородного дома. Экологичен и долговечен.',
                second: 'Не подходит для подземных конструкций дома.',
                imgUrl: 'https://goodstone.ru/images/calc/st3-1.jpg'
              },
              {
                title: 'Керамические блоки POROTHERM',
                first: 'Хорошее решение для больших домов с облицовкой кирпичом. Экологичен и долговечен.',
                second: 'Дорогие расходные инструменты и кладочная смесь.',
                imgUrl: 'https://goodstone.ru/images/calc/st3-2.jpg'
              },
              {
                title: 'Керамический кирпич',
                first: 'Надежность, проверенная веками.',
                second: 'Требует дополнительное утепление. Экономически не выгоден для устройства внешних стен.',
                imgUrl: 'https://goodstone.ru/images/calc/st3-3.jpg'
              },
              {
                title: 'Керамзитобетонные блоки простые',
                first: 'Выгоден для нежилых построек. Экологичен и прост в работе.',
                second: 'Много брака и подделок. Малая несущая способность.',
                imgUrl: 'https://goodstone.ru/images/calc/st3-4.jpg'
              },
            ],

          },
          {
            id: 3,
            title: 'Тип перекрытий',
            model: [],
            options: [
              {
                name: 'Тип перекрытий не выбран',
              },
              {
                name: 'Перекрытие сборное из пустотных ж/б плит',
              },
              {
                name: 'Полностью монолитное ж/б перекрытие',
              },
              {
                name: 'Перекрытие деревянное по балкам с обрешеткой',
              },
            ],
            ButtonName: "Сравнить типы перекрытий",
            modalTarget: "modalfloor",
            modalTitle: "Сравнить типы перекрытий",
            cards: [
              {
                title: 'Перекрытие сборное из пустотных ж/б плит',
                first: 'Оптимальное решение для надежного ж/б перекрытия. Надежность, проверенная временем.',
                second: 'В проектах «открытой» архитектуры возникают сложности.',
                imgUrl: 'https://goodstone.ru/images/calc/st4-1.jpg'
              },
              {
                title: 'Полностью монолитное ж/б перекрытие',
                first: 'Лучшее решение для надежного ж/б перекрытия. Подходит к любой архитектуре.',
                second: 'Самый дорогой вариант устройства железобетонного перекрытия.',
                imgUrl: 'https://goodstone.ru/images/calc/st4-2.jpg'
              },
              {
                title: 'Перекрытие деревянное по балкам с обрешеткой',
                first: 'Оптимальное решение для чердачного перекрытия. Высокая экономическая выгода.',
                second: 'Уступает ж/б перекрытиям по допустимым нагрузкам и комфорту эксплуатации.',
                imgUrl: 'https://goodstone.ru/images/calc/st4-3.jpg'
              },
            ],

          },
          {
            id: 4,
            title: 'Тип окон',
            model: [],
            options: [
              {
                name: 'Тип окон не выбран',
              },
              {
                name: 'Оконные изделия из профиля Rehau BLITZ',
              },
              {
                name: 'Оконные изделия из профиля Rehau DeLight',
              },
              {
                name: 'Дороже в сравнении с профилем BLITZ',
              },
            ],
            ButtonName: "Сравнить типы окон",
            modalTarget: "modalWindows",
            modalTitle: "Сравнить типы окон",
            cards: [
              {
                title: 'Оконные изделия из профиля Rehau BLITZ',
                first: 'Хорошее сочетание по цене и качеству. Надежный профиль на практике.',
                second: 'Не рекомендуется для проектов с большими площадями остекления.',
                imgUrl: 'https://goodstone.ru/images/calc/st5-1.jpg'
              },
              {
                title: 'Оконные изделия из профиля Rehau DeLight',
                first: 'Отличный выбор для проектов с большими площадями остекления. Энергоэффективный профиль окна.',
                second: 'Дороже в сравнении с профилем BLITZ.',
                imgUrl: 'https://goodstone.ru/images/calc/st5-2.jpg'
              },
              {
                title: 'Без оконных изделий',
                first: 'Оптимально при строительстве дома без отделки фасада или с облицовкой кирпичом.',
                second: 'При финишной отделке фасада штукатуркой или камнем, нужно наличие установленных окон.',
                imgUrl: 'https://goodstone.ru/images/calc/st5-3.jpg'
              },
            ],

          },
          {
            id: 5,
            title: 'Материал кровли',
            model: [],
            options: [
              {
                name: 'Материал кровли не выбран',
              },
              {
                name: 'Металлочерепица',
              },
              {
                name: 'Гибкая черепица',
              },
              {
                name: 'Фальцевая кровля',
              },
              {
                name: 'Цементно-песчаная черепица',
              },
            ],
            ButtonName: "Сравнить материалы кровли",
            modalTarget: "modalRoof",
            modalTitle: "Сравнить материалы кровли",
            cards: [
              {
                title: 'Металлочерепица',
                first: 'Оптимальное соотношение по цене, качеству и долговечности Самое популярное покрытие кровли.',
                second: 'Не подойдет для кровли сложной и радиусной формы.',
                imgUrl: 'https://goodstone.ru/images/calc/st6-1.jpg'
              },
              {
                title: 'Гибкая черепица',
                first: 'Надежное долговечное покрытие по приемлемым ценам Отличный внешний вид кровли.',
                second: 'С течением времени, возможно образование на покрытии мха.',
                imgUrl: 'https://goodstone.ru/images/calc/st6-2.jpg'
              },
              {
                title: 'Фальцевая кровля',
                first: 'Хорошее решение для скатных кровель. Очень надежное покрытие.',
                second: 'Достаточно дорогое покрытие по сравнению с металлочерепицей.',
                imgUrl: 'https://goodstone.ru/images/calc/st6-3.jpg'
              },
              {
                title: 'Цементно-песчаная черепица',
                first: 'Красивое покрытие уровня премиум. Надежное и долговечное покрытие.',
                second: 'Высокая цена и сложность монтажа на многоскатных кровлях.',
                imgUrl: 'https://goodstone.ru/images/calc/st6-4.jpg'
              },
            ],

          },
          {
            id: 6,
            title: 'Внешняя отделка',
            model: [],
            options: [
              {
                name: 'Отделка не планируется',
              },
              {
                name: 'Кирпич керамический облицовочный',
              },
              {
                name: 'Искусственный камень',
              },
              {
                name: 'Декоративная фасадная штукатурка',
              },
              {
                name: 'Фиброцементный сайдинг',
              },
            ],
            ButtonName: "Сравнить варианты отделки",
            modalTarget: "modalOutside",
            modalTitle: "Типы вариантов отделки",
            cards: [
              {
                title: 'Кирпич керамический облицовочный',
                first: 'Классическое решение отделки фасада по приемлемым ценам. Большой выбор цветов и фактур.',
                second: 'Появление высолов в процессе эксплуатации дома.',
                imgUrl: 'https://goodstone.ru/images/calc/st7-1.jpg'
              },
              {
                title: 'Искусственный камень',
                first: 'Отличная альтернатива облицовки фасада дома кирпичом. Долговечность и свобода дизайна.',
                second: 'Монтаж необходимо проводить в теплое время года.',
                imgUrl: 'https://goodstone.ru/images/calc/st7-2.jpg'
              },
              {
                title: 'Декоративная фасадная штукатурка',
                first: 'Хорошее решение по низкой цене. Богатая цветовая гамма на выбор.',
                second: 'Низкая долговечность в сравнении с другими видами отделок. Плохая ремонтопригодность.',
                imgUrl: 'https://goodstone.ru/images/calc/st7-3.jpg'
              },
              {
                title: 'Фиброцементный сайдинг',
                first: 'Выгодное решение вентфасада. Простота монтажа и долговечность.',
                second: 'Дороже чем отделка камнем и декоративной штукатуркой.',
                imgUrl: 'https://goodstone.ru/images/calc/st7-4.jpg'
              },
            ],

          },
        ],

      }
  },
  methods: {
    nextOne() {
      if(this.square != '' || (this.gabOne != '' && this.gabTwo != '')){
        this.bar.value +=33
        this.slide +=1
      } else {
        alert("Введите общую площадь или габириты дома")
      }
    },
    nextSecond() {

      let itemCount = 0

      this.items.forEach((item) => {
        if(item.model !=''){
          return itemCount += 1
        }
      })

      if(itemCount == 6){
        this.bar.value +=33
        this.slide +=1
      } else {
        alert("Выберете все параметры будущего дома")
      }

    },
    send() {

      this.inputs.phone = this.phone
      this.inputs.name = this.name
      this.inputs.email = this.email
      this.formName = "Квиз по параметрам дома"
      this.items.forEach((item, i) => {
        this.typeConst += `<b>${item.title}: ${item.model}</b><br/>`
      })
      this.msg = `Общая площадь м2 : <b>${this.square}м2</b><br/> Габариты дома: <b>${this.gabOne}м x ${this.gabTwo}м </b><br/> Этажность: <b>${this.floor}</b><br/> Доп постройка: <b>${this.checkedAdd}</b><br/> Ссылка на понравившийся проект: <b>${this.link}</b><br/> Тип Конструкци: <b>${this.typeConst}</b><br/> Дата строительства: <b>${this.dateConst}</b><br/> Удаленность от МКАД(км): <b>${this.mkad} км</b><br/> Направление: <b>${this.trace}</b><br/> Телефон: <b>${this.phone}</b><br/> E-mail: <b>${this.email}</b><br/> Как к вам обращаться: <b>${this.name}</b><br/>`

      if(this.inputs.phone != '' && this.inputs.name != ''){
        this.sendForm()
        this.phone = ''
        this.name = ''
        this.email = ''
      }else {
        alert("Введите номер телефона и как к вам обращаться")
      }

    },

  },
}
</script>

<style scoped>
.cardButton{
  max-height: 210px;
}
.cardEnd{
  max-height: 210px;
}
.formDiv{
  height: 70px;
}
.itemContainer{
  height: 350px;
}
.itemContainerSecond{
  height: 350px;
}
.itemContainerThree{
  height: 350px;
}
.telForm{
  margin-top: 0px!important;
}
.linkMat{
  color: #497490;
}
@media screen and (max-width: 1440px) {
  .labelInput{
    width: 150px;
  }
  .InputForm{
    margin-left: 150px;
  }
  .telForm{
    margin-top: 0px!important;
  }
  .itemContainer{
    height: 400px;
  }
  .itemContainerSecond{
    height: 400px;
  }
  .itemContainerThree{
    height: 400px;
  }
  .cardButton{
    max-height: 280px;
  }
}
@media screen and (max-width: 1024px) {
  .labelInput{
    margin-bottom: -20px;
  }
  .itemContainer{
    height: 700px;
  }
  .telForm{
    margin-top: 20px!important;
  }
  .itemContainerSecond{
    height: 800px;
  }
  .itemContainerThree{
    height: 500px;
  }
  .cardEnd{
    max-height: 500px;
    width: 400px;
  }
}
@media screen and (max-width: 768px) {
  .itemContainer{
    height: 580px;
  }
}
@media screen and (max-width: 425px) {
  .labelInput{
    margin-bottom: 0px;
  }
  .InputForm {
    margin-top: 10px;
    margin-left: -5px;
  }
  .formDiv {
    height: 100px;
  }
  .itemContainer{
    height: 750px;
  }
  .itemContainerSecond{
    height: 950px;
  }
.cardButton{
  max-height: 400px;
}
}
@media screen and (max-width: 320px) {
  .itemContainer{
    height: 900px;
  }
}

</style>
