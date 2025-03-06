export class BackButtonComponent {
    constructor(parent) {
        this.parent = parent
    }

    addListeners(listener) {
        document.getElementById("back-button")
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