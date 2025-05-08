import { ProductPage } from "../product/index.js";
import { ProductCardComponent } from "../../components/prodauct-card/index.js";
import { moveElement } from "../../homework.js";
import { SearchComponent } from "../../components/search/index.js";

export class MainPage {
    constructor(parent, document) {
        this.parent = parent
        this.document = document

        this.i = 1
    }

    get pageRoot() {
        return this.document.getElementById('main-page')
    }

    getHTML() {
        return (
            `
            <div id="main-page">
                <!-- SearchComponent будет добавлен здесь -->
            </div>
            <div id="cards-container"></div>
            `
        )
    }

    getData() {
        return [
            {
                id: 1,
                src: "https://trashbox.ru/ifiles/1974912_d3480d_gtt5c89xwaaulkr/128-gb-60-gc-25-vt-vsyo-eto-prosto-nepriemlemo-dlya-flagmana-v-2024-godu-1.jpeg",
                title: "Айфон",
                text: "Такого лайфона еще поискать!"
            },
            {
                id: 2,
                src: "https://cdn1.ozone.ru/s3/multimedia-r/6309430755.jpg",
                title: "Домкрат",
                text: "Этот домкрат жмет больше тебя!"
            },
            {
                id: 3,
                src: "https://i.pinimg.com/736x/64/6c/80/646c80ad9214a95e9ecd34015cd57256.jpg",
                title: "Форма ФК Анжи",
                text: "Удобная и практичная"
            },
        ]
    }

    addCard() {
        const element = this.getData()[0]

        const cardTrio = this.document.getElementById(`card-trio-${Math.floor((this.i - 1) / 3)}`)
        if (!cardTrio) {
            const container = this.document.getElementById('cards-container')
            container.insertAdjacentHTML('beforeend', `<div id="card-trio-${Math.floor((this.i - 1) / 3)}" class="card-row"></div>`)
        }

        const p = new ProductCardComponent(this.document.getElementById(`card-trio-${Math.floor((this.i - 1) / 3)}`))
        p.render(element, this.clickCard.bind(this))

        if (this.i % 3 == 0) {
            const container = this.document.getElementById('cards-container')
            container.insertAdjacentHTML('beforeend', `<div id="card-trio-${Math.floor(this.i / 3)}" class="card-row"></div>`)
        }

        (this.i)++
    }

    clickCard(e) {
        const cardId = e.target.dataset.id

        const productPage = new ProductPage(this.parent, cardId, this.getData(), this.document)
        productPage.render()
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        // Добавляем стили для карточек
        const style = document.createElement('style');
        style.textContent = `
            .card-row {
                display: flex;
                flex-wrap: wrap;
                gap: 20px;
                margin-bottom: 20px;
            }
        `;
        document.head.appendChild(style);

        const searchComponent = new SearchComponent(this.pageRoot)
        searchComponent.render()

        // Настраиваем обработчик для кнопки добавления
        document.getElementById('plus').addEventListener('click', () => this.addCard())

        let data = this.getData()
        moveElement(data, 1, 0)

        const container = this.document.getElementById('cards-container')
        container.insertAdjacentHTML('beforeend', `<div id="card-trio-0" class="card-row"></div>`)

        data.forEach(element => {
            const p = new ProductCardComponent(this.document.getElementById(`card-trio-${Math.floor((this.i - 1) / 3)}`))
            p.render(element, this.clickCard.bind(this))

            if (this.i % 3 == 0) {
                container.insertAdjacentHTML('beforeend', `<div id="card-trio-${Math.floor(this.i / 3)}" class="card-row"></div>`)
            }

            (this.i)++
        });
    }
}
