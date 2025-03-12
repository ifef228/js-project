export class BackButtonComponent {
    constructor(parent, document) {
        this.parent = parent
        this.document = document
    }

    addListeners(listener) {
        this.document.getElementById("back-button")
            .addEventListener('click', listener)
    }

    getHtml() {
        return (
            `
                <button id="back-button" class="btn btn-primary" type="button">Назад</button>
            `
        )
    }

    render(listener) {
        const html = this.getHtml()
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(listener)
    }
}