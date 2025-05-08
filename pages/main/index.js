import { ProductPage } from "../product/index.js";
import { ProductCardComponent } from "../../components/prodauct-card/index.js";
import { SearchComponent } from "../../components/search/index.js";
import { ajax } from "../../modules/ajax.js"
import { productUrls } from "../../modules/productUrls.js"
 
export class MainPage {
    constructor(parent, document) {
        this.parent = parent
        this.document = document

        this.i = 1
        this.data = null
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
        ajax.get(productUrls.getProducts(), (data) => this.renderData(data))
    }

    renderData(data) {
        this.data = data

        const searchComponent = new SearchComponent(this.pageRoot, this.data)
        searchComponent.render()
        
        // Настраиваем обработчик для кнопки добавления
        document.getElementById('plus').addEventListener('click', () => this.addCard())

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

    addCard() {
        const element = this.data[0]

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

        const productPage = new ProductPage(this.parent, cardId, this.data, this.document)
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

        this.getData()
    }
}
