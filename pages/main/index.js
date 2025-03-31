import { AccordionComponent } from "../../components/accordion/accordionComponent.js";
import { ProductPage } from "../product/index.js";

export class MainPage {
    constructor(parent, document) {
        this.parent = parent
        this.document = document
    }

    get pageRoot() {
        return this.document.getElementById('main-page')
    }

    getHTML() {
        return (
            `
            <div id="main-page" class="d-flex flex-wrap"></div>
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

    clickCard(e) {
        const cardId = e.target.dataset.id
    
        const productPage = new ProductPage(this.parent, cardId, this.getData(), this.document)
        productPage.render()
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const data = this.getData();

        const accordon = new AccordionComponent(this.pageRoot, this.document);
        accordon.render(data, this.clickCard.bind(this))
    }
}