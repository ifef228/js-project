import { ProductPage } from "../product/index.js";
import { ProductCardComponent } from "../../components/prodauct-card/index.js";

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
            <div id="main-page" class="d-flex flex-wrap">
                <button id="plus" style="
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: #FFF;
    border: 2px solid #FFDB4D;
    border-radius: 8px;
    color: #000;
    font-family: 'YS Text', Arial, sans-serif;
    font-size: 20px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
">
    <span style="
        display: inline-block;
        transition: transform 0.3s ease;
    ">+</span>
</button>
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
                text: "Оле - ола анжи Махачкала!"
            },
        ]
    }

    addCard() {
        const element = this.getData()[0]

        const p = new ProductCardComponent(this.document.getElementById(`card-trio-${Math.floor((this.i - 1) / 3)}`))
        p.render(element, this.clickCard.bind(this))

        if (this.i % 3 == 0) {
            this.parent.insertAdjacentHTML('beforeend',
                `
                        <div id="card-trio-${Math.floor(this.i / 3)}" style="display: flex; gap: 20px; flex-wrap: nowrap; margin-top: 10px;"></div>
                    `
            )
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

        const data = this.getData()

        this.parent.insertAdjacentHTML('beforeend',
            `
                <div id="card-trio-${Math.floor(this.i / 3)}" style="display: flex; gap: 20px; flex-wrap: nowrap; margin-top: 10px;"></div>
            `
        )
        data.forEach(element => {
            const p = new ProductCardComponent(this.document.getElementById(`card-trio-${Math.floor((this.i - 1) / 3)}`))
            p.render(element, this.clickCard.bind(this))

            if (this.i % 3 == 0) {
                this.parent.insertAdjacentHTML('beforeend',
                    `
                        <div id="card-trio-${Math.floor(this.i / 3)}" style="display: flex; gap: 20px; flex-wrap: nowrap; margin-top: 10px;"></div>
                    `
                )
            }

            (this.i)++
        });

        document.getElementById(`plus`).addEventListener('click', () => this.addCard())
    }
}