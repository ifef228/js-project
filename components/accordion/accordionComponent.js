import { AccordionItemComponent } from "./accordionItemComponent.js";

export class AccordionComponent {
    constructor(parent, document) {
        this.parent = parent
        this.document = document
    }

    get pageRoot() {
        return this.document.getElementById('accordionExample')
    }

    getHTML() {
        return (`<div class="accordion" id="accordionExample" style="width: 50%;"></div>`)
    }

    render(data, listener) {
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        data.forEach(element => {
            const accordionItem = new AccordionItemComponent(this.pageRoot, this.document)
            accordionItem.render(element, listener)
        });
    }
}