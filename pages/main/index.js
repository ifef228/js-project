import { AccordionComponent } from "../../components/accordion/accordionComponent.js";
import { DogPage } from "../dog/index.js";

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
                src: "https://kinpet.ru/upload/resize_cache/uf/04f/976_766_1d083178cba05bb44c32142a386e8af27/A16479B3_18B6_41E4_A4F5_37831C7AD701.jpeg",
                title: "Пудель",
                text: "Такого пуделя еще поискать!"
            },
            {
                id: 2,
                src: "https://i.pinimg.com/736x/31/c1/6d/31c16dbbf94d94a3f26228d8fdddcebb.jpg",
                title: "Алабай",
                text: "Этот пес жмет больше тебя!"
            },
            {
                id: 3,
                src: "https://i.pinimg.com/736x/0b/e3/55/0be3554a1d0980b24e7d0e0b9740fb15.jpg",
                title: "Кавказская овчарка",
                text: "Оле - ола анжи Махачкала!"
            },
        ]
    }

    clickCard(e) {
        const cardId = e.target.dataset.id
    
        const dogPage = new DogPage(this.parent, cardId, this.getData(), this.document)
        dogPage.render()
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