import { ajax } from "../../modules/ajax.js"
import { productUrls } from "../../modules/productUrls.js"
 

export class ShortCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div id="product-card-${data.id}" class="product-card">
                <button id="remove-btn-${data.id}" class="card-delete">✕</button>
                <div class="card-image-container">
                    <img src=${data.src} alt="Товар" class="card-image">
                </div>
                <div class="card-content">
                    <h3 class="card-title">${data.title}</h3>
                </div>
            </div>
        `
    }

    deleteCard(data) {
        const elem = document.getElementById(`product-card-${data.id}`);
        elem.remove();

        ajax.delete(productUrls.removeProductById(data.id), (data) => { 
            console.log("nice delete");
        });
    }

    addListeners(data) {
        document.getElementById(`remove-btn-${data.id}`).addEventListener('click', () => {
            this.deleteCard(data);
        });
    }

    render(data) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data);
    }
}
