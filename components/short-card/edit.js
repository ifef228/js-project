import { EditPage } from "../../pages/edit/index.js";
 

export class ShortCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div id="product-card-${data.id}" class="product-card">
                <button id="remove-btn-${data.id}" class="card-delete">✏️</button>
                <div class="card-image-container">
                    <img src=${data.src} alt="Товар" class="card-image">
                </div>
                <div class="card-content">
                    <h3 class="card-title">${data.title}</h3>
                </div>
            </div>
        `
    }

    editCard(data) {
        const editPage = new EditPage(document.getElementById('root'), data)

        editPage.render()
    }

    addListeners(data) {
        document.getElementById(`remove-btn-${data.id}`).addEventListener('click', () => {
            this.editCard(data);
        });
    }

    render(data) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data);
    }
}
