import { AccordionItemComponent } from "./accordionItemComponent.js";

export class AccordionComponent {
    constructor(parent) {
        this.parent = parent
    }

    get pageRoot() {
        return document.getElementById('accordionExample')
    }

    getHTML() {
        return (`<div class="accordion" id="accordionExample" style="width: 50%;"></div>`)
    }

    render(data, listener) {
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        data.forEach(element => {
            const accordionItem = new AccordionItemComponent(this.pageRoot)
            accordionItem.render(element, listener)
        });
    }
}